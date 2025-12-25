import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../../components/common/BottomNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import StatusChip from '../../components/common/StatusChip';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import { formatPrice } from '../../utils/formatters';

const appointmentSteps = [
  'Ожидает звонка',
  'Запись оформлена',
  'Консультация пройдена',
  'Лечение начато',
  'Завершено',
];

const getStepIndex = (status) => {
  const mapping = {
    pending_contact: 0,
    scheduled: 1,
    consultation_done: 2,
    in_treatment: 3,
    completed: 4,
  };
  return mapping[status] || 0;
};

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPatientAppointments(user.id);
      setAppointments(data);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка записей..." />;
  }

  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Мои приёмы
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {appointments.length === 0 ? (
          <EmptyState
            icon={LocalHospitalIcon}
            title="Нет записей"
            description="Примите предложение от клиники, чтобы начать лечение"
            actionLabel="К предложениям"
            onAction={() => navigate('/patient/offers')}
          />
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id} sx={{ mb: 2 }}>
              <CardContent>
                {/* Clinic Info */}
                <Box display="flex" gap={2} mb={2}>
                  <Avatar
                    src={appointment.clinic?.logo}
                    alt={appointment.clinic?.name}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box flex={1}>
                    <Typography variant="h6">{appointment.clinic?.name}</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <PhoneIcon sx={{ fontSize: 16 }} />
                      <Typography variant="body2">{appointment.clinic?.phone}</Typography>
                    </Box>
                  </Box>
                  <StatusChip status={appointment.status} />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Status Stepper */}
                <Stepper activeStep={getStepIndex(appointment.status)} sx={{ mb: 2 }}>
                  {appointmentSteps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {/* Treatment Summary */}
                {appointment.treatmentPlan && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      План лечения:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.treatmentPlan.specializations?.length || 0} направлений
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Стоимость: {formatPrice(appointment.treatmentPlan.totalEstimate?.min || 0)} - 
                      {formatPrice(appointment.treatmentPlan.totalEstimate?.max || 0)}
                    </Typography>
                  </Box>
                )}

                {appointment.status === 'pending_contact' && (
                  <Box mt={2} p={2} bgcolor="warning.light" borderRadius={1}>
                    <Typography variant="body2">
                      ⏳ Клиника свяжется с вами в ближайшее время для согласования даты приёма
                    </Typography>
                  </Box>
                )}

                {appointment.status === 'completed' && (
                  <Box mt={2} p={2} bgcolor="success.light" borderRadius={1}>
                    <Typography variant="body2">
                      ✅ Лечение завершено! Спасибо за доверие.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Container>

      <BottomNav />
    </Box>
  );
}
