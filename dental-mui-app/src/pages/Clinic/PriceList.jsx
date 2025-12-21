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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  AttachMoney,
  Edit,
  Add,
  Delete,
  Save,
  CloudUpload,
} from '@mui/icons-material'

const ClinicPriceList = () => {
  const [activeTab, setActiveTab] = useState('therapy')
  const [openDialog, setOpenDialog] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Mock price list data
  const [priceList] = useState({
    therapy: [
      {
        id: 1,
        code: 'T-001',
        name: 'Лечение кариеса (простой)',
        price: 5000,
        duration: 60,
        aiCompatible: true,
      },
      {
        id: 2,
        code: 'T-002',
        name: 'Лечение кариеса (средний)',
        price: 8000,
        duration: 90,
        aiCompatible: true,
      },
      {
        id: 3,
        code: 'T-003',
        name: 'Лечение пульпита (1 канал)',
        price: 10000,
        duration: 120,
        aiCompatible: true,
      },
      {
        id: 4,
        code: 'T-004',
        name: 'Лечение пульпита (3 канала)',
        price: 18000,
        duration: 150,
        aiCompatible: true,
      },
      {
        id: 5,
        code: 'T-005',
        name: 'Профессиональная гигиена',
        price: 5000,
        duration: 60,
        aiCompatible: false,
      },
    ],
    orthopedics: [
      {
        id: 6,
        code: 'O-001',
        name: 'Металлокерамическая коронка',
        price: 25000,
        duration: 120,
        aiCompatible: true,
      },
      {
        id: 7,
        code: 'O-002',
        name: 'Керамическая коронка E-max',
        price: 35000,
        duration: 120,
        aiCompatible: true,
      },
      {
        id: 8,
        code: 'O-003',
        name: 'Имплантация (1 зуб)',
        price: 65000,
        duration: 180,
        aiCompatible: true,
      },
      {
        id: 9,
        code: 'O-004',
        name: 'Съемный протез (частичный)',
        price: 45000,
        duration: 90,
        aiCompatible: false,
      },
    ],
    surgery: [
      {
        id: 10,
        code: 'S-001',
        name: 'Удаление зуба (простое)',
        price: 3000,
        duration: 30,
        aiCompatible: true,
      },
      {
        id: 11,
        code: 'S-002',
        name: 'Удаление зуба мудрости',
        price: 15000,
        duration: 60,
        aiCompatible: true,
      },
      {
        id: 12,
        code: 'S-003',
        name: 'Костная пластика',
        price: 35000,
        duration: 120,
        aiCompatible: true,
      },
    ],
  })

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const handleEdit = (item) => {
    setEditingItem({ ...item })
    setOpenDialog(true)
  }

  const handleAddNew = () => {
    setEditingItem({
      id: Date.now(),
      code: '',
      name: '',
      price: 0,
      duration: 60,
      aiCompatible: true,
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingItem(null)
  }

  const handleSave = () => {
    // Save logic here
    handleCloseDialog()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachMoney sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">Прайс-лист</Typography>
            <Typography variant="body2" color="text.secondary">
              Управление ценами на услуги
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<CloudUpload />}>
            Экспорт
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddNew}>
            Добавить услугу
          </Button>
        </Box>
      </Box>

      {/* Specialty Tabs */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label="Терапия" value="therapy" />
          <Tab label="Ортопедия" value="orthopedics" />
          <Tab label="Хирургия" value="surgery" />
        </Tabs>
      </Card>

      {/* Price Table */}
      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{specialtyNames[activeTab]}</Typography>
            <Chip
              label={`${priceList[activeTab].length} услуг`}
              color="primary"
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Код</strong></TableCell>
                  <TableCell><strong>Название услуги</strong></TableCell>
                  <TableCell><strong>Цена</strong></TableCell>
                  <TableCell><strong>Длительность (мин)</strong></TableCell>
                  <TableCell><strong>AI-совместимость</strong></TableCell>
                  <TableCell><strong>Действия</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceList[activeTab].map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Chip label={item.code} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {formatCost(item.price)}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.duration} мин</TableCell>
                    <TableCell>
                      {item.aiCompatible ? (
                        <Chip label="Да" size="small" color="success" />
                      ) : (
                        <Chip label="Нет" size="small" color="default" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit / Add Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingItem?.code ? 'Редактировать услугу' : 'Добавить услугу'}
        </DialogTitle>
        <DialogContent>
          {editingItem && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                label="Код услуги"
                value={editingItem.code}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, code: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Название услуги"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="Цена (₽)"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, price: Number(e.target.value) })
                }
              />
              <TextField
                fullWidth
                type="number"
                label="Длительность (мин)"
                value={editingItem.duration}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, duration: Number(e.target.value) })
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingItem.aiCompatible}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, aiCompatible: e.target.checked })
                    }
                  />
                }
                label="AI-совместимая услуга"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClinicPriceList