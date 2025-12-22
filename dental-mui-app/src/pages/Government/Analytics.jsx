import { useState } from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material'
import { Analytics as AnalyticsIcon, TrendingUp } from '@mui/icons-material'
import { 
  monthlyTreatmentStats, 
  specialtyDistribution, 
  districtAnalytics,
  filterDataByDateRange,
} from '../../data/mockData'
import PeriodSelector from '../../components/PeriodSelector'

const GovernmentAnalytics = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })
  
  const formatNumber = (n) => n.toLocaleString('ru-RU')
  const formatCurrency = (n) => n.toLocaleString('ru-RU') + ' ₽'

  // Filter data based on selected period
  const filteredMonthlyStats = dateRange.startDate
    ? filterDataByDateRange(monthlyTreatmentStats, dateRange.startDate, dateRange.endDate, 'date')
    : monthlyTreatmentStats

  const filteredSpecialtyDistribution = dateRange.startDate
    ? filterDataByDateRange(specialtyDistribution, dateRange.startDate, dateRange.endDate, 'date')
    : specialtyDistribution

  const filteredDistrictAnalytics = dateRange.startDate
    ? filterDataByDateRange(districtAnalytics, dateRange.startDate, dateRange.endDate, 'date')
    : districtAnalytics

  // Calculate totals from filtered data
  const totalPatients = filteredMonthlyStats.reduce((sum, m) => sum + m.patients, 0)
  const totalProcedures = filteredMonthlyStats.reduce((sum, m) => sum + m.procedures, 0)
  const totalRevenue = filteredMonthlyStats.reduce((sum, m) => sum + m.revenue, 0)

  // Calculate growth
  const lastMonth = filteredMonthlyStats[filteredMonthlyStats.length - 1]
  const prevMonth = filteredMonthlyStats[filteredMonthlyStats.length - 2]
  const growthRate = lastMonth && prevMonth 
    ? ((lastMonth.patients - prevMonth.patients) / prevMonth.patients * 100).toFixed(1)
    : 0

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">Аналитика региона</Typography>
      </Box>

      {/* Period Selector */}
      <PeriodSelector onPeriodChange={setDateRange} defaultPeriod="last6months" />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Всего пациентов
              </Typography>
              <Typography variant="h4">{formatNumber(totalPatients)}</Typography>
              {growthRate !== 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                  <TrendingUp color="success" fontSize="small" />
                  <Typography variant="body2" color="success.main">
                    +{growthRate}% за месяц
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Всего процедур
              </Typography>
              <Typography variant="h4">{formatNumber(totalProcedures)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Общая выручка
              </Typography>
              <Typography variant="h4">{formatCurrency(totalRevenue)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Monthly Stats Table */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Помесячная статистика
              </Typography>
              {filteredMonthlyStats.length > 0 ? (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Месяц</TableCell>
                        <TableCell align="right">Пациенты</TableCell>
                        <TableCell align="right">Процедуры</TableCell>
                        <TableCell align="right">Выручка</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredMonthlyStats.map((stat, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{stat.month}</TableCell>
                          <TableCell align="right">{formatNumber(stat.patients)}</TableCell>
                          <TableCell align="right">{formatNumber(stat.procedures)}</TableCell>
                          <TableCell align="right">{formatCurrency(stat.revenue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Нет данных за выбранный период
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Specialty Distribution */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Распределение по специализациям
              </Typography>
              {filteredSpecialtyDistribution.length > 0 ? (
                filteredSpecialtyDistribution.map((spec, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{spec.specialty}</Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="body2">{formatNumber(spec.procedures)}</Typography>
                        <Chip label={`${spec.share}%`} size="small" color="primary" />
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={spec.share}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Нет данных за выбранный период
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* District Analytics Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Аналитика по районам
          </Typography>
          {filteredDistrictAnalytics.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Район</TableCell>
                    <TableCell align="right">Клиники</TableCell>
                    <TableCell align="right">Врачи</TableCell>
                    <TableCell align="right">Пациенты</TableCell>
                    <TableCell align="right">Ср. ожидание</TableCell>
                    <TableCell align="right">Рейтинг</TableCell>
                    <TableCell align="right">Жалобы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDistrictAnalytics.map((district, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {district.district}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{district.clinicsCount}</TableCell>
                      <TableCell align="right">{formatNumber(district.doctorsCount)}</TableCell>
                      <TableCell align="right">{formatNumber(district.patientsCount)}</TableCell>
                      <TableCell align="right">{district.avgWaitTime} дней</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={district.avgRating}
                          size="small"
                          color={district.avgRating >= 4.5 ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={district.complaintsCount}
                          size="small"
                          color={district.complaintsCount > 20 ? 'error' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Нет данных за выбранный период
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default GovernmentAnalytics
