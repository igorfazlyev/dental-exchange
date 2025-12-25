import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../../components/common/BottomNav';
import TreatmentPlanCard from '../../components/patient/TreatmentPlanCard';
import SpecializationSelector from '../../components/patient/SpecializationSelector';
import SearchCriteriaForm from '../../components/patient/SearchCriteriaForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';

const steps = ['План лечения', 'Выбор направлений', 'Критерии поиска', 'Публикация'];

export default function TreatmentPlanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setTreatmentPlan } = useStore();
  
  const [plan, setPlan] = useState(location.state?.plan || null);
  const [scan, setScan] = useState(location.state?.scan || null);
  const [loading, setLoading] = useState(!plan);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    district: '',
    metro: '',
    priceRange: '',
    preferredDate: '',
  });
  const [publishDialog, setPublishDialog] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!plan) {
      loadLatestPlan();
    }
  }, []);

  const loadLatestPlan = async () => {
    try {
      setLoading(true);
      const patientData = await apiService.getPatient(user.id);
      const latestScan = patientData.scans?.[patientData.scans.length - 1];
      
      if (latestScan && latestScan.status === 'processed') {
        const planData = await apiService.getTreatmentPlan(latestScan.id);
        setPlan(planData);
        setScan(latestScan);
        setTreatmentPlan(planData);
      }
    } catch (error) {
      console.error('Failed to load treatment plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Move to specialization selection
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (selectedSpecs.length === 0) {
        alert('Выберите хотя бы одно направление');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      setPublishDialog(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      await apiService.publishTreatmentPlan(plan.id, selectedSpecs, searchCriteria);
      
      // Update plan status
      const updatedPlan = { ...plan, status: 'published' };
      setPlan(updatedPlan);
      setTreatmentPlan(updatedPlan);
      
      setPublishDialog(false);
      
      // Navigate to offers page
      setTimeout(() => {
        navigate('/patient/offers');
      }, 1000);
    } catch (error) {
      console.error('Failed to publish plan:', error);
      alert('Ошибка при публикации плана');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка плана лечения..." />;
  }

  if (!plan) {
    return (
      <Box sx={{ pb: 8 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">План лечения</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
          <Typography>План лечения не найден</Typography>
          <Button onClick={() => navigate('/patient/scans')} sx={{ mt: 2 }}>
            Загрузить снимок
          </Button>
        </Container>
        <BottomNav />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            План лечения
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {plan.status === 'draft' && (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.slice(0, 3).map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box>
                <TreatmentPlanCard
                  plan={plan}
                  onRequestOffers={() => setActiveStep(1)}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <SpecializationSelector
                  specializations={plan.specializations}
                  selected={selectedSpecs}
                  onChange={setSelectedSpecs}
                />
                
                <Box display="flex" gap={2} mt={3}>
                  <Button onClick={handleBack} fullWidth variant="outlined">
                    Назад
                  </Button>
                  <Button onClick={handleNext} fullWidth variant="contained">
                    Далее
                  </Button>
                </Box>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <SearchCriteriaForm
                  criteria={searchCriteria}
                  onChange={setSearchCriteria}
                />
                
                <Box display="flex" gap={2} mt={3}>
                  <Button onClick={handleBack} fullWidth variant="outlined">
                    Назад
                  </Button>
                  <Button onClick={handleNext} fullWidth variant="contained">
                    Опубликовать
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}

        {plan.status !== 'draft' && (
          <TreatmentPlanCard plan={plan} />
        )}
      </Container>

      {/* Publish Confirmation Dialog */}
      <Dialog open={publishDialog} onClose={() => !publishing && setPublishDialog(false)}>
        <DialogTitle>Опубликовать план лечения?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Ваш план лечения будет отправлен клиникам, соответствующим вашим критериям.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Выбранные направления: {selectedSpecs.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Вы начнете получать предложения в течение нескольких часов.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialog(false)} disabled={publishing}>
            Отмена
          </Button>
          <Button onClick={handlePublish} variant="contained" disabled={publishing}>
            {publishing ? 'Публикация...' : 'Опубликовать'}
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNav />
    </Box>
  );
}
