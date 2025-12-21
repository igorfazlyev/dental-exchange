import { Box, Typography, Card, CardContent } from '@mui/material'
import { PieChart } from '@mui/icons-material'

const GovernmentDashboard = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <PieChart sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Сводка региона</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Сводка региона
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default GovernmentDashboard