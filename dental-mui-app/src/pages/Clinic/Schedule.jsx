import { Box, Typography, Card, CardContent } from '@mui/material'
import { Schedule } from '@mui/icons-material'

const ClinicSchedule = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Schedule sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Расписание и слоты</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Расписание и слоты
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicSchedule