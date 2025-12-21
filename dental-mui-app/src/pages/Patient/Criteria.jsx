import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Alert,
} from '@mui/material'
import {
  Tune,
  Save,
} from '@mui/icons-material'

const PatientCriteria = () => {
  const [criteria, setCriteria] = useState({
    city: 'moscow',
    area: '',
    maxDistance: 10,
    priceRange: [50000, 150000],
    specialties: ['therapy', 'orthopedics', 'surgery'],
    urgentAppointment: false,
    installment: false,
    insurance: false,
    discount: false,
  })

  const handleChange = (field, value) => {
    setCriteria(prev => ({ ...prev, [field]: value }))
  }

  const handleSpecialtyToggle = (specialty) => {
    setCriteria(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleSave = () => {
    // Save criteria
    alert('Критерии поиска сохранены!')
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Tune sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Критерии поиска клиник</Typography>
          <Typography variant="body2" color="text.secondary">
            Настройте параметры для поиска подходящей клиники
          </Typography>
        </Box>
      </Box>

      <Card elevation={2}>
        <CardContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            Эти критерии будут использованы при подборе клиник для вашего плана лечения
          </Alert>

          {/* Location */}
          <Typography variant="h6" gutterBottom>
            Расположение
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Город</InputLabel>
            <Select
              value={criteria.city}
              label="Город"
              onChange={(e) => handleChange('city', e.target.value)}
            >
              <MenuItem value="moscow">Москва</MenuItem>
              <MenuItem value="spb">Санкт-Петербург</MenuItem>
              <MenuItem value="kazan">Казань</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Район</InputLabel>
            <Select
              value={criteria.area}
              label="Район"
              onChange={(e) => handleChange('area', e.target.value)}
            >
              <MenuItem value="">Любой</MenuItem>
              <MenuItem value="central">Центральный</MenuItem>
              <MenuItem value="north">Северный</MenuItem>
              <MenuItem value="south">Южный</MenuItem>
            </Select>
          </FormControl>

          <Typography gutterBottom>
            Максимальное расстояние: {criteria.maxDistance} км
          </Typography>
          <Slider
            value={criteria.maxDistance}
            onChange={(e, v) => handleChange('maxDistance', v)}
            min={1}
            max={50}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Price Range */}
          <Typography variant="h6" gutterBottom>
            Ценовой диапазон
          </Typography>
          <Typography gutterBottom>
            {criteria.priceRange[0].toLocaleString()} - {criteria.priceRange[1].toLocaleString()} ₽
          </Typography>
          <Slider
            value={criteria.priceRange}
            onChange={(e, v) => handleChange('priceRange', v)}
            min={0}
            max={300000}
            step={10000}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => v.toLocaleString() + ' ₽'}
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Specialties */}
          <Typography variant="h6" gutterBottom>
            Специализации
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.specialties.includes('therapy')}
                  onChange={() => handleSpecialtyToggle('therapy')}
                />
              }
              label="Терапия"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.specialties.includes('orthopedics')}
                  onChange={() => handleSpecialtyToggle('orthopedics')}
                />
              }
              label="Ортопедия"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.specialties.includes('surgery')}
                  onChange={() => handleSpecialtyToggle('surgery')}
                />
              }
              label="Хирургия"
            />
          </FormGroup>

          <Divider sx={{ my: 3 }} />

          {/* Additional Criteria */}
          <Typography variant="h6" gutterBottom>
            Дополнительные условия
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.urgentAppointment}
                  onChange={(e) => handleChange('urgentAppointment', e.target.checked)}
                />
              }
              label="Срочная запись (в течение 3 дней)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.installment}
                  onChange={(e) => handleChange('installment', e.target.checked)}
                />
              }
              label="Наличие рассрочки / кредита"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.insurance}
                  onChange={(e) => handleChange('insurance', e.target.checked)}
                />
              }
              label="Работа со страховыми"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={criteria.discount}
                  onChange={(e) => handleChange('discount', e.target.checked)}
                />
              }
              label="Наличие скидок / акций"
            />
          </FormGroup>

          <Box sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Сохранить критерии
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PatientCriteria