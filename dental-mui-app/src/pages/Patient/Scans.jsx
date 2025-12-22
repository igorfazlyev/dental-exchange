import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from '@mui/material'
import {
  CloudUpload,
  Visibility,
  Assignment,
  LocalOffer,
  CheckCircle,
  Schedule,
  Close,
  CalendarToday,
  Image as ImageIcon,
} from '@mui/icons-material'
import { patientScans, treatmentPlans, treatmentTracking } from '../../data/mockData'

const PatientScans = () => {
  const navigate = useNavigate()
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [openScanModal, setOpenScanModal] = useState(false)
  const [selectedScan, setSelectedScan] = useState(null)

  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true)
  }

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false)
  }

  const handleViewScan = (scan) => {
    setSelectedScan(scan)
    setOpenScanModal(true)
  }

  const handleCloseScanModal = () => {
    setOpenScanModal(false)
    setSelectedScan(null)
  }

  const handleViewPlan = (scanId) => {
    navigate(`/patient/plan/${scanId}`)
  }

  const handleViewOffers = (scanId) => {
    navigate(`/patient/offers/${scanId}`)
  }

  const handleViewStatus = (scanId) => {
    navigate(`/patient/status/${scanId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'success'
      case 'processing':
        return 'warning'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'processed':
        return 'Обработан'
      case 'processing':
        return 'В обработке'
      case 'failed':
        return 'Ошибка'
      default:
        return status
    }
  }

  const getTreatmentStatusLabel = (status) => {
    switch (status) {
      case 'in_progress':
        return 'Лечение в процессе'
      case 'pending_consultation':
        return 'Ожидание консультации'
      case 'analyzing':
        return 'Анализ снимка'
      case 'completed':
        return 'Лечение завершено'
      default:
        return status
    }
  }

  const getTreatmentStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'primary'
      case 'pending_consultation':
        return 'warning'
      case 'analyzing':
        return 'info'
      case 'completed':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Мои снимки
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Управляйте вашими стоматологическими снимками и планами лечения
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={handleOpenUploadDialog}
          size="large"
        >
          Загрузить снимок
        </Button>
      </Box>

      {patientScans.length === 0 ? (
        <Alert severity="info">
          <Typography variant="body2">
            У вас пока нет загруженных снимков. Загрузите КТ или панорамный снимок для
            получения плана лечения.
          </Typography>
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {patientScans.map((scan) => {
            const plan = scan.treatmentPlanId
              ? treatmentPlans[scan.treatmentPlanId]
              : null
            const tracking = treatmentTracking[scan.id]

            return (
              <Card
                key={scan.id}
                elevation={2}
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={scan.id}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          label={scan.type}
                          color="info"
                          size="small"
                        />
                        <Chip
                          label={getStatusLabel(scan.status)}
                          color={getStatusColor(scan.status)}
                          size="small"
                        />
                        {scan.treatmentStatus && (
                          <Chip
                            label={getTreatmentStatusLabel(scan.treatmentStatus)}
                            color={getTreatmentStatusColor(scan.treatmentStatus)}
                            size="small"
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 4, mb: 2, flexWrap: 'wrap' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Дата загрузки
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {new Date(scan.date).toLocaleDateString('ru-RU')}
                          </Typography>
                        </Box>
                        {plan && (
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              План сформирован
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {new Date(plan.generatedDate).toLocaleDateString('ru-RU')}
                            </Typography>
                          </Box>
                        )}
                        {scan.hasOffers && (
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Предложения от клиник
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                              {scan.offersCount}{' '}
                              {scan.offersCount === 1
                                ? 'предложение'
                                : 'предложений'}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Treatment Progress */}
                      {tracking && tracking.overallProgress > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="caption" color="text.secondary">
                              {tracking.currentPhase}
                            </Typography>
                            <Typography variant="caption" fontWeight="medium">
                              {tracking.overallProgress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={tracking.overallProgress}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      )}

                      <Divider sx={{ my: 2 }} />

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleViewScan(scan)}
                        >
                          Просмотр
                        </Button>

                        {plan && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Assignment />}
                            onClick={() => handleViewPlan(scan.id)}
                          >
                            План лечения
                          </Button>
                        )}

                        {scan.hasOffers && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LocalOffer />}
                            onClick={() => handleViewOffers(scan.id)}
                          >
                            Предложения ({scan.offersCount})
                          </Button>
                        )}

                        {tracking && tracking.overallProgress > 0 && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Schedule />}
                            onClick={() => handleViewStatus(scan.id)}
                          >
                            Статус лечения
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}

      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CloudUpload />
            <Typography variant="h6">Загрузить новый снимок</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Поддерживаются форматы: DICOM, PNG, JPEG. Максимальный размер файла: 50
              МБ
            </Typography>
          </Alert>

          <Box
            sx={{
              border: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 6,
              textAlign: 'center',
              bgcolor: 'background.default',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
          >
            <CloudUpload sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Перетащите файл сюда
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              или нажмите, чтобы выбрать файл
            </Typography>
            <Button variant="outlined">Выбрать файл</Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Что произойдет дальше:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle fontSize="small" color="success" />
                <Typography variant="body2">
                  AI-анализ снимка (1-2 часа)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle fontSize="small" color="success" />
                <Typography variant="body2">
                  Формирование плана лечения
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle fontSize="small" color="success" />
                <Typography variant="body2">
                  Получение предложений от клиник
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseUploadDialog} variant="outlined">
            Отмена
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={handleCloseUploadDialog}
          >
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Scan Viewer Modal */}
      <Dialog
        open={openScanModal}
        onClose={handleCloseScanModal}
        maxWidth="md"
        fullWidth
      >
        {selectedScan && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ImageIcon />
                  <Typography variant="h6">
                    Просмотр снимка {selectedScan.id}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseScanModal}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      ID снимка
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedScan.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Тип снимка
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {selectedScan.type}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Дата загрузки
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Статус
                    </Typography>
                    <Chip
                      label={getStatusLabel(selectedScan.status)}
                      color={getStatusColor(selectedScan.status)}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: 'background.default',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 8,
                  textAlign: 'center',
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                <Box sx={{ fontSize: 80, mb: 2 }}>🦷</Box>
                <Typography variant="h5" gutterBottom>
                  3D визуализация{' '}
                  {selectedScan.type === 'CT' ? 'КТ' : 'панорамного'} снимка
                </Typography>
                <Typography variant="body2" paragraph>
                  Здесь будет отображаться интерактивная 3D-визуализация вашего снимка
                  с возможностью поворота, приближения и выделения проблемных зон
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Дата снимка:{' '}
                  {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2" gutterBottom>
                  <strong>Функционал в разработке</strong>
                </Typography>
                <Typography variant="body2">
                  Интерактивный просмотрщик DICOM-файлов с возможностью поворота,
                  приближения и выделения проблемных зон будет доступен в следующей
                  версии платформы.
                </Typography>
              </Alert>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseScanModal} variant="outlined">
                Закрыть
              </Button>
              <Button variant="outlined" startIcon={<CloudUpload />}>
                Скачать снимок
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default PatientScans
