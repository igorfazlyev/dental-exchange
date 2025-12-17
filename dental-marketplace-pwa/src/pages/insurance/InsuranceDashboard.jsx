import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Group,
  Assignment,
  Warning,
  Payments,
  CheckCircle,
  Cancel,
  Visibility,
} from '@mui/icons-material';
import StatsCard from '../../components/shared/StatsCard';
import { mockData } from '../../services/mockData';

export default function InsuranceDashboard() {
  const { insuranceDashboard } = mockData;
  const { portfolioStats, pendingApprovals } = insuranceDashboard;
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleReview = (claim) => {
    setSelectedClaim(claim);
    setReviewDialog(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Панель страховой компании
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {insuranceDashboard.companyName} • Обзор портфеля и согласований
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Всего пациентов"
            value={portfolioStats.totalPatients.toLocaleString()}
            subtitle="В портфеле"
            icon={<Group />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Активные планы"
            value={portfolioStats.activeTreatmentPlans}
            subtitle="Планов лечения"
            icon={<Assignment />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="На согласовании"
            value={portfolioStats.pendingApprovals}
            subtitle="Требуют проверки"
            icon={<Warning />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard
            title="Выплаты за месяц"
            value={`${(portfolioStats.thisMonthClaims / 1000000).toFixed(1)}M ₽`}
            subtitle={`Средняя: ${portfolioStats.avgClaimAmount.toLocaleString()} ₽`}
            icon={<Payments />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Alert for High Priority Claims */}
      <Alert severity="warning" icon={<Warning />} sx={{ mb: 3 }}>
        <Typography variant="subtitle2">
          Обнаружены расхождения в {pendingApprovals.filter(c => c.requiresReview).length} заявках
        </Typography>
        <Typography variant="body2">
          Запрошенные суммы превышают AI-оценку. Рекомендуется детальная проверка планов лечения.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Pending Approvals Table */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Заявки на согласование
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell><strong>ID заявки</strong></TableCell>
                      <TableCell><strong>Пациент</strong></TableCell>
                      <TableCell><strong>План лечения</strong></TableCell>
                      <TableCell><strong>Запрошено</strong></TableCell>
                      <TableCell><strong>AI оценка</strong></TableCell>
                      <TableCell><strong>Расхождение</strong></TableCell>
                      <TableCell><strong>Дата</strong></TableCell>
                      <TableCell align="right"><strong>Действия</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingApprovals.map((claim) => (
                      <TableRow
                        key={claim.claimId}
                        hover
                        sx={{
                          bgcolor: claim.requiresReview ? 'warning.50' : 'inherit',
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {claim.claimId}
                          </Typography>
                        </TableCell>
                        <TableCell>{claim.patientName}</TableCell>
                        <TableCell>{claim.treatmentPlanId}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {claim.requestedAmount.toLocaleString()} ₽
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {claim.aiEstimatedAmount.toLocaleString()} ₽
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {claim.requiresReview ? (
                            <Chip
                              label={`+${claim.discrepancy.toLocaleString()} ₽`}
                              size="small"
                              color="warning"
                              icon={<Warning />}
                            />
                          ) : (
                            <Chip label="В норме" size="small" color="success" />
                          )}
                        </TableCell>
                        <TableCell>{claim.submittedDate}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Visibility />}
                              onClick={() => handleReview(claim)}
                            >
                              Проверить
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Summary Sidebar */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Статистика согласований
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Одобрено</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    189
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Отклонено</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    12
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">На рассмотрении</Typography>
                  <Typography variant="body2" fontWeight={600} color="warning.main">
                    {portfolioStats.pendingApprovals}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Средний срок обработки
                </Typography>
                <Typography variant="h5" color="primary">
                  2.3 дня
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение по типам
              </Typography>
              {['Терапия', 'Ортопедия', 'Хирургия'].map((type, index) => (
                <Paper key={index} sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{type}</Typography>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="primary">
                        {[78, 45, 23][index]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        заявок
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Проверка заявки {selectedClaim?.claimId}
          <Typography variant="body2" color="text.secondary">
            Пациент: {selectedClaim?.patientName}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedClaim && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: selectedClaim.requiresReview ? 'warning.50' : 'success.50' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {selectedClaim.requiresReview ? 'Требуется проверка' : 'Заявка в пределах нормы'}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Запрошено
                      </Typography>
                      <Typography variant="h6">
                        {selectedClaim.requestedAmount.toLocaleString()} ₽
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        AI оценка
                      </Typography>
                      <Typography variant="h6">
                        {selectedClaim.aiEstimatedAmount.toLocaleString()} ₽
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Разница
                      </Typography>
                      <Typography variant="h6" color={selectedClaim.requiresReview ? 'error' : 'success'}>
                        +{selectedClaim.discrepancy.toLocaleString()} ₽
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Детали плана лечения
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  План лечения: {selectedClaim.treatmentPlanId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Дата подачи: {selectedClaim.submittedDate}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>Закрыть</Button>
          <Button variant="outlined" startIcon={<Cancel />} color="error">
            Отклонить
          </Button>
          <Button variant="contained" startIcon={<CheckCircle />} color="success">
            Одобрить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
