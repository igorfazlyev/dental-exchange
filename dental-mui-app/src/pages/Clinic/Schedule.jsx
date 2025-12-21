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
  Tabs,
  Tab,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { Event, Add, AccessTime, Edit } from '@mui/icons-material'

const ClinicSchedule = () => {
  const [activeTab, setActiveTab] = useState('today')
  const [selectedItem, setSelectedItem] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [items] = useState([
    {
      id: 'sch-001',
      date: '2025-12-22',
      time: '09:00',
      doctor: 'Иванова М.С.',
      patient: 'Козлов Владимир',
      type: 'Консультация',
      source: 'Маркетплейс',
      room: 'Каб. 1',
    },
    {
      id: 'sch-002',
      date: '2025-12-22',
      time: '11:30',
      doctor: 'Петров А.И.',
      patient: 'Морозова Елена',
      type: 'Имплантация',
      source: 'Маркетплейс',
      room: 'Каб. 3',
    },
    {
      id: 'sch-003',
      date: '2025-12-23',
      time: '10:00',
      doctor: 'Иванова М.С.',
      patient: 'Федорова Анна',
      type: 'Повторный прием',
      source: 'Повторный пациент',
      room: 'Каб. 1',
    },
  ])

  const filterByTab = (list) => {
    if (activeTab === 'today') {
      return list.filter((i) => i.date === '2025-12-22')
    }
    if (activeTab === 'future') {
      return list.filter((i) => i.date > '2025-12-22')
    }
    return list
  }

  const filtered = filterByTab(items)

  const handleOpen = (item) => {
    setSelectedItem(item)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
    setSelectedItem(null)
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
          <Event sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">График приемов</Typography>
            <Typography variant="body2" color="text.secondary">
              Обзор расписания врачей по дням
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />}>
          Новая запись
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
        >
          <Tab label="Сегодня" value="today" />
          <Tab label="Будущие" value="future" />
          <Tab label="Все" value="all" />
        </Tabs>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell>Время</TableCell>
                  <TableCell>Врач</TableCell>
                  <TableCell>Пациент</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Источник</TableCell>
                  <TableCell>Кабинет</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((i) => (
                  <TableRow key={i.id} hover>
                    <TableCell>
                      {new Date(i.date).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <AccessTime fontSize="small" />
                        </Avatar>
                        {i.time}
                      </Box>
                    </TableCell>
                    <TableCell>{i.doctor}</TableCell>
                    <TableCell>{i.patient}</TableCell>
                    <TableCell>{i.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={i.source}
                        size="small"
                        color={i.source === 'Маркетплейс' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{i.room}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => handleOpen(i)}
                      >
                        Детали
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Редактирование записи</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                fullWidth
                label="Пациент"
                value={selectedItem.patient}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Врач"
                value={selectedItem.doctor}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Дата"
                value={new Date(selectedItem.date).toLocaleDateString('ru-RU')}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Время"
                value={selectedItem.time}
                InputProps={{ readOnly: true }}
              />
              <TextField fullWidth label="Кабинет" value={selectedItem.room} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClinicSchedule
