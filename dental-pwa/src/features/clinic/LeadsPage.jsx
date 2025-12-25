import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import StatusChip from '../../components/common/StatusChip';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import PeopleIcon from '@mui/icons-material/People';
import { formatPrice, formatDate } from '../../utils/formatters';

const LEAD_STATUSES = [
  { value: 'pending_contact', label: 'Не обработан' },
  { value: 'scheduled', label: 'Записан на консультацию' },
  { value: 'consultation_done', label: 'Консультация пройдена' },
  { value: 'in_treatment', label: 'Лечение начато' },
  { value: 'completed', label: 'Лечение завершено' },
];

export default function LeadsPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await apiService.getClinicLeads(user.id);
      setLeads(data);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = (lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setNotes(lead.notes || '');
    setStatusDialog(true);
  };

  const submitStatusUpdate = async () => {
    try {
      setUpdating(true);
      await apiService.updateLeadStatus(user.id, selectedLead.id, newStatus, notes);
      alert('Статус обновлён');
      setStatusDialog(false);
      loadLeads();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Ошибка при обновлении статуса');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка заявок..." />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/clinic')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Лиды (Заявки)
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 2, mb: 3 }}>
        {leads.length === 0 ? (
          <EmptyState
            icon={PeopleIcon}
            title="Нет заявок"
            description="Когда пациенты примут ваши предложения, они появятся здесь"
          />
        ) : (
          leads.map((lead) => (
            <Card key={lead.id} sx={{ mb: 2 }}>
              <CardContent>
                {/* Patient Info */}
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                  <Box>
                    <Typography variant="h6">{lead.patient.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lead.patient.age} лет
                    </Typography>
                  </Box>
                  <StatusChip status={lead.status} />
                </Box>

                {/* Contact Info */}
                <Box display="flex" gap={2} mb={2}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{lead.patient.phone}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{lead.patient.email}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Treatment Plan Info */}
                <Typography variant="subtitle2" gutterBottom>
                  План лечения:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {lead.treatmentPlan?.specializations?.map((spec) => (
                    <Chip
                      key={spec.type}
                      label={spec.type}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Стоимость предложения: {formatPrice(lead.offer?.discountedPrice || 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Дата заявки: {formatDate(lead.createdDate)}
                </Typography>

                {lead.appointment?.notes && (
                  <Box mt={2} p={1.5} bgcolor="grey.100" borderRadius={1}>
                    <Typography variant="caption" color="text.secondary">
                      Заметки:
                    </Typography>
                    <Typography variant="body2">{lead.appointment.notes}</Typography>
                  </Box>
                )}

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleUpdateStatus(lead)}
                >
                  Обновить статус
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Container>

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialog}
        onClose={() => !updating && setStatusDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Обновить статус заявки</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Typography variant="body2">
              Пациент: {selectedLead?.patient?.name}
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Новый статус</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Новый статус"
              >
                {LEAD_STATUSES.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Заметки"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Добавьте заметки по заявке"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialog(false)} disabled={updating}>
            Отмена
          </Button>
          <Button onClick={submitStatusUpdate} variant="contained" disabled={updating}>
            {updating ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
