import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusChip from '../../components/common/StatusChip';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import ImageIcon from '@mui/icons-material/Image';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user, patientStatus } = useStore();
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPatient(user.id);
      setPatientData(data);
    } catch (error) {
      console.error('Failed to load patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка данных..." />;
  }

  const latestScan = patientData?.scans?.[patientData.scans.length - 1];
  const latestPlan = patientData?.treatmentPlans?.[patientData.treatmentPlans.length - 1];
  const activeAppointment = patientData?.appointments?.find(
    apt => ['pending_contact', 'scheduled', 'in_treatment'].includes(apt.status)
  );

  return (
    <Box sx={{ pb: 8 }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, px: 2 }}>
        <Container maxWidth="sm">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Добро пожаловать, {patientData?.name?.split(' ')[0]}!
          </Typography>
          <Typography variant="body2">
            Ваш личный помощник в планировании лечения
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ mt: -2 }}>
        {/* Current Status Card */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Текущий статус</Typography>
              <StatusChip status={patientStatus} />
            </Box>

            {patientStatus === 'idle' && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Начните с загрузки КТ-снимка для получения плана лечения от ИИ
              </Alert>
            )}

            {latestScan && latestScan.status === 'processing' && (
              <Alert severity="info" sx={{ mb: 2 }}>
                ⏳ Ваш снимок обрабатывается. План лечения будет готов через несколько минут.
              </Alert>
            )}

            {latestPlan && latestPlan.status === 'draft' && (
              <Alert severity="success" sx={{ mb: 2 }}>
                ✅ План лечения готов! Выберите направления и получите предложения от клиник.
              </Alert>
            )}

            {latestPlan && latestPlan.status === 'offers_received' && (
              <Alert severity="success" sx={{ mb: 2 }}>
                🎉 Получены предложения от клиник! Выберите наиболее подходящее.
              </Alert>
            )}

            {activeAppointment && (
              <Alert severity="info" sx={{ mb: 2 }}>
                📅 У вас есть активная запись в клинику
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/patient/scans')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <ImageIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle2">Мои снимки</Typography>
                <Typography variant="caption" color="text.secondary">
                  {patientData?.scans?.length || 0} снимков
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/patient/treatment-plan')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                <Typography variant="subtitle2">План лечения</Typography>
                <Typography variant="caption" color="text.secondary">
                  {latestPlan ? 'Готов' : 'Нет плана'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/patient/offers')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalHospitalIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                <Typography variant="subtitle2">Предложения</Typography>
                <Typography variant="caption" color="text.secondary">
                  {latestPlan?.status === 'offers_received' ? 'Есть новые' : 'Пусто'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/patient/appointments')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalHospitalIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                <Typography variant="subtitle2">Приёмы</Typography>
                <Typography variant="caption" color="text.secondary">
                  {patientData?.appointments?.length || 0} записей
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Latest Activity */}
        {latestScan && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Последняя активность
              </Typography>
              
              <Box display="flex" gap={2} alignItems="center">
                <Box
                  component="img"
                  src={latestScan.imageUrl}
                  alt="CT Scan"
                  sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }}
                />
                <Box flex={1}>
                  <Typography variant="subtitle2">КТ-снимок</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(latestScan.uploadDate).toLocaleDateString('ru-RU')}
                  </Typography>
                  <StatusChip status={latestScan.status} sx={{ mt: 1 }} />
                </Box>
              </Box>

              {latestScan.status === 'processed' && latestPlan && (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/patient/treatment-plan')}
                >
                  Посмотреть план лечения
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* First Time User */}
        {!latestScan && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Начните с загрузки снимка
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Загрузите КТ-снимок зубов, и наш ИИ автоматически составит для вас план лечения с указанием всех необходимых процедур и ориентировочной стоимостью.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/patient/scans')}
              >
                Загрузить снимок
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
