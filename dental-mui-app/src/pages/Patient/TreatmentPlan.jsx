import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
  Paper,
  Grid,
  Avatar,
  Alert,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import {
  MedicalServices,
  PersonSearch,
  Visibility,
  LocalHospital,
  NavigateNext,
  Image as ImageIcon,
  Close,
  CloudDownload,
} from '@mui/icons-material'
import { treatmentPlans, patientScans, getCostBySpecialty } from '../../data/mockData'

const PatientTreatmentPlan = () => {
  const { scanId } = useParams()
  const navigate = useNavigate()
  const { activeScanId, setActiveScanId } = useScan()
  const [selectedScanId, setSelectedScanId] = useState(
    scanId || activeScanId || patientScans[0]?.id
  )
  const [selectedScan, setSelectedScan] = useState(null)
  const [plan, setPlan] = useState(null)
  const [openScanModal, setOpenScanModal] = useState(false)

  // All procedures are initially selected
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    if (selectedScanId) {
      setActiveScanId(selectedScanId)
      const scan = patientScans.find((s) => s.id === selectedScanId)
      setSelectedScan(scan)

      if (scan?.treatmentPlanId) {
        const treatmentPlan = treatmentPlans[scan.treatmentPlanId]
        setPlan(treatmentPlan)
        // Select all items by default
        setSelectedItems(treatmentPlan.items.map((item) => item.id))
      } else {
        setPlan(null)
        setSelectedItems([])
      }
    }
  }, [selectedScanId, setActiveScanId])

  const handleScanChange = (event) => {
    const newScanId = event.target.value
    setSelectedScanId(newScanId)
    navigate(`/patient/plan/${newScanId}`)
  }

  const handleGoToOffers = () => {
    navigate(`/patient/offers/${selectedScanId}`)
  }

  const handleOpenScanModal = () => {
    setOpenScanModal(true)
  }

  const handleCloseScanModal = () => {
    setOpenScanModal(false)
  }

  // ✅ Totals (per specialty) are based ONLY on selected items
  const costBySpec = plan
    ? getCostBySpecialty(plan.items.filter((item) => selectedItems.includes(item.id)))
    : {}

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const handleToggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleSelectSpecialty = (specialty) => {
    if (!plan) return

    const specialtyItems = plan.items
      .filter((item) => item.specialty === specialty)
      .map((item) => item.id)

    const allSelected = specialtyItems.every((id) => selectedItems.includes(id))

    if (allSelected) {
      // deselect all in this specialty
      setSelectedItems((prev) => prev.filter((id) => !specialtyItems.includes(id)))
    } else {
      // select all in this specialty
      setSelectedItems((prev) => [...new Set([...prev, ...specialtyItems])])
    }
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

  // ✅ Sort specialties: Orthopedics first, then Surgery, then Therapy
  const sortedSpecialties = Object.keys(specialtyNames).sort((a, b) => {
    const order = { orthopedics: 1, surgery: 2, therapy: 3 }
    return order[a] - order[b]
  })

  if (!selectedScan) {
    return (
      <Box>
        <Alert severity="warning">
          <Typography variant="body2">
            Не найдено ни одного снимка. Пожалуйста, загрузите снимок для получения плана
            лечения.
          </Typography>
        </Alert>
      </Box>
    )
  }

  if (!plan) {
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <MedicalServices sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4">План лечения</Typography>
            <Typography variant="body2" color="text.secondary">
              На основе AI-анализа вашего снимка
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
            План лечения для снимка {selectedScanId} находится в процессе формирования.
            AI-анализ обычно занимает 1-2 часа. Вы получите уведомление, когда план будет
            готов.
          </Typography>
        </Alert>
      </Box>
    )
  }

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
        <Link to="/patient/scans" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            color="text.secondary"
            sx={{ '&:hover': { textDecoration: 'underline' } }}
          >
            Мои снимки
          </Typography>
        </Link>
        <Typography color="text.primary" fontWeight="medium">
          {selectedScan.id}
        </Typography>
        <Typography color="text.primary" fontWeight="medium">
          План лечения
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <MedicalServices sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1">
            План лечения
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Результат AI-анализа снимка {selectedScan.id} от{' '}
            {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </Box>

      {/* Scan Selector */}
      {patientScans.filter((s) => s.treatmentPlanId).length > 1 && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Выберите снимок</InputLabel>
          <Select
            value={selectedScanId}
            label="Выберите снимок"
            onChange={handleScanChange}
          >
            {patientScans
              .filter((s) => s.treatmentPlanId)
              .map((scan) => (
                <MenuItem key={scan.id} value={scan.id}>
                  {scan.id} - {scan.type} ({new Date(scan.date).toLocaleDateString('ru-RU')})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {/* Scan Info Card */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <ImageIcon color="primary" />
            <Typography variant="h6">Информация о снимке</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
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
                План сформирован
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {new Date(plan.generatedDate).toLocaleDateString('ru-RU')}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            onClick={handleOpenScanModal}
          >
            Просмотреть снимок
          </Button>
        </CardContent>
      </Card>

      {/* Specialist Recommendation */}
      <Card sx={{ mb: 3, borderLeft: 4, borderColor: 'primary.main' }} elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
              <PersonSearch sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Рекомендация специалиста
              </Typography>
              <Typography variant="h6" gutterBottom>
                Рекомендуется начать с консультации:{' '}
                <strong>{plan.recommendation.specialist}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {plan.recommendation.reason}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Treatment by Specialization with Selection */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Выберите работы для запроса предложений
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Вы можете выбрать весь план или только часть работ
          </Typography>

          {sortedSpecialties.map((specialty) => {
            // all procedures of this specialty (for display)
            const allProceduresForSpec = plan.items.filter(
              (item) => item.specialty === specialty
            )

            if (allProceduresForSpec.length === 0) return null

            // selected procedures for this specialty (for totals)
            const selectedProceduresForSpec = allProceduresForSpec.filter((item) =>
              selectedItems.includes(item.id)
            )

            const specTotals = costBySpec[specialty]
            const specMin = specTotals?.min ?? 0
            const specMax = specTotals?.max ?? 0

            const allSelected = allProceduresForSpec.every((item) =>
              selectedItems.includes(item.id)
            )
            const someSelected = selectedProceduresForSpec.length > 0 && !allSelected

            return (
              <Paper
                key={specialty}
                sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}
                variant="outlined"
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onChange={() => handleSelectSpecialty(specialty)}
                      />
                    }
                    label={
                      <Typography variant="h6">{specialtyNames[specialty]}</Typography>
                    }
                  />
                  <Chip
                    label={
                      selectedProceduresForSpec.length > 0
                        ? `${formatCost(specMin)} - ${formatCost(specMax)}`
                        : '0 ₽'
                    }
                    color={specialtyColors[specialty]}
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>

                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell>
                          <strong>Номер зуба</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Патология</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Процедура</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Стоимость</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allProceduresForSpec.map((proc) => (
                        <TableRow key={proc.id} hover>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedItems.includes(proc.id)}
                              onChange={() => handleToggleItem(proc.id)}
                            />
                          </TableCell>
                          <TableCell>
                            {proc.toothNumber ? (
                              <Chip label={`№${proc.toothNumber}`} size="small" />
                            ) : (
                              <Typography color="text.disabled">—</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{proc.pathology}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {proc.procedureType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {formatCost(proc.estimatedCostMin)} -{' '}
                              {formatCost(proc.estimatedCostMax)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )
          })}
        </CardContent>
      </Card>

      {/* Cost Summary for Selected Items */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {sortedSpecialties.map((specialty) => {
          const specTotals = costBySpec[specialty]
          const allProceduresForSpec = plan.items.filter(
            (item) => item.specialty === specialty
          )
          const selectedProceduresForSpec = allProceduresForSpec.filter((item) =>
            selectedItems.includes(item.id)
          )

          if (allProceduresForSpec.length === 0) return null

          const specMin = specTotals?.min ?? 0
          const specMax = specTotals?.max ?? 0

          return (
            <Grid item xs={12} md={4} key={specialty}>
              <Card
                sx={{
                  borderLeft: 4,
                  borderColor: `${specialtyColors[specialty]}.main`,
                  opacity: selectedProceduresForSpec.length > 0 ? 1 : 0.5,
                }}
                elevation={2}
              >
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    {specialtyNames[specialty]}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {selectedProceduresForSpec.length > 0
                      ? `${formatCost(specMin)} - ${formatCost(specMax)}`
                      : '0 ₽'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProceduresForSpec.length} / {allProceduresForSpec.length}{' '}
                    процедур(ы)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Alert severity="warning" sx={{ mb: 2 }}>
        <strong>Обратите внимание:</strong> Стоимость является ориентировочной. Точная
        цена будет определена после консультации в клинике.
      </Alert>

      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<LocalHospital />}
        onClick={handleGoToOffers}
        disabled={selectedItems.length === 0}
      >
        Получить предложения от клиник ({selectedItems.length}{' '}
        {selectedItems.length === 1 ? 'процедура' : 'процедур'})
      </Button>

      {/* Scan Viewer Modal */}
      <Dialog open={openScanModal} onClose={handleCloseScanModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">Просмотр снимка {selectedScan.id}</Typography>
            <IconButton onClick={handleCloseScanModal}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ID снимка
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {selectedScan.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Тип снимка
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {selectedScan.type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Дата загрузки
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Статус
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {selectedScan.status === 'processed' ? 'Обработан' : 'В обработке'}
                </Typography>
              </Grid>
            </Grid>
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
              3D визуализация {selectedScan.type === 'CT' ? 'КТ' : 'панорамного'} снимка
            </Typography>
            <Typography variant="body2" paragraph>
              Здесь будет отображаться интерактивная 3D-визуализация вашего снимка с
              возможностью поворота, приближения и выделения проблемных зон
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Дата снимка: {new Date(selectedScan.date).toLocaleDateString('ru-RU')}
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
          <Button onClick={handleCloseScanModal} variant="outlined">
            Закрыть
          </Button>
          <Button variant="outlined" startIcon={<CloudDownload />}>
            Скачать снимок
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientTreatmentPlan
