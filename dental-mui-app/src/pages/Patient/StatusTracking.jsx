import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useScan } from '../../contexts/ScanContext'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Button,
  LinearProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Divider,
  Grid,
} from '@mui/material'
import {
  Timeline,
  CheckCircle,
  Schedule,
  Image as ImageIcon,
  Assignment,
  LocalHospital,
  CalendarMonth,
  EmojiEvents,
  NavigateNext,
  Pending,
} from '@mui/icons-material'
import { treatmentTracking, patientScans } from '../../data/mockData'

const PatientStatusTracking = () => {
  const { scanId } = useParams()
  const navigate = useNavigate()
  const { activeScanId, setActiveScanId } = useScan()
  const [selectedScanId, setSelectedScanId] = useState(
    scanId || activeScanId || patientScans[0]?.id
  )
  const [selectedScan, setSelectedScan] = useState(null)
  const [tracking, setTracking] = useState(null)

  useEffect(() => {
    if (selectedScanId) {
      setActiveScanId(selectedScanId)
      const scan = patientScans.find((s) => s.id === selectedScanId)
      setSelectedScan(scan)

      if (treatmentTracking[selectedScanId]) {
        setTracking(treatmentTracking[selectedScanId])
      } else {
        setTracking(null)
      }
    }
  }, [selectedScanId, setActiveScanId])

  const handleScanChange = (event) => {
    const newScanId = event.target.value
    setSelectedScanId(newScanId)
    navigate(`/patient/status/${newScanId}`)
  }

  const getStepIcon = (type, status) => {
    const iconProps = {
      sx: {
        fontSize: 28,
        color:
          status === 'completed'
            ? 'success.main'
            : status === 'in_progress'
            ? 'primary.main'
            : 'text.secondary',
      },
    }

    switch (type) {
      case 'scan':
        return <ImageIcon {...iconProps} />
      case 'plan':
      case 'analysis':
        return <Assignment {...iconProps} />
      case 'offers':
        return <LocalHospital {...iconProps} />
      case 'consultation':
        return <CalendarMonth {...iconProps} />
      case 'treatment':
        return <Timeline {...iconProps} />
      case 'completion':
        return <EmojiEvents {...iconProps} />
      default:
        return <CheckCircle {...iconProps} />
    }
  }

  const getStatusChip = (status) => {
    switch (status) {
      case 'completed':
        return <Chip label="Завершено" size="small" color="success" icon={<CheckCircle />} />
      case 'in_progress':
        return <Chip label="В процессе" size="small" color="primary" icon={<Schedule />} />
      case 'upcoming':
        return <Chip label="Запланировано" size="small" color="info" icon={<Schedule />} />
      case 'pending':
        return <Chip label="Ожидается" size="small" color="default" icon={<Pending />} />
      default:
        return null
    }
  }

  const getActiveStep = () => {
    if (!tracking) return 0
    const timeline = tracking.timeline
    for (let i = timeline.length - 1; i >= 0; i--) {
      if (timeline[i].status === 'completed' || timeline[i].status === 'in_progress') {
        return i
      }
    }
    return 0
  }

  if (!selectedScan) {
    return (
      <Box>
        <Alert severity="warning">
          <Typography variant="body2">
            Не найдено ни одного снимка. Пожалуйста, загрузите снимок для отслеживания лечения.
          </Typography>
        </Alert>
      </Box>
    )
  }

  if (!tracking) {
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Timeline sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">Статус лечения</Typography>
            <Typography variant="body2" color="text.secondary">
              Отслеживание прогресса вашего лечения
            </Typography>
          </Box>
        </Box>

        {patientScans.length > 1 && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Выберите снимок</InputLabel>
            <Select
              value={selectedScanId}
              label="Выберите снимок"
              onChange={handleScanChange}
            >
              {patientScans.map((scan) => (
                <MenuItem key={scan.id} value={scan.id}>
                  {scan.id} - {scan.type} ({new Date(scan.date).toLocaleDateString('ru-RU')})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Alert severity="info">
          <Typography variant="body2">
            Информация о лечении для снимка {selectedScanId} пока недоступна. Данные появятся после начала лечения.
          </Typography>
        </Alert>
      </Box>
    )
  }

  const activeStep = getActiveStep()

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
        <Link to="/patient/scans" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            Мои снимки
          </Typography>
        </Link>
        <Typography color="text.primary" fontWeight="medium">
          {selectedScan.id}
        </Typography>
        <Typography color="text.primary" fontWeight="medium">
          Статус лечения
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Timeline sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">Статус лечения</Typography>
          <Typography variant="body2" color="text.secondary">
            Снимок {selectedScan.id} от {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Box>

      {/* Scan Selector */}
      {patientScans.length > 1 && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Выберите снимок</InputLabel>
          <Select value={selectedScanId} label="Выберите снимок" onChange={handleScanChange}>
            {patientScans.map((scan) => (
              <MenuItem key={scan.id} value={scan.id}>
                {scan.id} - {scan.type} ({new Date(scan.date).toLocaleDateString('ru-RU')}) -{' '}
                {scan.treatmentStatus === 'in_progress'
                  ? 'В процессе лечения'
                  : scan.treatmentStatus === 'pending_consultation'
                  ? 'Ожидание консультации'
                  : 'Анализ'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Progress Overview Card */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Текущий этап
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tracking.currentPhase}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Дата начала
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tracking.startDate ? new Date(tracking.startDate).toLocaleDateString('ru-RU') : 'Не начато'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Ожидаемое завершение
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {tracking.estimatedCompletion
                    ? new Date(tracking.estimatedCompletion).toLocaleDateString('ru-RU')
                    : 'Уточняется'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Общий прогресс лечения
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {tracking.overallProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={tracking.overallProgress}
              sx={{ height: 10, borderRadius: 1 }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Хронология лечения
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical">
            {tracking.timeline.map((event, index) => (
              <Step key={index} expanded>
                <StepLabel
                  StepIconComponent={() => getStepIcon(event.type, event.status)}
                  optional={
                    <Typography variant="caption" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {event.title}
                    </Typography>
                    {getStatusChip(event.status)}
                  </Box>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>
                  {event.status === 'in_progress' && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        Этот этап сейчас в процессе выполнения
                      </Typography>
                    </Alert>
                  )}
                  {event.status === 'upcoming' && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        Запланировано на {new Date(event.date).toLocaleDateString('ru-RU')}
                      </Typography>
                    </Alert>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card sx={{ mt: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Быстрые действия
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              onClick={() => navigate('/patient/scans')}
            >
              Посмотреть снимок
            </Button>
            <Button
              variant="outlined"
              startIcon={<Assignment />}
              onClick={() => navigate(`/patient/plan/${selectedScanId}`)}
            >
              План лечения
            </Button>
            {selectedScan.hasOffers && (
              <Button
                variant="outlined"
                startIcon={<LocalHospital />}
                onClick={() => navigate(`/patient/offers/${selectedScanId}`)}
              >
                Предложения клиник
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<CalendarMonth />}
              onClick={() => navigate('/patient/consultations')}
            >
              Мои консультации
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PatientStatusTracking
