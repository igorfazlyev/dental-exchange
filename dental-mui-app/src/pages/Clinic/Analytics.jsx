import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Insights } from '@mui/icons-material'

const ClinicAnalytics = () => {
  const kpis = {
    monthRevenue: 2_850_000,
    avgCheck: 18_500,
    newPatients: 42,
    conversionRate: 37,
  }

  const funnel = [
    { stage: 'Просмотры профиля', value: 320 },
    { stage: 'Заявки с AI-планом', value: 120 },
    { stage: 'Назначены консультации', value: 65 },
    { stage: 'Начали лечение', value: 45 },
  ]

  const revenueBySpecialty = [
    { specialty: 'Терапия', value: 950_000 },
    { specialty: 'Ортопедия', value: 1_200_000 },
    { specialty: 'Хирургия', value: 700_000 },
  ]

  const sources = [
    { source: 'Маркетплейс AI', share: 55 },
    { source: 'Повторные пациенты', share: 30 },
    { source: 'Рекомендации', share: 15 },
  ]

  const formatCurrency = (v) => v.toLocaleString('ru-RU') + ' ₽'

  const totalRevenue = revenueBySpecialty.reduce((sum, r) => sum + r.value, 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Insights sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4">Аналитика</Typography>
          <Typography variant="body2" color="text.secondary">
            Показатели эффективности клиники и канала AI-маркетплейса
          </Typography>
        </Box>
      </Box>

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Выручка за месяц
              </Typography>
              <Typography variant="h4">{formatCurrency(kpis.monthRevenue)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Средний чек
              </Typography>
              <Typography variant="h4">{formatCurrency(kpis.avgCheck)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Новые пациенты
              </Typography>
              <Typography variant="h4">{kpis.newPatients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Конверсия заявок в лечение
              </Typography>
              <Typography variant="h4">{kpis.conversionRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Funnel + Revenue by specialty */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Воронка пациентов AI-маркетплейса
              </Typography>
              {funnel.map((step, idx) => {
                const max = funnel[0].value
                const percent = Math.round((step.value / max) * 100)
                return (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2">{step.stage}</Typography>
                      <Typography variant="body2">{step.value}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percent}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )
              })}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Выручка по специализациям
              </Typography>
              {revenueBySpecialty.map((row, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body2">{row.specialty}</Typography>
                    <Typography variant="body2">
                      {formatCurrency(row.value)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={Math.round((row.value / totalRevenue) * 100)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sources table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Источники пациентов
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Источник</TableCell>
                  <TableCell>Доля пациентов</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sources.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{s.source}</TableCell>
                    <TableCell>
                      <Chip label={`${s.share}%`} color="primary" size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicAnalytics
