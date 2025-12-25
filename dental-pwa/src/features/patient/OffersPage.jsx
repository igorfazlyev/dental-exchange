import { useState, useEffect } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from '../../components/common/BottomNav';
import ClinicOfferCard from '../../components/patient/ClinicOfferCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export default function OffersPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callbackDialog, setCallbackDialog] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [callbackData, setCallbackData] = useState({
    preferredDate: '',
    contactMethod: 'phone',
    phone: '',
    messenger: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const patientData = await apiService.getPatient(user.id);
      const latestPlan = patientData.treatmentPlans?.[patientData.treatmentPlans.length - 1];
      
      if (latestPlan && latestPlan.status === 'offers_received') {
        const offersData = await apiService.getOffers(latestPlan.id);
        setOffers(offersData);
      }
    } catch (error) {
      console.error('Failed to load offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async (offer) => {
    try {
      await apiService.acceptOffer(offer.id);
      alert('Предложение принято! Клиника свяжется с вами в ближайшее время.');
      navigate('/patient/appointments');
    } catch (error) {
      console.error('Failed to accept offer:', error);
      alert('Ошибка при принятии предложения');
    }
  };

  const handleCallback = (offer) => {
    setSelectedOffer(offer);
    setCallbackDialog(true);
  };

  const submitCallback = async () => {
    if (!callbackData.preferredDate) {
      alert('Укажите желаемую дату');
      return;
    }

    try {
      setSubmitting(true);
      await apiService.requestCallback(selectedOffer.id, callbackData);
      alert('Заявка на обратный звонок отправлена!');
      setCallbackDialog(false);
    } catch (error) {
      console.error('Failed to request callback:', error);
      alert('Ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка предложений..." />;
  }

  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Предложения клиник
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {offers.length === 0 ? (
          <EmptyState
            icon={LocalHospitalIcon}
            title="Нет предложений"
            description="Опубликуйте план лечения, чтобы получить предложения от клиник"
            actionLabel="К плану лечения"
            onAction={() => navigate('/patient/treatment-plan')}
          />
        ) : (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              Получено {offers.length} {offers.length === 1 ? 'предложение' : 'предложения'} от клиник
            </Alert>

            {offers.map((offer) => (
              <ClinicOfferCard
                key={offer.id}
                offer={offer}
                onAccept={handleAcceptOffer}
                onCallback={handleCallback}
              />
            ))}
          </>
        )}
      </Container>

      {/* Callback Dialog */}
      <Dialog 
        open={callbackDialog} 
        onClose={() => !submitting && setCallbackDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Заказать обратный звонок</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Желаемая дата"
              type="date"
              value={callbackData.preferredDate}
              onChange={(e) => setCallbackData({ ...callbackData, preferredDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Способ связи</InputLabel>
              <Select
                value={callbackData.contactMethod}
                onChange={(e) => setCallbackData({ ...callbackData, contactMethod: e.target.value })}
                label="Способ связи"
              >
                <MenuItem value="phone">Телефон</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                <MenuItem value="telegram">Telegram</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Номер телефона"
              value={callbackData.phone}
              onChange={(e) => setCallbackData({ ...callbackData, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
              fullWidth
            />

            {(callbackData.contactMethod === 'whatsapp' || callbackData.contactMethod === 'telegram') && (
              <TextField
                label="Имя пользователя в мессенджере"
                value={callbackData.messenger}
                onChange={(e) => setCallbackData({ ...callbackData, messenger: e.target.value })}
                fullWidth
              />
            )}

            <Alert severity="info">
              Клиника {selectedOffer?.clinic?.name} свяжется с вами в течение рабочего дня
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCallbackDialog(false)} disabled={submitting}>
            Отмена
          </Button>
          <Button onClick={submitCallback} variant="contained" disabled={submitting}>
            {submitting ? 'Отправка...' : 'Отправить'}
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNav />
    </Box>
  );
}
