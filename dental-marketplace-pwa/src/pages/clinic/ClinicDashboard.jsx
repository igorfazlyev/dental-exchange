import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  ShowChart,
  Assignment,
  CheckCircle,
} from '@mui/icons-material';
import StatsCard from '../../components/shared/StatsCard';
import { mockData } from '../../services/mockData';

export default function ClinicDashboard() {
  const { clinicDashboard } = mockData;
  const { stats } = clinicDashboard;

  const monthlyData = [
    { month: 'Авг', orders: 42, revenue: 1100000 },
    { month: 'Сен', orders: 45, revenue: 1180000 },
    { month: 'Окт', orders: 51, revenue: 1320000 },
    { month: 'Ноя', orders: 48, revenue: 1250000 },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Панель управления
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {clinicDashboard.clinicName} • Обзор за текущий месяц
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Новые заказы"
            value={stats.pendingOrders}
            subtitle="Ожидают обработки"
            icon={<Assignment />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Заказы за месяц"
            value={stats.thisMonthOrders}
            subtitle="+12% к прошлому месяцу"
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Выручка"
            value={`${(stats.thisMonthRevenue / 1000000).toFixed(1)}M ₽`}
            subtitle={`Средний чек: ${stats.avgTreatmentCost.toLocaleString()} ₽`}
            icon={<AttachMoney />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Конверсия"
            value={`${stats.conversionRate}%`}
            subtitle="Отличный показатель"
            icon={<ShowChart />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Revenue Chart Placeholder */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Динамика заказов и выручки
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2, pt: 4 }}>
                {monthlyData.map((data, index) => (
                  <Box key={index} sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box
                      sx={{
                        height: `${(data.revenue / 1500000) * 100}%`,
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        mb: 1,
                        minHeight: 40,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        pb: 1,
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      {data.orders}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {data.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', borderRadius: 1, mr: 1 }} />
                  <Typography variant="caption">Количество заказов</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистика обработки
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Обработано заявок</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    36 / {stats.thisMonthOrders}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(36 / stats.thisMonthOrders) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Конверсия в лечение</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {stats.conversionRate}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.conversionRate}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Популярные услуги
              </Typography>
              {['Терапия', 'Ортопедия', 'Хирургия'].map((service, index) => (
                <Paper key={index} sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{service}</Typography>
                    <Typography variant="h6" color="primary">
                      {[18, 15, 9][index]}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
