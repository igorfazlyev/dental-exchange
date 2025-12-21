import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  Avatar,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  People,
  CheckCircle,
  Cancel,
  Notifications,
  CalendarMonth,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ClinicDashboard = () => {
  const navigate = useNavigate()

  // Mock KPI data
  const kpis = {
    monthlyRevenue: 2850000,
    revenueGrowth: 12.5,
    totalPatients: 145,
    patientsGrowth: 8.2,
    acceptedPlans: 23,
    plansGrowth: 15.0,
    noShowRate: 4.5,
    noShowChange: -2.1,
  }

  // Revenue by specialty
  const revenueBySpecialty = [
    { specialty: 'Терапия', revenue: 950000, percentage: 33 },
    { specialty: 'Ортопедия', revenue: 1200000, percentage: 42 },
    { specialty: 'Хирургия', revenue: 700000, percentage: 25 },
  ]

  // Recent orders/requests
  const recentOrders = [
    {
      id: 'req-001',
      patientName: 'Иванов И.И.',
      specialty: 'Терапия',
      estimatedCost: 75000,
      status: 'new',
      date: '2025-12-21',
    },
    {
      id: 'req-002',
      patientName: 'Петрова А.С.',
      specialty: 'Ортопедия',
      estimatedCost: 120000,
      status: 'new',
      date: '2025-12-21',
    },
    {
      id: 'req-003',
      patientName: 'Сидоров П.К.',
      specialty: 'Хирургия',
      estimatedCost: 45000,
      status: 'accepted',
      date: '2025-12-20',
    },
  ]

  // Today's appointments
  const todayAppointments = [
    {
      id: 'app-001',
      time: '09:00',
      patientName: 'Козлов В.В.',
      type: 'Первичная консультация',
      specialty: 'Терапия',
    },
    {
      id: 'app-002',
      time: '11:30',
      patientName: 'Морозова Е.Н.',
      type: 'Лечение',
      specialty: 'Ортопедия',
    },
    {
      id: 'app-003',
      time: '14:00',
      patientName: 'Новиков Д.А.',
      type: 'Консультация',
      specialty: 'Хирургия',
    },
  ]

  const formatCurrency = (value) => {
    return value.toLocaleString('ru-RU') + ' ₽'
  }

  const getStatusColor = (status) => {
    return status === 'new' ? 'warning' : status === 'accepted' ? 'success' : 'default'
  }

  const getStatusLabel = (status) => {
    return status === 'new' ? 'Новая' : status === 'accepted' ? 'Принята' : 'В работе'
  }

  const specialtyColors = {
    Терапия: 'info',
    Ортопедия: 'primary',
    Хирургия: 'warning',
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <DashboardIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Панель управления</Typography>
          <Typography variant="body2" color="text.secondary">
            Обзор деятельности клиники за декабрь 2025
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="overline" color="text.secondary">
                  Выручка за месяц
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {formatCurrency(kpis.monthlyRevenue)}
              </Typography>
              <Chip
                label={`+${kpis.revenueGrowth}%`}
                size="small"
                color="success"
                icon={<TrendingUp />}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <People color="primary" sx={{ mr: 1 }} />
                <Typography variant="overline" color="text.secondary">
                  Пациентов
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {kpis.totalPatients}
              </Typography>
              <Chip
                label={`+${kpis.patientsGrowth}%`}
                size="small"
                color="success"
                icon={<TrendingUp />}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="overline" color="text.secondary">
                  Принято планов
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {kpis.acceptedPlans}
              </Typography>
              <Chip
                label={`+${kpis.plansGrowth}%`}
                size="small"
                color="success"
                icon={<TrendingUp />}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Cancel color="error" sx={{ mr: 1 }} />
                <Typography variant="overline" color="text.secondary">
                  Неявки
                </Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {kpis.noShowRate}%
              </Typography>
              <Chip
                label={`${kpis.noShowChange}%`}
                size="small"
                color="success"
                icon={<TrendingUp />}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue by Specialty */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Выручка по специализациям
          </Typography>
          {revenueBySpecialty.map((item) => (
            <Box key={item.specialty} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  <Chip
                    label={item.specialty}
                    size="small"
                    color={specialtyColors[item.specialty]}
                    sx={{ mr: 1 }}
                  />
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatCurrency(item.revenue)} ({item.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          ))}
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Notifications /> Новые заявки
                </Typography>
                <Button size="small" onClick={() => navigate('/clinic/orders')}>
                  Все заявки
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Пациент</strong></TableCell>
                      <TableCell><strong>Специализация</strong></TableCell>
                      <TableCell><strong>Стоимость</strong></TableCell>
                      <TableCell><strong>Статус</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>{order.patientName}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.specialty}
                            size="small"
                            color={specialtyColors[order.specialty]}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(order.estimatedCost)}</TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(order.status)}
                            size="small"
                            color={getStatusColor(order.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarMonth /> Расписание на сегодня
                </Typography>
                <Button size="small" onClick={() => navigate('/clinic/appointments')}>
                  Полное расписание
                </Button>
              </Box>

              {todayAppointments.map((apt) => (
                <Box
                  key={apt.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    mb: 1,
                    bgcolor: 'background.default',
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {apt.time.split(':')[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {apt.patientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {apt.type}
                    </Typography>
                  </Box>
                  <Chip
                    label={apt.specialty}
                    size="small"
                    color={specialtyColors[apt.specialty]}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ClinicDashboard