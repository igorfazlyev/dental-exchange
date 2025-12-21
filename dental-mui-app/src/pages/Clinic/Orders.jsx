import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Collapse,
} from '@mui/material'
import {
  Assignment,
  CheckCircle,
  Cancel,
  Visibility,
  ExpandMore,
  ExpandLess,
  CalendarMonth,
} from '@mui/icons-material'

const ClinicOrders = () => {
  const [activeTab, setActiveTab] = useState('new')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState('') // 'accept' or 'schedule'
  const [expandedRow, setExpandedRow] = useState(null)

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ord-001',
      patientName: 'Иванов Иван Иванович',
      patientAge: 45,
      date: '2025-12-21',
      status: 'new',
      specialties: ['therapy', 'orthopedics'],
      procedures: [
        { name: 'Лечение кариеса', tooth: 16, cost: 8000 },
        { name: 'Установка коронки', tooth: 16, cost: 25000 },
        { name: 'Лечение пульпита', tooth: 26, cost: 12000 },
      ],
      totalMin: 40000,
      totalMax: 50000,
      aiRecommendation: 'Начать с терапии (лечение кариеса, пульпита), затем ортопедия',
    },
    {
      id: 'ord-002',
      patientName: 'Петрова Анна Сергеевна',
      patientAge: 32,
      date: '2025-12-21',
      status: 'new',
      specialties: ['surgery', 'orthopedics'],
      procedures: [
        { name: 'Удаление зуба мудрости', tooth: 38, cost: 15000 },
        { name: 'Имплантация', tooth: 46, cost: 65000 },
      ],
      totalMin: 75000,
      totalMax: 85000,
      aiRecommendation: 'Сначала хирургическое удаление, через 3 месяца имплантация',
    },
    {
      id: 'ord-003',
      patientName: 'Сидоров Петр Константинович',
      patientAge: 58,
      date: '2025-12-20',
      status: 'accepted',
      specialties: ['therapy'],
      procedures: [
        { name: 'Лечение кариеса', tooth: 11, cost: 8000 },
        { name: 'Профессиональная гигиена', tooth: null, cost: 5000 },
      ],
      totalMin: 12000,
      totalMax: 15000,
      aiRecommendation: 'Гигиена, затем лечение',
      scheduledDate: '2025-12-25',
    },
    {
      id: 'ord-004',
      patientName: 'Козлова Елена Николаевна',
      patientAge: 28,
      date: '2025-12-19',
      status: 'rejected',
      specialties: ['orthopedics'],
      procedures: [
        { name: 'Установка виниров', tooth: 11, cost: 35000 },
        { name: 'Установка виниров', tooth: 21, cost: 35000 },
      ],
      totalMin: 65000,
      totalMax: 75000,
      aiRecommendation: 'Установка виниров на передние зубы',
      rejectionReason: 'Клиника не занимается винирами',
    },
  ])

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  const specialtyColors = {
    therapy: 'info',
    orthopedics: 'primary',
    surgery: 'warning',
  }

  const statusColors = {
    new: 'warning',
    accepted: 'success',
    rejected: 'error',
    in_progress: 'info',
  }

  const statusLabels = {
    new: 'Новая',
    accepted: 'Принята',
    rejected: 'Отклонена',
    in_progress: 'В работе',
  }

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    return order.status === activeTab
  })

  const handleOpenDialog = (order, type) => {
    setSelectedOrder(order)
    setDialogType(type)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedOrder(null)
  }

  const handleToggleExpand = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Assignment sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Заявки от пациентов</Typography>
          <Typography variant="body2" color="text.secondary">
            Входящие планы лечения от платформы DentalAI
          </Typography>
        </Box>
      </Box>

      {/* Filter Tabs */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label="Все" value="all" />
          <Tab label="Новые" value="new" icon={<Chip label={orders.filter(o => o.status === 'new').length} size="small" />} iconPosition="end" />
          <Tab label="Принятые" value="accepted" />
          <Tab label="Отклоненные" value="rejected" />
        </Tabs>
      </Card>

      {/* Orders Table */}
      <Card elevation={2}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Пациент</strong></TableCell>
                  <TableCell><strong>Дата</strong></TableCell>
                  <TableCell><strong>Специализации</strong></TableCell>
                  <TableCell><strong>Стоимость</strong></TableCell>
                  <TableCell><strong>Статус</strong></TableCell>
                  <TableCell><strong>Действия</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <>
                    <TableRow key={order.id} hover>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleToggleExpand(order.id)}>
                          {expandedRow === order.id ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {order.patientName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.patientAge} лет
                        </Typography>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {order.specialties.map((spec) => (
                            <Chip
                              key={spec}
                              label={specialtyNames[spec]}
                              size="small"
                              color={specialtyColors[spec]}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {formatCost(order.totalMin)} - {formatCost(order.totalMax)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusLabels[order.status]}
                          size="small"
                          color={statusColors[order.status]}
                        />
                      </TableCell>
                      <TableCell>
                        {order.status === 'new' && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<CheckCircle />}
                              onClick={() => handleOpenDialog(order, 'accept')}
                            >
                              Принять
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<Cancel />}
                            >
                              Отклонить
                            </Button>
                          </Box>
                        )}
                        {order.status === 'accepted' && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<CalendarMonth />}
                            onClick={() => handleOpenDialog(order, 'schedule')}
                          >
                            Назначить
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row Details */}
                    <TableRow>
                      <TableCell colSpan={8} sx={{ py: 0, border: 0 }}>
                        <Collapse in={expandedRow === order.id} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2, bgcolor: 'background.default', m: 1, borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Рекомендация AI:
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2 }}>
                              {order.aiRecommendation}
                            </Alert>

                            <Typography variant="subtitle2" gutterBottom>
                              План лечения:
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell><strong>Процедура</strong></TableCell>
                                  <TableCell><strong>Зуб</strong></TableCell>
                                  <TableCell><strong>Стоимость</strong></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.procedures.map((proc, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{proc.name}</TableCell>
                                    <TableCell>
                                      {proc.tooth ? (
                                        <Chip label={`№${proc.tooth}`} size="small" />
                                      ) : (
                                        <Typography color="text.disabled">—</Typography>
                                      )}
                                    </TableCell>
                                    <TableCell>{formatCost(proc.cost)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            {order.status === 'rejected' && order.rejectionReason && (
                              <Alert severity="error" sx={{ mt: 2 }}>
                                <strong>Причина отклонения:</strong> {order.rejectionReason}
                              </Alert>
                            )}

                            {order.scheduledDate && (
                              <Alert severity="success" sx={{ mt: 2 }}>
                                <strong>Запланирована консультация:</strong>{' '}
                                {new Date(order.scheduledDate).toLocaleDateString('ru-RU')}
                              </Alert>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Accept / Schedule Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'accept' ? 'Принять план лечения' : 'Назначить консультацию'}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="body2" gutterBottom>
                Пациент: <strong>{selectedOrder.patientName}</strong>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                Стоимость: <strong>{formatCost(selectedOrder.totalMin)} - {formatCost(selectedOrder.totalMax)}</strong>
              </Typography>

              {dialogType === 'accept' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  После принятия плана вы сможете назначить дату первой консультации
                </Alert>
              )}

              {dialogType === 'schedule' && (
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Дата и время консультации"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {dialogType === 'accept' ? 'Принять план' : 'Назначить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClinicOrders