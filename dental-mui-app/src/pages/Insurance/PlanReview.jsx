import { Box, Typography, Card, CardContent } from '@mui/material'
import { Search } from '@mui/icons-material'

const InsurancePlanReview = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Search sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Проверка плана</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Проверка плана
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default InsurancePlanReview