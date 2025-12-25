import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  Divider,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatPrice } from '../../utils/formatters';

export default function ClinicOfferCard({ offer, onAccept, onCallback }) {
  const [expanded, setExpanded] = useState(false);
  const { clinic } = offer;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* Clinic Header */}
        <Box display="flex" gap={2} mb={2}>
          <Avatar
            src={clinic.logo}
            alt={clinic.name}
            sx={{ width: 60, height: 60 }}
          />
          <Box flex={1}>
            <Typography variant="h6">{clinic.name}</Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <Rating value={clinic.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary">
                {clinic.rating} ({clinic.reviewCount} отзывов)
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {clinic.metro[0]} • {clinic.districts[0]}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Price Summary */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            p: 2, 
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {formatPrice(offer.discountedPrice)}
          </Typography>
          {offer.totalPrice !== offer.discountedPrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', opacity: 0.8 }}>
              {formatPrice(offer.totalPrice)}
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 1 }}>
            Скидка {((offer.totalPrice - offer.discountedPrice) / offer.totalPrice * 100).toFixed(0)}%
          </Typography>
        </Box>

        {/* Features */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {clinic.features.freeConsultation && (
            <Chip 
              icon={<CheckCircleIcon />} 
              label="Бесплатная консультация" 
              size="small" 
              color="success"
              variant="outlined"
            />
          )}
          {clinic.features.installment && (
            <Chip 
              label={`Рассрочка ${clinic.features.installmentMonths} мес`} 
              size="small"
              variant="outlined"
            />
          )}
          {clinic.features.warrantyYears && (
            <Chip 
              label={`Гарантия ${clinic.features.warrantyYears} года`} 
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {/* Message */}
        {offer.message && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
            💬 {offer.message}
          </Typography>
        )}

        {/* Expandable Details */}
        <Box>
          <Button
            onClick={() => setExpanded(!expanded)}
            endIcon={
              <ExpandMoreIcon 
                sx={{ 
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s',
                }}
              />
            }
            size="small"
          >
            {expanded ? 'Скрыть детали' : 'Показать детали'}
          </Button>

          <Collapse in={expanded}>
            <Box mt={2}>
              {Object.entries(offer.pricing).map(([specType, data]) => (
                <Box key={specType} mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    {specType === 'therapy' && 'Лечение зубов'}
                    {specType === 'orthopedics' && 'Протезирование'}
                    {specType === 'surgery' && 'Хирургия'}
                    {specType === 'hygiene' && 'Гигиена'}
                    {specType === 'periodontics' && 'Пародонтология'}
                  </Typography>
                  {data.breakdown.map((item, idx) => (
                    <Box 
                      key={idx} 
                      display="flex" 
                      justifyContent="space-between"
                      sx={{ pl: 2, py: 0.5 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {item.procedure}
                      </Typography>
                      <Typography variant="body2">
                        {formatPrice(item.price)}
                      </Typography>
                    </Box>
                  ))}
                  <Box 
                    display="flex" 
                    justifyContent="space-between"
                    sx={{ pl: 2, pt: 1, fontWeight: 'bold' }}
                  >
                    <Typography variant="body2">Итого:</Typography>
                    <Typography variant="body2">{formatPrice(data.total)}</Typography>
                  </Box>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}

              {/* Estimated Duration */}
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Ориентировочные сроки:
                </Typography>
                {Object.entries(offer.estimatedDuration).map(([specType, duration]) => (
                  <Typography key={specType} variant="body2" color="text.secondary" sx={{ pl: 2 }}>
                    • {duration}
                  </Typography>
                ))}
              </Box>

              {/* Doctor Info */}
              {clinic.doctors && clinic.doctors.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Врачи клиники:
                  </Typography>
                  {clinic.doctors.slice(0, 2).map((doctor) => (
                    <Box key={doctor.id} display="flex" gap={1} sx={{ pl: 2, mb: 1 }}>
                      <Avatar src={doctor.photo} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography variant="body2">{doctor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Стаж {doctor.experience} лет • ⭐ {doctor.rating}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Actions */}
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<PhoneIcon />}
            onClick={() => onCallback(offer)}
          >
            Заказать звонок
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onAccept(offer)}
          >
            Записаться
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
