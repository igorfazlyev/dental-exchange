import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Alert,
  IconButton,
} from '@mui/material'
import {
  Image,
  Upload,
  Visibility,
  Close,
  CheckCircle,
  Schedule,
  CloudUpload,
  Assignment,
} from '@mui/icons-material'
import { patientScans } from '../../data/mockData'

const PatientScans = () => {
  const [scans] = useState(patientScans)
  const [selectedScan, setSelectedScan] = useState(null)
  const navigate = useNavigate()

  const handleViewScan = (scan) => {
    setSelectedScan(scan)
  }

  const handleClose = () => {
    setSelectedScan(null)
  }

  const handleGoToTreatmentPlan = () => {
    navigate('/patient/plan')
  }

  const getStatusColor = (status) => {
    return status === 'processed' ? 'success' : 'warning'
  }

  const getStatusLabel = (status) => {
    return status === 'processed' ? 'Обработан' : 'В обработке'
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4">Мои снимки</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Upload />}
          size="large"
        >
          Загрузить снимок
        </Button>
      </Box>

      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            История снимков
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Дата загрузки</strong></TableCell>
                  <TableCell><strong>Тип</strong></TableCell>
                  <TableCell><strong>Статус обработки</strong></TableCell>
                  <TableCell><strong>AI анализ</strong></TableCell>
                  <TableCell><strong>Действия</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scans.map(scan => (
                  <TableRow key={scan.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {scan.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(scan.date).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>
                      <Chip label={scan.type} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(scan.status)}
                        size="small"
                        color={getStatusColor(scan.status)}
                        icon={scan.status === 'processed' ? <CheckCircle /> : <Schedule />}
                      />
                    </TableCell>
                    <TableCell>
                      {scan.aiAnalyzed ? (
                        <Chip
                          label="Завершен"
                          size="small"
                          color="success"
                          icon={<CheckCircle />}
                        />
                      ) : (
                        <Chip
                          label="В процессе"
                          size="small"
                          color="warning"
                          icon={<Schedule />}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => handleViewScan(scan)}
                      >
                        Просмотр
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
            <CloudUpload sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Загрузка снимков
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Загрузите КТ-снимок для получения AI-анализа и автоматического формирования плана лечения.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Поддерживаемые форматы:</strong> DICOM, JPG, PNG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Максимальный размер:</strong> 50 МБ
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Scan Viewer Dialog */}
      <Dialog
        open={!!selectedScan}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Просмотр снимка {selectedScan?.id}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
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
              3D визуализация КТ-снимка
            </Typography>
            <Typography variant="body2" paragraph>
              Здесь будет отображаться интерактивная 3D-визуализация вашего КТ-снимка
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата снимка: {selectedScan && new Date(selectedScan.date).toLocaleDateString('ru-RU')}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2" gutterBottom>
              <strong>Функционал в разработке</strong>
            </Typography>
            <Typography variant="body2">
              Интерактивный просмотрщик DICOM-файлов с возможностью поворота, приближения 
              и выделения проблемных зон будет доступен в следующей версии платформы.
            </Typography>
          </Alert>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleClose} variant="outlined">
            Закрыть
          </Button>
          <Button variant="outlined" startIcon={<CloudUpload />}>
            Скачать снимок
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Assignment />}
            onClick={handleGoToTreatmentPlan}
          >
            План лечения
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientScans
