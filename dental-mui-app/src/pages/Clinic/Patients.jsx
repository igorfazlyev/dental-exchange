import { Box, Typography, Card, CardContent } from '@mui/material'
import { People } from '@mui/icons-material'

const ClinicPatients = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <People sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Пациенты</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Пациенты
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicPatients