import { Box, Typography, Card, CardContent } from '@mui/material'
import { Business } from '@mui/icons-material'

const GovernmentClinicRegistry = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Business sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Реестр клиник</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Реестр клиник
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default GovernmentClinicRegistry