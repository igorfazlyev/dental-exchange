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
  Avatar,
  Tabs,
  Tab,
  Alert,
} from '@mui/material'
import { People, Visibility, Phone, Email, Add } from '@mui/icons-material'

const ClinicPatients = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [patients] = useState([
    {
      id: 'pat-001',
      name: 'Иванов Иван Иванович',
      age: 45,
      phone: '+7 (495) 123-45-67',
      email: 'ivanov@mail.ru',
      registrationDate: '2025-11-15',
      source: 'Маркетплейс',
      status: 'active',
      lastVisit: '2025-12-20',
      totalSpent: 125000,
      treatments: [
        { date: '2025-12-20', type: 'Лечение кариеса', tooth: 16, cost: 8000 },
        { date: '2025-12-15', type: 'Установка коронки', tooth: 16, cost: 25000 },
        { date: '2025-11-20', type: 'Профессиональная гигиена', tooth: null, cost: 5000 },
      ],
    },
    {
      id: 'pat-002',
      name: 'Петрова Анна Сергеевна',
      age: 32,
      phone: '+7 (495) 234-56-78',
      email: 'petrova@gmail.com',
      registrationDate: '2025-12-01',
      source: 'Маркетплейс',
      status: 'active',
      lastVisit: '2025-12-21',
      totalSpent: 80000,
      treatments: [
        { date: '2025-12-21', type: 'Консультация', tooth: null, cost: 2000 },
        { date: '2025-12-10', type: 'Удаление зуба мудрости', tooth: 38, cost: 15000 },
      ],
    },
    {
      id: 'pat-003',
      name: 'Сидоров Петр Константинович',
      age: 58,
      phone: '+7 (495) 345-67-89',
      email: 'sidorov@yandex.ru',
      registrationDate: '2025-10-05',
      source: 'Прямое обращение',
      status: 'active',
      lastVisit: '2025-12-18',
      totalSpent: 45000,
      treatments: [
        { date: '2025-12-18', type: 'Лечение пульпита', tooth: 26, cost: 12000 },
        { date: '2025-11-25', type: 'Профессиональная гигиена', tooth: null, cost: 5000 },
      ],
    },
    {
      id: 'pat-004',
      name: 'Козлова Елена Николаевна',
      age: 28,
      phone: '+7 (495) 456-78-90',
      email: 'kozlova@mail.ru',
      registrationDate: '2025-09-12',
      source: 'Маркетплейс',
      status: 'inactive',
      lastVisit: '2025-10-15',
      totalSpent: 65000,
      treatments: [
        { date: '2025-10-15', type: 'Установка виниров', tooth: 11, cost: 35000 },
        { date: '2025-09-20', type: 'Консультация', tooth: null, cost: 2000 },
      ],
    },
    {
      id: 'pat-005',
      name: 'Морозов Дмитрий Александрович',
      age: 41,
      phone: '+7 (495) 567-89-01',
      email: 'morozov@gmail.com',
      registrationDate: '2025-12-10',
      source: 'Маркетплейс',
      status: 'active',
      lastVisit: '2025-12-22',
      totalSpent: 95000,
      treatments: [
        { date: '2025-12-22', type: 'Имплантация', tooth: 46, cost: 65000 },
        { date: '2025-12-12', type: 'Консультация', tooth: null, cost: 2000 },
      ],
    },
  ])

  const statusLabels = {
    active: 'Активный',
    inactive: 'Неактивный',
  }

  const statusColors = {
    active: 'success',
    inactive: 'default',
  }

  const formatCurrency = (v) => v.toLocaleString('ru-RU') + ' ₽'

  const filtered = patients.filter((p) => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return p.status === 'active'
    if (activeTab === 'inactive') return p.status === 'inactive'
    if (activeTab === 'marketplace') return p.source === 'Маркетплейс'
    return true
  })

  const handleOpen = (patient) => {
    setSelectedPatient(patient)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setSelectedPatient(null)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <People sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">База пациентов</Typography>
            <Typography variant="body2" color="text.secondary">
              Список пациентов клиники и история лечения
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Добавить пациента
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
        >
          <Tab label="Все" value="all" />
          <Tab label="Активные" value="active" />
          <Tab label="Неактивные" value="inactive" />
          <Tab label="С маркетплейса" value="marketplace" />
        </Tabs>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>ФИО</TableCell>
                  <TableCell>Возраст</TableCell>
                  <TableCell>Контакты</TableCell>
                  <TableCell>Источник</TableCell>
                  <TableCell>Последний визит</TableCell>
                  <TableCell>Потрачено</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {p.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {p.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{p.age} лет</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone fontSize="small" color="action" />
                          <Typography variant="caption">{p.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Email fontSize="small" color="action" />
                          <Typography variant="caption">{p.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={p.source}
                        size="small"
                        color={p.source === 'Маркетплейс' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(p.lastVisit).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {formatCurrency(p.totalSpent)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[p.status]}
                        size="small"
                        color={statusColors[p.status]}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => handleOpen(p)}
                      >
                        Карточка
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Карточка пациента</DialogTitle>
        <DialogContent>
          {selectedPatient && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Alert severity="info">
                <Typography variant="body2" gutterBottom>
                  <strong>ФИО:</strong> {selectedPatient.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Возраст:</strong> {selectedPatient.age} лет
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Дата регистрации:</strong>{' '}
                  {new Date(selectedPatient.registrationDate).toLocaleDateString(
                    'ru-RU'
                  )}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Источник:</strong> {selectedPatient.source}
                </Typography>
                <Typography variant="body2">
                  <strong>Всего потрачено:</strong>{' '}
                  {formatCurrency(selectedPatient.totalSpent)}
                </Typography>
              </Alert>

              <Typography variant="h6" gutterBottom>
                Контактная информация
              </Typography>
              <TextField
                fullWidth
                label="Телефон"
                value={selectedPatient.phone}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedPatient.email}
                InputProps={{ readOnly: true }}
              />

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                История лечения
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Дата</TableCell>
                      <TableCell>Процедура</TableCell>
                      <TableCell>Зуб</TableCell>
                      <TableCell>Стоимость</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPatient.treatments.map((t, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {new Date(t.date).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell>{t.type}</TableCell>
                        <TableCell>
                          {t.tooth ? (
                            <Chip label={`№${t.tooth}`} size="small" />
                          ) : (
                            '—'
                          )}
                        </TableCell>
                        <TableCell>{formatCurrency(t.cost)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button variant="contained">Редактировать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClinicPatients
