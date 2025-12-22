import { useState } from 'react'
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
} from '@mui/material'
import { DateRange, CalendarToday } from '@mui/icons-material'

const PeriodSelector = ({ onPeriodChange, defaultPeriod = 'last30days' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod)
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const presetPeriods = {
    last7days: { label: 'Последние 7 дней', days: 7 },
    last30days: { label: 'Последние 30 дней', days: 30 },
    last3months: { label: 'Последние 3 месяца', days: 90 },
    last6months: { label: 'Последние 6 месяцев', days: 180 },
    lastyear: { label: 'Последний год', days: 365 },
    all: { label: 'Весь период', days: null },
    custom: { label: 'Произвольный период', days: null },
  }

  const calculateDateRange = (period) => {
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    
    if (period === 'all') {
      return { startDate: null, endDate: null }
    }
    
    if (period === 'custom') {
      return null // Will be handled separately
    }
    
    const days = presetPeriods[period].days
    const start = new Date()
    start.setDate(start.getDate() - days)
    start.setHours(0, 0, 0, 0)
    
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    }
  }

  const handlePeriodChange = (event) => {
    const period = event.target.value
    setSelectedPeriod(period)
    
    if (period === 'custom') {
      setShowCustom(true)
      return
    }
    
    setShowCustom(false)
    const dateRange = calculateDateRange(period)
    onPeriodChange(dateRange)
  }

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onPeriodChange({
        startDate: customStart,
        endDate: customEnd,
      })
    }
  }

  const getCurrentPeriodLabel = () => {
    if (selectedPeriod === 'custom' && customStart && customEnd) {
      return `${customStart} — ${customEnd}`
    }
    return presetPeriods[selectedPeriod].label
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday color="action" />
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <Select
              value={selectedPeriod}
              onChange={handlePeriodChange}
              displayEmpty
            >
              {Object.entries(presetPeriods).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {showCustom && (
          <>
            <TextField
              type="date"
              label="Начало периода"
              size="small"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              label="Конец периода"
              size="small"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleCustomApply}
              disabled={!customStart || !customEnd}
            >
              Применить
            </Button>
          </>
        )}

        <Chip
          icon={<DateRange />}
          label={getCurrentPeriodLabel()}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  )
}

export default PeriodSelector
