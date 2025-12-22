import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../../contexts/ScanContext'
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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material'
import {
  CalendarMonth,
  Visibility,
  Cancel,
  CheckCircle,
  Schedule,
  Image as ImageIcon,
  Assignment,
  Person,
  LocalHospital,
} from '@mui/icons-material'
import { consultations, patientScans } from '../../data/mockData'

const PatientConsultations = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const { setActiveScanId } = useScan()

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedConsultation(null)
  }

  const handleGoToScan = (scanId) => {
    setActiveScanId(scanId)
    navigate('/patient/scans')
  }

  const handleGoToTreatmentPlan = (scanId) => {
    setActiveScanId(scanId)
    navigate(`/patient/plan/${scanId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'upcoming':
        return 'info'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершена'
      case 'upcoming':
        return 'Запланирована'
      case 'cancelled':
        return 'Отменена'
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />
      case 'upcoming':
        return <Schedule />
      case 'cancelled':
        return <Cancel />
      default:
        return null
    }
  }

  // Group consultations by scan
  const consultationsByScan = consultations.reduce((acc, consultation) => {
    const scanId = consultation.scanId
    if (!acc[scanId]) {
      acc[scanId] = []
    }
    acc[scanId].push(consultation)
    return acc
  }, {})

  // Filter consultations based on active tab
  const getFilteredConsultations = () => {
    switch (activeTab) {
      case 1:
        return consultations.filter((c) => c.status === 'upcoming')
      case 2:
        return consultations.filter((c) => c.status === 'completed')
      default:
        return consultations
    }
  }

  const filteredConsultations = getFilteredConsultations()

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CalendarMonth sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Консультации</Typography>
          <Typography variant="body2" color="text.secondary">
            История и запланированные консультации
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={`Все (${consultations.length})`} />
          <Tab label={`Предстоящие (${consultations.filter((c) => c.status === 'upcoming').length})`} />
          <Tab label={`Завершенные (${consultations.filter((c) => c.status === 'completed').length})`} />
        </Tabs>
      </Card>

      {filteredConsultations.length === 0 ? (
        <Alert severity="info">
          <Typography variant="body2">
            {activeTab === 0 && 'У вас пока нет консультаций. Выберите клинику и запишитесь на прием.'}
            {activeTab === 1 && 'У вас нет запланированных консультаций.'}
            {activeTab === 2 && 'У вас нет завершенных консультаций.'}
          </Typography>
        </Alert>
      ) : (
        <Card elevation={2}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Снимок</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Дата и время</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Клиника</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Врач</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Специализация</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Статус</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Действия</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredConsultations.map((consultation) => {
                    const scan = patientScans.find((s) => s.id === consultation.scanId)
                    return (
                      <TableRow key={consultation.id} hover>
                        <TableCell>
                          <Chip
                            label={consultation.scanId}
                            size="small"
                            icon={<ImageIcon />}
                            clickable
                            onClick={() => handleGoToScan(consultation.scanId)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(consultation.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {consultation.time}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {consultation.clinic}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{consultation.doctor}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={consultation.specialty} size="small" color="primary" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusLabel(consultation.status)}
                            size="small"
                            color={getStatusColor(consultation.status)}
                            icon={getStatusIcon(consultation.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Visibility />}
                            onClick={() => handleViewDetails(consultation)}
                          >
                            Детали
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Grouped by Scan View */}
      {activeTab === 0 && consultations.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            По снимкам
          </Typography>
          {Object.entries(consultationsByScan).map(([scanId, scanConsultations]) => {
            const scan = patientScans.find((s) => s.id === scanId)
            return (
              <Card key={scanId} sx={{ mb: 2 }} elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ImageIcon color="primary" />
                      <Box>
                        <Typography variant="h6">{scanId}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {scan?.type} • {new Date(scan?.date).toLocaleDateString('ru-RU')}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label={`${scanConsultations.length} консультаций`} size="small" />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {scanConsultations.map((consultation) => (
                      <Box
                        key={consultation.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {consultation.clinic} • {consultation.specialty}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(consultation.date).toLocaleDateString('ru-RU')} в {consultation.time}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip
                            label={getStatusLabel(consultation.status)}
                            size="small"
                            color={getStatusColor(consultation.status)}
                          />
                          <Button size="small" onClick={() => handleViewDetails(consultation)}>
                            Детали
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}

      {/* Consultation Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Детали консультации</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedConsultation && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Связанный снимок
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip
                    label={selectedConsultation.scanId}
                    size="small"
                    icon={<ImageIcon />}
                    clickable
                    onClick={() => {
                      handleCloseDialog()
                      handleGoToScan(selectedConsultation.scanId)
                    }}
                  />
                  <Button
                    size="small"
                    startIcon={<Assignment />}
                    onClick={() => {
                      handleCloseDialog()
                      handleGoToTreatmentPlan(selectedConsultation.scanId)
                    }}
                  >
                    План лечения
                  </Button>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalHospital color="primary" />
                  <Typography variant="subtitle2">Клиника</Typography>
                </Box>
                <Typography variant="body2">{selectedConsultation.clinic}</Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Person color="primary" />
                  <Typography variant="subtitle2">Врач</Typography>
                </Box>
                <Typography variant="body2">{selectedConsultation.doctor}</Typography>
                <Chip
                  label={selectedConsultation.specialty}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarMonth color="primary" />
                  <Typography variant="subtitle2">Дата и время</Typography>
                </Box>
                <Typography variant="body2">
                  {new Date(selectedConsultation.date).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedConsultation.time}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Статус
                </Typography>
                <Chip
                  label={getStatusLabel(selectedConsultation.status)}
                  color={getStatusColor(selectedConsultation.status)}
                  icon={getStatusIcon(selectedConsultation.status)}
                />
              </Box>

              {selectedConsultation.notes && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Заметки
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedConsultation.notes}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
          {selectedConsultation?.status === 'upcoming' && (
            <Button variant="outlined" color="error">
              Отменить консультацию
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientConsultations
