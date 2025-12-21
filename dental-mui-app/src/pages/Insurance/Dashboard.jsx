import { Box, Typography, Card, CardContent } from '@mui/material'
import { Dashboard } from '@mui/icons-material'

const InsuranceDashboard = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Dashboard sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Dashboard страховой</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Dashboard страховой
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default InsuranceDashboard