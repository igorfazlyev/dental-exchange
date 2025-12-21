import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Alert,
} from '@mui/material'
import {
  LocalHospital,
  FilterList,
  LocationOn,
  AttachMoney,
  CalendarMonth,
  Star,
  Discount,
  CreditCard,
} from '@mui/icons-material'
import { clinicOffers } from '../../data/mockData'

const PatientOffers = () => {
  const [offers] = useState(clinicOffers)
  const [filters, setFilters] = useState({
    area: 'all',
    priceRange: 'all',
    sortBy: 'price',
  })

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const specialtyColors = {
    therapy: 'info',
    orthopedics: 'primary',
    surgery: 'warning',
  }

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LocalHospital sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Предложения клиник</Typography>
          <Typography variant="body2" color="text.secondary">
            Найдено {offers.length} клиник по вашему плану лечения
          </Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }} elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterList />
            <Typography variant="h6">Фильтры</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Район</InputLabel>
                <Select
                  value={filters.area}
                  label="Район"
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                >
                  <MenuItem value="all">Все районы</MenuItem>
                  <MenuItem value="central">Центральный</MenuItem>
                  <MenuItem value="north">Северный</MenuItem>
                  <MenuItem value="south">Южный</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Ценовой диапазон</InputLabel>
                <Select
                  value={filters.priceRange}
                  label="Ценовой диапазон"
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <MenuItem value="all">Любая цена</MenuItem>
                  <MenuItem value="budget">До 80 000 ₽</MenuItem>
                  <MenuItem value="medium">80 000 - 100 000 ₽</MenuItem>
                  <MenuItem value="premium">Свыше 100 000 ₽</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Сортировка</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Сортировка"
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <MenuItem value="price">По цене</MenuItem>
                  <MenuItem value="distance">По расстоянию</MenuItem>
                  <MenuItem value="rating">По рейтингу</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Clinic Offers */}
      <Grid container spacing={3}>
        {offers.map(offer => (
          <Grid item xs={12} key={offer.id}>
            <Card elevation={3} sx={{ '&:hover': { elevation: 6 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {offer.clinicName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {offer.city}, {offer.area}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {offer.distance} км
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={offer.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {offer.rating}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {offer.specialties.map(spec => (
                        <Chip
                          key={spec}
                          label={specialtyNames[spec]}
                          size="small"
                          color={specialtyColors[spec]}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" color="primary.main" gutterBottom>
                      {formatCost(offer.totalPrice.min)} - {formatCost(offer.totalPrice.max)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      за весь план лечения
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Price by Specialty */}
                <Typography variant="subtitle2" gutterBottom>
                  Стоимость по специализациям:
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {Object.entries(offer.priceBySpecialty).map(([specialty, price]) => (
                    <Grid item xs={12} md={4} key={specialty}>
                      <Card variant="outlined">
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Typography variant="caption" color="text.secondary">
                            {specialtyNames[specialty]}
                          </Typography>
                          <Typography variant="h6">
                            {formatCost(price.min)} - {formatCost(price.max)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Special Offers */}
                {(offer.discount || offer.installment || offer.promoComment) && (
                  <Box sx={{ mb: 2 }}>
                    <List dense>
                      {offer.discount && (
                        <ListItem>
                          <Discount color="success" sx={{ mr: 1 }} />
                          <ListItemText primary={offer.discount} />
                        </ListItem>
                      )}
                      {offer.installment && (
                        <ListItem>
                          <CreditCard color="info" sx={{ mr: 1 }} />
                          <ListItemText primary={offer.installment} />
                        </ListItem>
                      )}
                      {offer.promoComment && (
                        <ListItem>
                          <Star color="warning" sx={{ mr: 1 }} />
                          <ListItemText primary={offer.promoComment} />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" fullWidth>
                    Записаться на консультацию
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Подробнее о клинике
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Совет:</strong> Рекомендуем посетить консультации в 2-3 клиниках для сравнения 
          предложений и выбора оптимального варианта.
        </Typography>
      </Alert>
    </Box>
  )
}

export default PatientOffers