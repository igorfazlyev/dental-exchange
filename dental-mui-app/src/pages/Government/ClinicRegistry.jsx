import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Alert,
} from '@mui/material'
import { Business, Visibility, CheckCircle, Warning } from '@mui/icons-material'
import { clinicRegistry } from '../../data/mockData'

const GovernmentClinicRegistry = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const statusLabels = {
    active: 'Активна',
    suspended: 'Приостановлена',
  }

  const statusColors = {
    active: 'success',
    suspended: 'error',
  }

  const specialtyLabels = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  const filteredClinics = clinicRegistry.filter((c) => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return c.status === 'active'
    if (activeTab === 'suspended') return c.status === 'suspended'
    return true
  })

  const handleOpenDialog = (clinic) => {
    setSelectedClinic(clinic)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedClinic(null)
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('ru-RU')

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Business sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Реестр клиник</Typography>
          <Typography variant="body2" color="text.secondary">
            Зарегистрированные стоматологические клиники региона
          </Typography>
        </Box>
      </Box>

      {/* Filter Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label="Все клиники" value="all" />
          <Tab
            label="Активные"
            value="active"
            icon={
              <Chip
                label={clinicRegistry.filter((c) => c.status === 'active').length}
                size="small"
                color="success"
              />
            }
            iconPosition="end"
          />
          <Tab
            label="Приостановленные"
            value="suspended"
            icon={
              <Chip
                label={clinicRegistry.filter((c) => c.status === 'suspended').length}
                size="small"
                color="error"
              />
            }
            iconPosition="end"
          />
        </Tabs>
      </Card>

      {/* Clinics Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Район</TableCell>
                  <TableCell>Лицензия</TableCell>
                  <TableCell>Действительна до</TableCell>
                  <TableCell>Врачи</TableCell>
                  <TableCell>Пациентов/мес</TableCell>
                  <TableCell>Рейтинг</TableCell>
                  <TableCell>Жалобы</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClinics.map((clinic) => (
                  <TableRow key={clinic.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {clinic.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {clinic.legalName}
                      </Typography>
                    </TableCell>
                    <TableCell>{clinic.district}</TableCell>
                    <TableCell>
                      <Typography variant="caption">{clinic.license}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(clinic.licenseValidUntil)}
                      </Typography>
                    </TableCell>
                    <TableCell>{clinic.doctorsCount}</TableCell>
                    <TableCell>{clinic.patientsPerMonth}</TableCell>
                    <TableCell>
                      <Chip
                        label={`★ ${clinic.rating}`}
                        size="small"
                        color={clinic.rating >= 4.5 ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={clinic.complaintsCount}
                        size="small"
                        color={clinic.complaintsCount > 5 ? 'error' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusLabels[clinic.status]}
                        size="small"
                        color={statusColors[clinic.status]}
                        icon={
                          clinic.status === 'active' ? (
                            <CheckCircle />
                          ) : (
                            <Warning />
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => handleOpenDialog(clinic)}
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

      {/* Clinic Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Карточка клиники</DialogTitle>
        <DialogContent>
          {selectedClinic && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              {selectedClinic.status === 'suspended' && (
                <Alert severity="error">
                  <Typography variant="body2" fontWeight="medium">
                    Лицензия приостановлена
                  </Typography>
                  <Typography variant="body2">
                    Причина: {selectedClinic.suspensionReason}
                  </Typography>
                </Alert>
              )}

              <Alert severity="info">
                <Typography variant="body2" gutterBottom>
                  <strong>Название:</strong> {selectedClinic.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Юридическое название:</strong> {selectedClinic.legalName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>ИНН:</strong> {selectedClinic.inn}
                </Typography>
                <Typography variant="body2">
                  <strong>Адрес:</strong> {selectedClinic.address}
                </Typography>
              </Alert>

              <Typography variant="h6">Лицензия</Typography>
              <TextField
                fullWidth
                label="Номер лицензии"
                value={selectedClinic.license}
                InputProps={{ readOnly: true }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Выдана"
                  value={formatDate(selectedClinic.licenseIssueDate)}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Действительна до"
                  value={formatDate(selectedClinic.licenseValidUntil)}
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <Typography variant="h6">Руководство</Typography>
              <TextField
                fullWidth
                label="Директор"
                value={selectedClinic.director}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Главный врач"
                value={selectedClinic.chiefDoctor}
                InputProps={{ readOnly: true }}
              />

              <Typography variant="h6">Специализации</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedClinic.specialties.map((spec, idx) => (
                  <Chip key={idx} label={specialtyLabels[spec]} color="primary" />
                ))}
              </Box>

              <Typography variant="h6">Статистика</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Врачей"
                  value={selectedClinic.doctorsCount}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Пациентов/мес"
                  value={selectedClinic.patientsPerMonth}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Рейтинг"
                  value={selectedClinic.rating}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Жалоб"
                  value={selectedClinic.complaintsCount}
                  InputProps={{ readOnly: true }}
                />
              </Box>

              <TextField
                fullWidth
                label="Последняя проверка"
                value={formatDate(selectedClinic.lastInspection)}
                InputProps={{ readOnly: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
          {selectedClinic?.status === 'suspended' && (
            <Button variant="contained" color="success">
              Восстановить лицензию
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default GovernmentClinicRegistry