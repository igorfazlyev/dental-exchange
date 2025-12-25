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
  Grid,
  Chip,
  LinearProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatPrice } from '../../utils/formatters';

export default function ClinicDashboard() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await apiService.getClinicAnalytics(user.id, '30');
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Загрузка аналитики..." />;
  }

  const conversionRate = analytics?.metrics?.conversionRate || 0;
  const revenueProgress = analytics?.metrics?.totalActualRevenue && analytics?.metrics?.totalPlannedRevenue
    ? (analytics.metrics.totalActualRevenue / analytics.metrics.totalPlannedRevenue) * 100
    : 0;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user.name}
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Выход
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Панель управления
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Обзор за последние 30 дней
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <AssignmentIcon color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    Новые планы
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {analytics?.metrics?.newPlans || 0}
                </Typography>
                <Typography variant="body2" color="success.main">
                  Потенциальная выручка
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <PeopleIcon color="success" />
                  <Typography variant="body2" color="text.secondary">
                    Принятые заявки
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {analytics?.metrics?.acceptedOffers || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Конверсия: {conversionRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <AttachMoneyIcon color="warning" />
                  <Typography variant="body2" color="text.secondary">
                    Плановая выручка
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">
                  {formatPrice(analytics?.metrics?.totalPlannedRevenue || 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Всего планов
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <TrendingUpIcon color="success" />
                  <Typography variant="body2" color="text.secondary">
                    Фактическая выручка
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  {formatPrice(analytics?.metrics?.totalActualRevenue || 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {revenueProgress.toFixed(0)}% от плана
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Revenue Progress */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Выполнение плана выручки
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                План: {formatPrice(analytics?.metrics?.totalPlannedRevenue || 0)}
              </Typography>
              <Typography variant="body2" color="success.main" fontWeight="bold">
                Факт: {formatPrice(analytics?.metrics?.totalActualRevenue || 0)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(revenueProgress, 100)}
              sx={{ height: 10, borderRadius: 1 }}
            />
            <Typography variant="body2" color="text.secondary" align="right" mt={1}>
              {revenueProgress.toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>

        {/* By Specialization */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              По специализациям
            </Typography>
            <Grid container spacing={2}>
              {analytics?.bySpecialization && Object.entries(analytics.bySpecialization).map(([spec, data]) => (
                <Grid item xs={12} sm={6} md={4} key={spec}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">
                        {spec === 'therapy' && '🦷 Терапия'}
                        {spec === 'orthopedics' && '👑 Ортопедия'}
                        {spec === 'surgery' && '🔧 Хирургия'}
                        {spec === 'hygiene' && '✨ Гигиена'}
                        {spec === 'periodontics' && '🩺 Пародонтология'}
                      </Typography>
                      <Chip label={`${data.count} пац.`} size="small" />
                    </Box>
                    <Typography variant="h6" color="primary">
                      {formatPrice(data.revenue)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/clinic/incoming-plans')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Входящие планы</Typography>
                <Typography variant="body2" color="text.secondary">
                  Новые заявки от пациентов
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/clinic/leads')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                <Typography variant="h6">Лиды</Typography>
                <Typography variant="body2" color="text.secondary">
                  Управление заявками
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              onClick={() => navigate('/clinic/analytics')}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                <Typography variant="h6">Аналитика</Typography>
                <Typography variant="body2" color="text.secondary">
                  Детальные отчёты
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
