import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material'
import {
  PieChart,
  TrendingUp,
  LocalHospital,
  Warning,
} from '@mui/icons-material'
import {
  regionalStats,
  districtAnalytics,
  qualityIndicators,
} from '../../data/mockData'

const GovernmentDashboard = () => {
  const formatNumber = (n) => n.toLocaleString('ru-RU')

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <PieChart sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">
          Сводка региона: {regionalStats.region}
        </Typography>
      </Box>

      {/* KPI cards – full width responsive grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Население
            </Typography>
            <Typography variant="h4">
              {formatNumber(regionalStats.totalPopulation)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Клиники
            </Typography>
            <Typography variant="h4">
              {regionalStats.activeClinics}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              активных из {regionalStats.registeredClinics}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Врачи
            </Typography>
            <Typography variant="h4">
              {formatNumber(regionalStats.totalDoctors)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Пациенты (месяц)
            </Typography>
            <Typography variant="h4">
              {formatNumber(regionalStats.totalPatients)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quality + Districts – two-column full width grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Quality indicators */}
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Показатели качества
            </Typography>
            {qualityIndicators.map((item, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2">{item.indicator}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2">{item.compliance}%</Typography>
                    {item.status === 'warning' && (
                      <Warning fontSize="small" color="warning" />
                    )}
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.compliance}
                  color={item.status === 'good' ? 'success' : 'warning'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* District stats */}
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Статистика по районам
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {districtAnalytics.map((d, idx) => (
                <Box key={idx}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {d.district}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`${d.clinicsCount} клиник`} size="small" />
                      <Chip
                        label={`★ ${d.avgRating}`}
                        size="small"
                        color={d.avgRating >= 4.5 ? 'success' : 'default'}
                      />
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {formatNumber(d.patientsCount)} пациентов • {d.doctorsCount}{' '}
                    врачей • {d.complaintsCount} жалоб
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom three cards – full width grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocalHospital color="primary" />
              <Typography variant="h6">Среднее время ожидания</Typography>
            </Box>
            <Typography variant="h4">
              {regionalStats.avgWaitTime} дней
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUp color="success" />
              <Typography variant="h6">Удовлетворенность</Typography>
            </Box>
            <Typography variant="h4">
              {regionalStats.patientSatisfaction} / 5
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Warning color="error" />
              <Typography variant="h6">Приостановлено лицензий</Typography>
            </Box>
            <Typography variant="h4">
              {regionalStats.suspendedClinics}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default GovernmentDashboard
