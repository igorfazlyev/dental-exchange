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
  Fab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import BottomNav from '../../components/common/BottomNav';
import ScanUploadCard from '../../components/patient/ScanUploadCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import StatusChip from '../../components/common/StatusChip';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import ImageIcon from '@mui/icons-material/Image';

export default function ScansPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPatient(user.id);
      setScans(data.scans || []);
    } catch (error) {
      console.error('Failed to load scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      await apiService.uploadScan(user.id, file, 'Загружен вручную');
      await loadScans();
      setShowUpload(false);
    } catch (error) {
      console.error('Failed to upload scan:', error);
      alert('Ошибка при загрузке снимка');
    } finally {
      setUploading(false);
    }
  };

  const handleScanClick = async (scan) => {
    if (scan.status === 'processed') {
      try {
        const plan = await apiService.getTreatmentPlan(scan.id);
        navigate('/patient/treatment-plan', { state: { plan, scan } });
      } catch (error) {
        console.error('Failed to load treatment plan:', error);
      }
    }
  };

  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Мои снимки
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {loading ? (
          <LoadingSpinner />
        ) : showUpload ? (
          <Box>
            <ScanUploadCard onUpload={handleUpload} uploading={uploading} />
            <Box mt={2}>
              <Typography
                variant="body2"
                color="primary"
                align="center"
                sx={{ cursor: 'pointer' }}
                onClick={() => setShowUpload(false)}
              >
                Отмена
              </Typography>
            </Box>
          </Box>
        ) : scans.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="Нет снимков"
            description="Загрузите КТ-снимок, чтобы получить план лечения от ИИ"
            actionLabel="Загрузить снимок"
            onAction={() => setShowUpload(true)}
          />
        ) : (
          <>
            {scans.map((scan) => (
              <Card
                key={scan.id}
                sx={{
                  mb: 2,
                  cursor: scan.status === 'processed' ? 'pointer' : 'default',
                  '&:hover': scan.status === 'processed' ? { bgcolor: 'action.hover' } : {},
                }}
                onClick={() => handleScanClick(scan)}
              >
                <CardContent>
                  <Box display="flex" gap={2}>
                    <Box
                      component="img"
                      src={scan.imageUrl}
                      alt="CT Scan"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        objectFit: 'cover',
                      }}
                    />
                    <Box flex={1}>
                      <Typography variant="subtitle1" gutterBottom>
                        КТ-снимок
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(scan.uploadDate).toLocaleDateString('ru-RU')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Источник: {scan.source}
                      </Typography>
                      <StatusChip status={scan.status} sx={{ mt: 1 }} />
                    </Box>
                  </Box>

                  {scan.status === 'processed' && (
                    <Typography
                      variant="body2"
                      color="primary"
                      align="right"
                      sx={{ mt: 1 }}
                    >
                      Посмотреть план лечения →
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Container>

      {!showUpload && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 80, right: 16 }}
          onClick={() => setShowUpload(true)}
        >
          <AddIcon />
        </Fab>
      )}

      <BottomNav />
    </Box>
  );
}
