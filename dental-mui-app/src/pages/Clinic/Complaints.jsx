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
} from '@mui/material'
import { ReportProblem, CheckCircle, Edit } from '@mui/icons-material'

const ClinicComplaints = () => {
  const [activeTab, setActiveTab] = useState('open')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [complaints] = useState([
    {
      id: 'cmp-001',
      date: '2025-12-20',
      patientName: 'Иванов Иван',
      source: 'Маркетплейс',
      type: 'Качество лечения',
      status: 'open',
      summary: 'Боль после лечения зуба 26',
      details:
        'Пациент жалуется на сохраняющуюся боль после лечения кариеса на зубе 26. Просит повторный осмотр.',
      resolution: '',
    },
    {
      id: 'cmp-002',
      date: '2025-12-19',
      patientName: 'Петрова Анна',
      source: 'Маркетплейс',
      type: 'Сервис',
      status: 'in_progress',
      summary: 'Задержка приема на 40 минут',
      details:
        'Пациентка сообщает, что прием начался с существенной задержкой, без предупреждения.',
      resolution:
        'Проведена беседа с администратором, предложена скидка 10% на следующий визит.',
    },
    {
      id: 'cmp-003',
      date: '2025-12-15',
      patientName: 'Сидоров Петр',
      source: 'Прямое обращение',
      type: 'Оплата',
      status: 'closed',
      summary: 'Несоответствие суммы счета плану',
      details:
        'Пациент указал на расхождение между предварительным планом лечения и итоговым счетом.',
      resolution:
        'Разница компенсирована, пациент уведомлен и согласен с решением.',
    },
  ])

  const statusLabels = {
    open: 'Новое',
    in_progress: 'В работе',
    closed: 'Закрыто',
  }

  const statusColors = {
    open: 'error',
    in_progress: 'warning',
    closed: 'success',
  }

  const filtered = complaints.filter((c) =>
    activeTab === 'all' ? true : c.status === activeTab
  )

  const handleOpenDialog = (complaint) => {
    setSelectedComplaint(complaint)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedComplaint(null)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ReportProblem sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Обращения и жалобы</Typography>
          <Typography variant="body2" color="text.secondary">
            Управление жалобами пациентов с маркетплейса и прямых обращений
          </Typography>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
        >
          <Tab label="Открытые" value="open" />
          <Tab label="В работе" value="in_progress" />
          <Tab label="Закрытые" value="closed" />
          <Tab label="Все" value="all" />
        </Tabs>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Пациент</TableCell>
                  <TableCell>Источник</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Кратко</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>
                      {new Date(c.date).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>{c.patientName}</TableCell>
                    <TableCell>{c.source}</TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[c.status]}
                        color={statusColors[c.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{c.summary}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleOpenDialog(c)}
                      >
                        Открыть
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Детали обращения</DialogTitle>
        <DialogContent>
          {selectedComplaint && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Alert
                severity={
                  selectedComplaint.status === 'closed' ? 'success' : 'warning'
                }
              >
                <Typography variant="body2">
                  Статус: {statusLabels[selectedComplaint.status]}
                </Typography>
              </Alert>
              <TextField
                fullWidth
                label="Пациент"
                value={selectedComplaint.patientName}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание проблемы"
                value={selectedComplaint.details}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Решение / комментарий клиники"
                defaultValue={selectedComplaint.resolution}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
          <Button variant="contained" startIcon={<CheckCircle />}>
            Сохранить и закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClinicComplaints
