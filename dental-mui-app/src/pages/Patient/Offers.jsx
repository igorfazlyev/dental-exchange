import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useScan } from '../../contexts/ScanContext'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
} from '@mui/material'
import {
  LocalHospital,
  LocationOn,
  Star,
  AttachMoney,
  Schedule,
  CheckCircle,
  Close,
  CalendarToday,
  AccessTime,
  Person,
} from '@mui/icons-material'
import { clinicOffers, patientScans, treatmentPlans } from '../../data/mockData'

const PatientOffers = () => {
  const { scanId } = useParams()
  const navigate = useNavigate()
  const { activeScanId, setActiveScanId } = useScan()
  
  const [selectedScanId, setSelectedScanId] = useState(
    scanId || activeScanId || patientScans[0]?.id
  )
  const [selectedScan, setSelectedScan] = useState(null)
  const [plan, setPlan] = useState(null)
  const [offers, setOffers] = useState([])
  
  // Booking modal state
  const [openBookingModal, setOpenBookingModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [bookingData, setBookingData] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
  })

  // Mock data for doctors and time slots
  const doctorsBySpecialty = {
    therapy: [
      { id: 1, name: 'Иванова Марина Сергеевна', experience: '15 лет' },
      { id: 2, name: 'Петров Алексей Викторович', experience: '10 лет' },
      { id: 3, name: 'Сидорова Ольга Дмитриевна', experience: '8 лет' },
    ],
    orthopedics: [
      { id: 4, name: 'Смирнов Алексей Иванович', experience: '20 лет' },
      { id: 5, name: 'Козлова Анна Петровна', experience: '12 лет' },
      { id: 6, name: 'Морозов Игорь Владимирович', experience: '18 лет' },
    ],
    surgery: [
      { id: 7, name: 'Волков Сергей Михайлович', experience: '25 лет' },
      { id: 8, name: 'Новикова Елена Андреевна', experience: '14 лет' },
    ],
  }

  const availableTimes = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ]

  // Generate available dates (next 14 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    let daysAdded = 0
    let currentDate = new Date(today)

    while (daysAdded < 14) {
      currentDate.setDate(today.getDate() + daysAdded)
      // Skip Sundays (0)
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate))
      }
      daysAdded++
    }
    return dates
  }

  const availableDates = getAvailableDates()

  useEffect(() => {
    if (selectedScanId) {
      setActiveScanId(selectedScanId)
      
      // Find the scan
      const scan = patientScans.find((s) => s.id === selectedScanId)
      setSelectedScan(scan)

      // Find the treatment plan for this scan
      if (scan?.treatmentPlanId) {
        const treatmentPlan = treatmentPlans[scan.treatmentPlanId]
        setPlan(treatmentPlan)

        // Filter offers for this scan
        const scanOffers = clinicOffers.filter(
          (offer) => offer.scanId === selectedScanId
        )
        setOffers(scanOffers)
      } else {
        setPlan(null)
        setOffers([])
      }
    }
  }, [selectedScanId, setActiveScanId])

  const handleScanChange = (event) => {
    const newScanId = event.target.value
    setSelectedScanId(newScanId)
    navigate(`/patient/offers/${newScanId}`)
  }

  const handleOpenBookingModal = (offer) => {
    setSelectedOffer(offer)
    setBookingData({
      specialty: offer.specialties[0] || '', // Pre-select first specialty
      doctor: '',
      date: '',
      time: '',
    })
    setOpenBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setOpenBookingModal(false)
    setSelectedOffer(null)
    setBookingData({
      specialty: '',
      doctor: '',
      date: '',
      time: '',
    })
  }

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
      // Reset doctor when specialty changes
      ...(field === 'specialty' && { doctor: '' }),
    }))
  }

  const handleConfirmBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
      clinic: selectedOffer.clinicName,
      scanId: selectedScanId,
      ...bookingData,
    })
    
    // Show success message and navigate
    alert(`Консультация успешно забронирована!\n\nКлиника: ${selectedOffer.clinicName}\nСпециальность: ${specialtyNames[bookingData.specialty]}\nДата: ${new Date(bookingData.date).toLocaleDateString('ru-RU')}\nВремя: ${bookingData.time}`)
    
    handleCloseBookingModal()
    // Optionally navigate to consultations page
    // navigate('/patient/consultations')
  }

  const formatCost = (cost) => {
    return cost?.toLocaleString('ru-RU') + ' ₽'
  }

  const specialtyNames = {
    therapy: 'Терапия',
    orthopedics: 'Ортопедия',
    surgery: 'Хирургия',
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    })
  }

  const isBookingValid = () => {
    return (
      bookingData.specialty &&
      bookingData.doctor &&
      bookingData.date &&
      bookingData.time
    )
  }

  if (!selectedScan) {
    return (
      <Box>
        <Alert severity="warning">
          <Typography variant="body2">
            Не найдено ни одного снимка. Пожалуйста, загрузите снимок для получения
            предложений от клиник.
          </Typography>
        </Alert>
      </Box>
    )
  }

  if (!plan) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
          Предложения от клиник
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          На основе вашего плана лечения
        </Typography>

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
                  {scan.id} - {scan.type} (
                  {new Date(scan.date).toLocaleDateString('ru-RU')})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Alert severity="info">
          <Typography variant="body2">
            План лечения для снимка {selectedScanId} находится в процессе
            формирования. Предложения от клиник появятся после готовности плана.
          </Typography>
        </Alert>
      </Box>
    )
  }

  if (offers.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
          Предложения от клиник
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          На основе вашего плана лечения
        </Typography>

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
                    {scan.id} - {scan.type} (
                    {new Date(scan.date).toLocaleDateString('ru-RU')})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Предложения от клиник для снимка {selectedScanId} пока не получены.
            Обычно это занимает 1-2 дня.
          </Typography>
        </Alert>

        <Button
          variant="outlined"
          onClick={() => navigate(`/patient/plan/${selectedScanId}`)}
        >
          Вернуться к плану лечения
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Предложения от клиник
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Получено {offers.length}{' '}
            {offers.length === 1 ? 'предложение' : 'предложений'} для снимка{' '}
            {selectedScanId}
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
                  {scan.id} - {scan.type} (
                  {new Date(scan.date).toLocaleDateString('ru-RU')})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Совет:</strong> Сравните предложения по цене, расположению и рейтингу
          клиник. Вы можете записаться на консультацию в несколько клиник для выбора
          наилучшего варианта.
        </Typography>
      </Alert>

      {/* Offers List - Full Width */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {offers.map((offer) => (
          <Card
            key={offer.id}
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
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1, minWidth: '300px' }}>
                  <Typography variant="h5" gutterBottom>
                    {offer.clinicName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<LocationOn />}
                      label={`${offer.area} • ${offer.distance} км`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip icon={<Star />} label={offer.rating} size="small" color="warning" />
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {formatCost(offer.totalPrice.min)} -{' '}
                    {formatCost(offer.totalPrice.max)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ориентировочная стоимость
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Price breakdown by specialty */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Стоимость по специальностям:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                  }}
                >
                  {Object.entries(offer.priceBySpecialty).map(([specialty, price]) => (
                    <Box
                      key={specialty}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 0.5,
                        px: 2,
                        bgcolor: 'background.default',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2">{specialtyNames[specialty]}:</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {formatCost(price.min)} - {formatCost(price.max)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Benefits */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                  Преимущества:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {offer.discount && (
                    <Chip
                      icon={<AttachMoney />}
                      label={offer.discount}
                      color="success"
                      size="small"
                    />
                  )}
                  {offer.installment && (
                    <Chip
                      icon={<Schedule />}
                      label={offer.installment}
                      color="info"
                      size="small"
                    />
                  )}
                  {offer.promoComment && (
                    <Chip
                      icon={<CheckCircle />}
                      label={offer.promoComment}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<LocalHospital />}
                onClick={() => handleOpenBookingModal(offer)}
              >
                Записаться на консультацию в {offer.clinicName}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/patient/plan/${selectedScanId}`)}
        >
          Вернуться к плану лечения
        </Button>
      </Box>

      {/* Booking Modal */}
      <Dialog
        open={openBookingModal}
        onClose={handleCloseBookingModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h6">Запись на консультацию</Typography>
              {selectedOffer && (
                <Typography variant="body2" color="text.secondary">
                  {selectedOffer.clinicName}
                </Typography>
              )}
            </Box>
            <IconButton onClick={handleCloseBookingModal}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            {/* Specialty Selection */}
            <FormControl fullWidth>
              <InputLabel>Специальность</InputLabel>
              <Select
                value={bookingData.specialty}
                label="Специальность"
                onChange={(e) => handleBookingChange('specialty', e.target.value)}
                startAdornment={<Person sx={{ mr: 1, color: 'action.active' }} />}
              >
                {selectedOffer?.specialties.map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    {specialtyNames[specialty]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Doctor Selection */}
            <FormControl fullWidth disabled={!bookingData.specialty}>
              <InputLabel>Врач</InputLabel>
              <Select
                value={bookingData.doctor}
                label="Врач"
                onChange={(e) => handleBookingChange('doctor', e.target.value)}
              >
                {bookingData.specialty &&
                  doctorsBySpecialty[bookingData.specialty]?.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      <Box>
                        <Typography variant="body2">{doctor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Стаж: {doctor.experience}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Date Selection */}
            <FormControl fullWidth disabled={!bookingData.doctor}>
              <InputLabel>Дата консультации</InputLabel>
              <Select
                value={bookingData.date}
                label="Дата консультации"
                onChange={(e) => handleBookingChange('date', e.target.value)}
                startAdornment={<CalendarToday sx={{ mr: 1, color: 'action.active' }} />}
              >
                {availableDates.map((date, index) => (
                  <MenuItem key={index} value={date.toISOString()}>
                    {formatDate(date)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Time Selection */}
            <FormControl fullWidth disabled={!bookingData.date}>
              <InputLabel>Время</InputLabel>
              <Select
                value={bookingData.time}
                label="Время"
                onChange={(e) => handleBookingChange('time', e.target.value)}
                startAdornment={<AccessTime sx={{ mr: 1, color: 'action.active' }} />}
              >
                {availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Summary */}
            {isBookingValid() && (
              <Alert severity="info">
                <Typography variant="body2" gutterBottom>
                  <strong>Ваша запись:</strong>
                </Typography>
                <Typography variant="body2">
                  Специальность: {specialtyNames[bookingData.specialty]}
                  <br />
                  Дата: {new Date(bookingData.date).toLocaleDateString('ru-RU')}
                  <br />
                  Время: {bookingData.time}
                </Typography>
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCloseBookingModal} variant="outlined">
            Отмена
          </Button>
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            disabled={!isBookingValid()}
            startIcon={<CheckCircle />}
          >
            Подтвердить запись
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PatientOffers
