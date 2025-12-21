import { Box, Typography, Card, CardContent } from '@mui/material'
import { Analytics } from '@mui/icons-material'

const ClinicAnalytics = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Analytics sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Аналитика</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Аналитика
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicAnalytics