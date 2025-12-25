import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IncomingPlanCard from '../../components/clinic/IncomingPlanCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import SpecializationSelector from '../../components/patient/SpecializationSelector';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { formatPrice } from '../../utils/formatters';

export default function IncomingPlansPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [calculatedOffer, setCalculatedOffer] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [offerDialog, setOfferDialog] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const data = await apiService.getIncomingPlans(user.id);
      setPlans(data);
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = (plan) => {
    setSelectedPlan(plan);
    // Pre-select specializations that match clinic's offerings
    const matchingSpecs = plan.selectedSpecializations || 
      plan.specializations.map(s => s.type);
    setSelectedSpecs(matchingSpecs);
    setOfferDialog(true);
  };

  const handleCalculateOffer = async () => {
    if (selectedSpecs.length === 0) {
      alert('Выберите хотя бы одно направление');
      return;
    }

    try {
      setCalculating(true);
      const offer = await apiService.calculateOffer(
        user.id,
        selectedPlan.id,
        selectedSpecs
      );
      setCalculatedOffer(offer);
    } catch (error) {
      console.error('Failed to calculate offer:', error);
      alert('Ошибка при расчёте предложения');
    } finally {
      setCalculating(false);
    }
  };

  const handleSubmitOffer = async () => {
    try {
      setSubmitting(true);
      
      const offerData = {
        treatmentPlanId: selectedPlan.id,
        selectedSpecializations: selectedSpecs,
        pricing: calculatedOffer.pricing,
        totalPrice: calculatedOffer.totalPrice,
        discountedPrice: calculatedOffer.discountedPrice,
        estimatedDuration: {
          therapy: '3-4 визита',
          orthopedics: '2-3 месяца',
          surgery: '1-2 визита',
          hygiene: '1 визит',
          periodontics: '4-6 визитов',
        },
        message: 'Мы готовы принять вас в ближайшее время!',
      };

      await apiService.submitOffer(user.id, offerData);
      
      alert('Предложение отправлено пациенту!');
      setOfferDialog(false);
      setCalculatedOffer(null);
      setSelectedPlan(null);
      setSelectedSpecs([]);
      
      // Reload plans
      loadPlans();
    } catch (error) {
      console.error('Failed to submit offer:', error);
      alert('Ошибка при отправке предложения');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка планов..." />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/clinic')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Входящие планы лечения
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2, mb: 3 }}>
        {plans.length === 0 ? (
          <EmptyState
            icon={AssignmentIcon}
            title="Нет новых планов"
            description="Когда пациенты опубликуют планы лечения, они появятся здесь"
          />
        ) : (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              Доступно {plans.length} {plans.length === 1 ? 'план' : 'планов'} лечения
            </Alert>

            {plans.map((plan) => (
              <IncomingPlanCard
                key={plan.id}
                plan={plan}
                onCalculate={handleCalculate}
              />
            ))}
          </>
        )}
      </Container>

      {/* Offer Calculation Dialog */}
      <Dialog
        open={offerDialog}
        onClose={() => !calculating && !submitting && setOfferDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Расчёт предложения</DialogTitle>
        <DialogContent>
          {!calculatedOffer ? (
            <Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Выберите направления, по которым хотите отправить предложение
              </Typography>

              {selectedPlan && (
                <SpecializationSelector
                  specializations={selectedPlan.specializations}
                  selected={selectedSpecs}
                  onChange={setSelectedSpecs}
                />
              )}
            </Box>
          ) : (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                Предложение рассчитано
              </Alert>

              {Object.entries(calculatedOffer.pricing).map(([specType, data]) => (
                <Box key={specType} mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    {specType === 'therapy' && '🦷 Терапия'}
                    {specType === 'orthopedics' && '👑 Ортопедия'}
                    {specType === 'surgery' && '🔧 Хирургия'}
                    {specType === 'hygiene' && '✨ Гигиена'}
                    {specType === 'periodontics' && '🩺 Пародонтология'}
                  </Typography>
                  {data.breakdown.map((item, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      justifyContent="space-between"
                      sx={{ pl: 2, py: 0.5 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {item.procedure}
                      </Typography>
                      <Typography variant="body2">{formatPrice(item.price)}</Typography>
                    </Box>
                  ))}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    sx={{ pl: 2, pt: 1, fontWeight: 'bold' }}
                  >
                    <Typography variant="body2">Итого:</Typography>
                    <Typography variant="body2">{formatPrice(data.total)}</Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}

              <Box
                sx={{
                  bgcolor: 'primary.light',
                  p: 2,
                  borderRadius: 1,
                  mt: 2,
                }}
              >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1">Общая стоимость:</Typography>
                  <Typography variant="h6">{formatPrice(calculatedOffer.totalPrice)}</Typography>
                </Box>
                {calculatedOffer.discount > 0 && (
                  <>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Скидка {calculatedOffer.discount}%:
                      </Typography>
                      <Typography variant="body2" color="success.main" fontWeight="bold">
                        {formatPrice(calculatedOffer.discountedPrice)}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOfferDialog(false);
              setCalculatedOffer(null);
            }}
            disabled={calculating || submitting}
          >
            Отмена
          </Button>
          {!calculatedOffer ? (
            <Button
              onClick={handleCalculateOffer}
              variant="contained"
              disabled={calculating || selectedSpecs.length === 0}
            >
              {calculating ? 'Расчёт...' : 'Рассчитать'}
            </Button>
          ) : (
            <Button
              onClick={handleSubmitOffer}
              variant="contained"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Отправить пациенту'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
