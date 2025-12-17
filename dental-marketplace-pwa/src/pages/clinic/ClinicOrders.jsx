import React, { useState } from 'react';
import {
  Container,
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Visibility,
  Download,
  CheckCircle,
  Schedule,
  LocalHospital,
} from '@mui/icons-material';
import { mockData, specializationNames, statusNames } from '../../services/mockData';

export default function ClinicOrders() {
  const { clinicDashboard, treatmentPlan } = mockData;
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsDialog(true);
  };

  const orders = clinicDashboard.recentOrders;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Заказы
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Управление входящими заявками на лечение
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Download />}>
          Экспорт данных
        </Button>
      </Box>

      {/* Status Filter */}
      <Card sx={{ mb: 3 }}>
        <Tabs value={statusFilter} onChange={(e, value) => setStatusFilter(value)}>
          <Tab label="Все заказы" value="all" />
          <Tab label="Новые" value="new" icon={<Schedule />} iconPosition="start" />
          <Tab label="Назначена консультация" value="consultation_scheduled" />
          <Tab label="В работе" value="in_progress" />
          <Tab label="Завершено" value="completed" icon={<CheckCircle />} iconPosition="start" />
        </Tabs>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>ID заказа</strong></TableCell>
                  <TableCell><strong>Пациент</strong></TableCell>
                  <TableCell><strong>Специализации</strong></TableCell>
                  <TableCell><strong>Процедур</strong></TableCell>
                  <TableCell><strong>Стоимость</strong></TableCell>
                  <TableCell><strong>Статус</strong></TableCell>
                  <TableCell><strong>Дата получения</strong></TableCell>
                  <TableCell align="right"><strong>Действия</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {order.orderId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.patientName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {order.specializations.map((spec) => (
                          <Chip
                            key={spec}
                            label={specializationNames[spec]}
                            size="small"
                            color={
                              spec === 'therapy' ? 'primary' :
                              spec === 'orthopedics' ? 'secondary' : 'warning'
                            }
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label="5 процедур" size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {order.estimatedValue.toLocaleString()} ₽
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusNames[order.status]}
                        size="small"
                        color={order.status === 'new' ? 'warning' : 'success'}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.receivedDate}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleViewDetails(order)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={detailsDialog} onClose={() => setDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Детали заказа {selectedOrder?.orderId}
          <Typography variant="body2" color="text.secondary">
            Пациент: {selectedOrder?.patientName}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Информация о заказе
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Статус
                      </Typography>
                      <Typography variant="body2">{statusNames[selectedOrder.status]}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Дата получения
                      </Typography>
                      <Typography variant="body2">{selectedOrder.receivedDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Оценочная стоимость
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {selectedOrder.estimatedValue.toLocaleString()} ₽
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Специализации
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                        {selectedOrder.specializations.map((spec) => (
                          <Chip key={spec} label={specializationNames[spec]} size="small" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  План лечения
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Зуб</TableCell>
                        <TableCell>Процедура</TableCell>
                        <TableCell>Специализация</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {treatmentPlan.items.slice(0, 3).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>№{item.toothNumber}</TableCell>
                          <TableCell>{item.procedure}</TableCell>
                          <TableCell>
                            <Chip label={specializationNames[item.specialization]} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Закрыть</Button>
          <Button variant="outlined" startIcon={<Download />}>
            Скачать план
          </Button>
          <Button variant="contained" startIcon={<CheckCircle />}>
            Принять заказ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
