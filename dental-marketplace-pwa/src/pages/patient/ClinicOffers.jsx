import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  LocalOffer,
  Payment,
  CalendarMonth,
  Verified,
  AccountBalance,
  CompareArrows,
  Star,
} from '@mui/icons-material';
import { mockData, specializationNames } from '../../services/mockData';

export default function ClinicOffers() {
  const { clinicOffers, costBreakdown } = mockData;
  const [sortBy, setSortBy] = useState('price');
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [compareMode, setCompareMode] = useState(false);

  const handleOpenBooking = (clinic) => {
    setSelectedClinic(clinic);
    setBookingDialog(true);
  };

  const sortedOffers = [...clinicOffers].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.totalCost - b.totalCost;
      case 'distance':
        return a.distanceKm - b.distanceKm;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Предложения от клиник
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Найдено {clinicOffers.length} клиник, соответствующих вашему плану лечения
        </Typography>
      </Box>

      {/* Filters and Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Сортировать по</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Сортировать по">
                  <MenuItem value="price">Цене (по возрастанию)</MenuItem>
                  <MenuItem value="distance">Расстоянию</MenuItem>
                  <MenuItem value="rating">Рейтингу</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Способ оплаты</InputLabel>
                <Select defaultValue="all" label="Способ оплаты">
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="cash">Наличные</MenuItem>
                  <MenuItem value="card">Карта</MenuItem>
                  <MenuItem value="installment">Рассрочка</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Специализация</InputLabel>
                <Select defaultValue="all" label="Специализация">
                  <MenuItem value="all">Все услуги</MenuItem>
                  <MenuItem value="therapy">Терапия</MenuItem>
                  <MenuItem value="orthopedics">Ортопедия</MenuItem>
                  <MenuItem value="surgery">Хирургия</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant={compareMode ? 'contained' : 'outlined'}
                startIcon={<CompareArrows />}
                fullWidth
                onClick={() => setCompareMode(!compareMode)}
              >
                {compareMode ? 'Скрыть сравнение' : 'Режим сравнения'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Offers List */}
        <Grid item xs={12} lg={compareMode ? 12 : 8}>
          {compareMode ? (
            /* Comparison Table View */
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Сравнение клиник
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.50' }}>
                        <TableCell sx={{ width: 180 }}><strong>Параметр</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            <Box>
                              <Typography variant="subtitle2" fontWeight={700}>
                                {offer.clinicName}
                              </Typography>
                              <Rating value={offer.rating} readOnly size="small" precision={0.1} />
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Общая стоимость</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            <Typography variant="h6" color="primary">
                              {offer.totalCost.toLocaleString()} ₽
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Расстояние</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.distanceKm} км
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Терапия</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.selectedServices.therapy
                              ? `${offer.selectedServices.therapy.finalCost.toLocaleString()} ₽`
                              : '—'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Ортопедия</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.selectedServices.orthopedics
                              ? `${offer.selectedServices.orthopedics.finalCost.toLocaleString()} ₽`
                              : '—'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Хирургия</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.selectedServices.surgery
                              ? `${offer.selectedServices.surgery.finalCost.toLocaleString()} ₽`
                              : '—'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Кэшбэк</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.cashbackPercent}%
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Рассрочка</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            {offer.paymentOptions.includes('installment_12m') ? '✓' : '—'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Действия</strong></TableCell>
                        {sortedOffers.map((offer) => (
                          <TableCell key={offer.clinicId} align="center">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleOpenBooking(offer)}
                            >
                              Выбрать
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            /* Card List View */
            <Stack spacing={3}>
              {sortedOffers.map((offer) => (
                <Card key={offer.clinicId}>
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* Clinic Info */}
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              bgcolor: 'primary.main',
                              mr: 2,
                              fontSize: 24,
                              fontWeight: 700,
                            }}
                          >
                            {offer.clinicName.charAt(0)}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Typography variant="h6">{offer.clinicName}</Typography>
                              <Verified sx={{ color: 'primary.main', fontSize: 20 }} />
                              {offer.cashbackPercent > 0 && (
                                <Chip label={`Кэшбэк ${offer.cashbackPercent}%`} size="small" color="success" />
                              )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating value={offer.rating} precision={0.1} readOnly size="small" />
                                <Typography variant="body2" sx={{ ml: 0.5 }}>
                                  {offer.rating}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary">
                                <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle' }} /> {offer.location}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {offer.distanceKm} км
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Основана: {offer.foundedYear} • Лицензия: {offer.license}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Promotion */}
                        {offer.promotion && (
                          <Paper sx={{ p: 1.5, mb: 2, bgcolor: 'warning.50', border: 1, borderColor: 'warning.main' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocalOffer sx={{ color: 'warning.dark', mr: 1, fontSize: 20 }} />
                              <Typography variant="body2" fontWeight={600}>
                                {offer.promotion}
                              </Typography>
                            </Box>
                          </Paper>
                        )}

                        {/* Services Breakdown */}
                        <Grid container spacing={1.5}>
                          {Object.entries(offer.selectedServices).map(([spec, details]) => (
                            <Grid item xs={12} sm={4} key={spec}>
                              <Paper sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  {specializationNames[spec]}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                  <Box>
                                    {details.discount > 0 && (
                                      <Typography
                                        variant="caption"
                                        sx={{ textDecoration: 'line-through', color: 'text.secondary', display: 'block' }}
                                      >
                                        {details.cost.toLocaleString()} ₽
                                      </Typography>
                                    )}
                                    <Typography variant="h6" fontWeight={700}>
                                      {details.finalCost.toLocaleString()} ₽
                                    </Typography>
                                  </Box>
                                  {details.discount > 0 && (
                                    <Chip label={`-${details.discount}%`} size="small" color="error" />
                                  )}
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>

                        {/* Payment Options */}
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            <Payment sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                            Способы оплаты:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {offer.paymentOptions.includes('cash') && <Chip label="Наличные" size="small" variant="outlined" />}
                            {offer.paymentOptions.includes('card') && <Chip label="Карта" size="small" variant="outlined" />}
                            {offer.paymentOptions.includes('installment_6m') && (
                              <Chip label="Рассрочка 6 мес" size="small" color="primary" />
                            )}
                            {offer.paymentOptions.includes('installment_12m') && (
                              <Chip label="Рассрочка 12 мес" size="small" color="primary" />
                            )}
                            {offer.paymentOptions.includes('installment_24m') && (
                              <Chip label="Рассрочка 24 мес" size="small" color="primary" />
                            )}
                          </Box>
                        </Box>
                      </Grid>

                      {/* Price and Actions */}
                      <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, bgcolor: 'primary.50', height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Итоговая стоимость
                          </Typography>
                          <Typography variant="h3" color="primary" fontWeight={700} sx={{ mb: 2 }}>
                            {offer.totalCost.toLocaleString()} ₽
                          </Typography>

                          {offer.cashbackPercent > 0 && (
                            <Typography variant="body2" color="success.main" gutterBottom>
                              Вернется {Math.round(offer.totalCost * offer.cashbackPercent / 100).toLocaleString()} ₽ кэшбэком
                            </Typography>
                          )}

                          <Box sx={{ mt: 'auto' }}>
                            <Button
                              variant="contained"
                              size="large"
                              fullWidth
                              startIcon={<CalendarMonth />}
                              onClick={() => handleOpenBooking(offer)}
                              sx={{ mb: 1 }}
                            >
                              Записаться
                            </Button>
                            <Button variant="outlined" size="large" fullWidth>
                              Подробнее о клинике
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Sidebar - Cost Overview */}
        {!compareMode && (
          <Grid item xs={12} lg={4}>
            <Card sx={{ position: 'sticky', top: 80 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Обзор стоимости
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Ваш план лечения включает:
                  </Typography>
                  {Object.entries(costBreakdown).map(([key, value]) => {
                    if (key === 'total') return null;
                    return (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2">{specializationNames[key]}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.items} {value.items === 1 ? 'процедура' : 'процедуры'} •{' '}
                          {value.minCost.toLocaleString()} - {value.maxCost.toLocaleString()} ₽
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Диапазон цен в предложениях
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={700}>
                    {Math.min(...sortedOffers.map(o => o.totalCost)).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    до {Math.max(...sortedOffers.map(o => o.totalCost)).toLocaleString()} ₽
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Доступные слоты для записи
          <Typography variant="body2" color="text.secondary">
            {selectedClinic?.clinicName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedClinic?.availableSlots.map((slot, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    border: 2,
                    borderColor: 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
                  }}
                  onClick={() => {
                    alert(`Записано на ${slot.date} в ${slot.time}`);
                    setBookingDialog(false);
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">{slot.date}</Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {slot.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Врач: {slot.doctor}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialog(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
