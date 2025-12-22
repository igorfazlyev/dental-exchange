import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  Avatar,
} from '@mui/material'
import {
  LocalHospital,
  FilterList,
  LocationOn,
  Star,
  Discount,
  CreditCard,
  CalendarMonth,
  Person,
  MedicalServices,
} from '@mui/icons-material'
import { clinicOffers } from '../../data/mockData'

const PatientOffers = () => {
  const [offers] = useState(clinicOffers)
  const [filters, setFilters] = useState({
    area: 'all',
    priceRange: 'all',
    sortBy: 'price',
  })

  // Booking dialog state
  const [openBooking, setOpenBooking] = useState(false)
  const [selectedClinic, setSelectedClinic] = useState(null)
  const [bookingData, setBookingData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
  })

  // Mock available slots data
  const availableDates = [
    { date: '2025-12-23', slots: ['09:00', '11:00', '14:00', '16:00'] },
    { date: '2025-12-24', slots: ['10:00', '13:00', '15:00'] },
    { date: '2025-12-26', slots: ['09:00', '11:30', '14:30', '16:30'] },
    { date: '2025-12-27', slots: ['10:00', '12:00', '15:00'] },
  ]

  const doctorsBySpecialty = {
    therapy: [
      { id: 1, name: 'Иванова Марина Сергеевна', experience: '15 лет', rating: 4.9 },
      { id: 2, name: 'Петрова Анна Викторовна', experience: '12 лет', rating: 4.8 },
    ],
    orthopedics: [
      { id: 3, name: 'Смирнов Алексей Иванович', experience: '20 лет', rating: 4.9 },
      { id: 4, name: 'Козлов Дмитрий Петрович', experience: '18 лет', rating: 4.7 },
    ],
    surgery: [
      { id: 5, name: 'Сидорова Елена Николаевна', experience: '22 года', rating: 5.0 },
      { id: 6, name: 'Морозов Владимир Александрович', experience: '16 лет', rating: 4.8 },
    ],
  }

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleOpenBooking = (clinic) => {
    setSelectedClinic(clinic)
    setBookingData({ specialty: '', doctor: '', date: '', time: '' })
    setOpenBooking(true)
  }

  const handleCloseBooking = () => {
    setOpenBooking(false)
    setSelectedClinic(null)
    setBookingData({ specialty: '', doctor: '', date: '', time: '' })
  }

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
    if (field === 'specialty') {
      setBookingData((prev) => ({ ...prev, doctor: '', date: '', time: '' }))
    } else if (field === 'date') {
      setBookingData((prev) => ({ ...prev, time: '' }))
    }
  }

  const handleConfirmBooking = () => {
    alert(
      `Консультация забронирована!\n\nКлиника: ${selectedClinic.clinicName}\nСпециализация: ${specialtyNames[bookingData.specialty]}\nВрач: ${doctorsBySpecialty[bookingData.specialty].find((d) => d.id === bookingData.doctor)?.name}\nДата: ${new Date(bookingData.date).toLocaleDateString('ru-RU')}\nВремя: ${bookingData.time}`
    )
    handleCloseBooking()
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

  const getAvailableTimeSlots = () => {
    if (!bookingData.date) return []
    const dateSlot = availableDates.find((d) => d.date === bookingData.date)
    return dateSlot?.slots || []
  }

  const isBookingComplete =
    bookingData.specialty &&
    bookingData.doctor &&
    bookingData.date &&
    bookingData.time

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
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
      <Card sx={{ mb: 3, width: '100%' }} elevation={2}>
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
                  onChange={(e) =>
                    handleFilterChange('priceRange', e.target.value)
                  }
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

      {/* Clinic Offers - Use Box with display:flex instead of Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
        }}
      >
        {offers.map((offer) => (
          <Card
            key={offer.id}
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: '100%',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h5" gutterBottom>
                    {offer.clinicName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {offer.city}, {offer.area}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {offer.distance} км
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Rating value={offer.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {offer.rating}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {offer.specialties.map((spec) => (
                      <Chip
                        key={spec}
                        label={specialtyNames[spec]}
                        size="small"
                        color={specialtyColors[spec]}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography variant="h4" color="primary.main" gutterBottom>
                    {formatCost(offer.totalPrice.min)} -{' '}
                    {formatCost(offer.totalPrice.max)}
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
                {Object.entries(offer.priceBySpecialty).map(
                  ([specialty, price]) => (
                    <Grid item xs={12} md={4} key={specialty}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
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
                  )
                )}
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

              <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <Button
                  variant="contained"
                  sx={{ flex: 1 }}
                  onClick={() => handleOpenBooking(offer)}
                >
                  Записаться на консультацию
                </Button>
                <Button variant="outlined" sx={{ flex: 1 }}>
                  Подробнее о клинике
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Alert severity="info" sx={{ mt: 3, width: '100%' }}>
        <Typography variant="body2">
          <strong>Совет:</strong> Рекомендуем посетить консультации в 2-3
          клиниках для сравнения предложений и выбора оптимального варианта.
        </Typography>
      </Alert>

      {/* Booking Dialog */}
      <Dialog
        open={openBooking}
        onClose={handleCloseBooking}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonth color="primary" />
            <Box>
              <Typography variant="h6">Запись на консультацию</Typography>
              {selectedClinic && (
                <Typography variant="body2" color="text.secondary">
                  {selectedClinic.clinicName}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Step 1: Choose Specialty */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MedicalServices color="primary" />
                <Typography variant="h6">1. Выберите специализацию</Typography>
              </Box>
              <FormControl fullWidth>
                <RadioGroup
                  value={bookingData.specialty}
                  onChange={(e) =>
                    handleBookingChange('specialty', e.target.value)
                  }
                >
                  {selectedClinic?.specialties.map((spec) => (
                    <FormControlLabel
                      key={spec}
                      value={spec}
                      control={<Radio />}
                      label={
                        <Chip
                          label={specialtyNames[spec]}
                          color={specialtyColors[spec]}
                          size="small"
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Step 2: Choose Doctor */}
            {bookingData.specialty && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Person color="primary" />
                  <Typography variant="h6">2. Выберите врача</Typography>
                </Box>
                <RadioGroup
                  value={bookingData.doctor}
                  onChange={(e) =>
                    handleBookingChange('doctor', Number(e.target.value))
                  }
                >
                  {doctorsBySpecialty[bookingData.specialty]?.map((doctor) => (
                    <FormControlLabel
                      key={doctor.id}
                      value={doctor.id}
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 1,
                          }}
                        >
                          <Avatar>{doctor.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography variant="body1">
                              {doctor.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Стаж: {doctor.experience} • Рейтинг: ★{' '}
                              {doctor.rating}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 3: Choose Date */}
            {bookingData.doctor && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarMonth color="primary" />
                  <Typography variant="h6">3. Выберите дату</Typography>
                </Box>
                <RadioGroup
                  value={bookingData.date}
                  onChange={(e) => handleBookingChange('date', e.target.value)}
                >
                  {availableDates.map((dateObj) => (
                    <FormControlLabel
                      key={dateObj.date}
                      value={dateObj.date}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">
                            {new Date(dateObj.date).toLocaleDateString('ru-RU', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                            })}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Доступно слотов: {dateObj.slots.length}
                          </Typography>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>
            )}

            {/* Step 4: Choose Time */}
            {bookingData.date && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  4. Выберите время
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {getAvailableTimeSlots().map((time) => (
                    <Chip
                      key={time}
                      label={time}
                      clickable
                      color={bookingData.time === time ? 'primary' : 'default'}
                      onClick={() => handleBookingChange('time', time)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseBooking}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handleConfirmBooking}
            disabled={!isBookingComplete}
          >
            Подтвердить запись
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientOffers
