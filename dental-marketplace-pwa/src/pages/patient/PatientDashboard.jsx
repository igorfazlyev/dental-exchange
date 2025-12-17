import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  LocalHospital,
  CalendarToday,
  EmojiEvents,
  ArrowForward,
} from '@mui/icons-material';
import StatsCard from '../../components/shared/StatsCard';
import { mockData, specializationNames } from '../../services/mockData';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { patientProfile, treatmentPlan, costBreakdown } = mockData;

  const completionPercentage = 35; // Mock data

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать, {patientProfile.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ваша панель управления лечением
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Активных планов"
            value={patientProfile.activePlans}
            subtitle="1 требует внимания"
            icon={<LocalHospital />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Завершено лечений"
            value={patientProfile.completedTreatments}
            subtitle="+1 за месяц"
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Бонусных баллов"
            value={patientProfile.bonusPoints}
            subtitle="Доступно к использованию"
            icon={<EmojiEvents />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Следующий визит"
            value="20 дек"
            subtitle="10:00, Дента Плюс"
            icon={<CalendarToday />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Content - Treatment Plan */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Текущий план лечения
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    План №{treatmentPlan.planId} • Создан {treatmentPlan.createdDate}
                  </Typography>
                </Box>
                <Chip label="Активен" color="success" />
              </Box>

              {/* Progress */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Прогресс выполнения</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {completionPercentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Specializations Breakdown */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'primary.50', borderLeft: 3, borderColor: 'primary.main' }}>
                    <Typography variant="h5" color="primary" fontWeight={700}>
                      {costBreakdown.therapy.items}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Терапия
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {costBreakdown.therapy.minCost.toLocaleString()} - {costBreakdown.therapy.maxCost.toLocaleString()} ₽
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'secondary.50', borderLeft: 3, borderColor: 'secondary.main' }}>
                    <Typography variant="h5" color="secondary" fontWeight={700}>
                      {costBreakdown.orthopedics.items}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Ортопедия
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {costBreakdown.orthopedics.minCost.toLocaleString()} - {costBreakdown.orthopedics.maxCost.toLocaleString()} ₽
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'warning.50', borderLeft: 3, borderColor: 'warning.main' }}>
                    <Typography variant="h5" color="warning.dark" fontWeight={700}>
                      {costBreakdown.surgery.items}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Хирургия
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {costBreakdown.surgery.minCost.toLocaleString()} - {costBreakdown.surgery.maxCost.toLocaleString()} ₽
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Recommendation */}
              <Paper sx={{ p: 2, bgcolor: 'info.50', mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  💡 Рекомендация специалиста
                </Typography>
                <Typography variant="body2">
                  {treatmentPlan.recommendations.reason}. Рекомендуем начать с консультации ортопеда.
                </Typography>
              </Paper>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/patient/treatment-plan')}
                >
                  Подробнее о плане
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/patient/offers')}
                >
                  Получить предложения
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Treatment Items Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Запланированные процедуры
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Зуб</TableCell>
                      <TableCell>Процедура</TableCell>
                      <TableCell>Специализация</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell align="right">Стоимость</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {treatmentPlan.items.slice(0, 5).map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            №{item.toothNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>{item.procedure}</TableCell>
                        <TableCell>
                          <Chip
                            label={specializationNames[item.specialization]}
                            size="small"
                            color={
                              item.specialization === 'therapy' ? 'primary' :
                              item.specialization === 'orthopedics' ? 'secondary' : 'warning'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label="Ожидание" size="small" variant="outlined" />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {item.estimatedCostMin.toLocaleString()} - {item.estimatedCostMax.toLocaleString()} ₽
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Quick Actions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Быстрые действия
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Записаться на консультацию
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Загрузить снимки
                </Button>
                <Button variant="outlined" fullWidth sx={{ justifyContent: 'flex-start' }}>
                  Связаться с клиникой
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Акции и новости
              </Typography>
              {mockData.newsFeed.slice(0, 3).map((item) => (
                <Paper key={item.id} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Chip
                    label={item.type === 'promotion' ? 'Акция' : item.type === 'educational' ? 'Обучение' : 'Событие'}
                    size="small"
                    color={item.type === 'promotion' ? 'error' : 'info'}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="subtitle2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {item.description.substring(0, 80)}...
                  </Typography>
                  <Button size="small" endIcon={<ArrowForward />}>
                    Подробнее
                  </Button>
                </Paper>
              ))}
              <Button fullWidth onClick={() => navigate('/patient/news')}>
                Смотреть все
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
