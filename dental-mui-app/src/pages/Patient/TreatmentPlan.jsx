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
  Paper,
  Grid,
  Avatar,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import {
  MedicalServices,
  PersonSearch,
  Visibility,
  LocalHospital,
} from '@mui/icons-material'
import { treatmentPlan, getCostBySpecialty } from '../../data/mockData'

const PatientTreatmentPlan = () => {
  const navigate = useNavigate()

  // All procedures are initially selected
  const [selectedItems, setSelectedItems] = useState(
    treatmentPlan.items.map((item) => item.id)
  )

  // ✅ Totals (per specialty) are based ONLY on selected items
  const costBySpec = getCostBySpecialty(
    treatmentPlan.items.filter((item) => selectedItems.includes(item.id))
  )

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const handleToggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectSpecialty = (specialty) => {
    const specialtyItems = treatmentPlan.items
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

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <MedicalServices sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" component="h1">
            План лечения
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Результат AI-анализа от 15.11.2025
          </Typography>
        </Box>
      </Box>

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
                <strong>{treatmentPlan.recommendation.specialist}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {treatmentPlan.recommendation.reason}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* CT Scan Visualization */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Visibility /> Визуализация снимка
          </Typography>

          <Box
            sx={{
              bgcolor: 'background.default',
              border: 2,
              borderStyle: 'dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 6,
              textAlign: 'center',
              color: 'text.secondary',
              mb: 3,
            }}
          >
            <Box sx={{ fontSize: 64, mb: 2 }}>🦷</Box>
            <Typography>
              Здесь отображается 3D-визуализация КТ-снимка с маркерами проблемных зон
            </Typography>
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
            const allProceduresForSpec = treatmentPlan.items.filter(
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
            const someSelected =
              selectedProceduresForSpec.length > 0 && !allSelected

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
                      <Typography variant="h6">
                        {specialtyNames[specialty]}
                      </Typography>
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
                            <Typography variant="body2">
                              {proc.pathology}
                            </Typography>
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
          const allProceduresForSpec = treatmentPlan.items.filter(
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
        <strong>Обратите внимание:</strong> Стоимость является ориентировочной.
        Точная цена будет определена после консультации в клинике.
      </Alert>

      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<LocalHospital />}
        onClick={() => navigate('/patient/offers')}
        disabled={selectedItems.length === 0}
      >
        Получить предложения от клиник ({selectedItems.length}{' '}
        {selectedItems.length === 1 ? 'процедура' : 'процедур'})
      </Button>
    </Box>
  )
}

export default PatientTreatmentPlan
