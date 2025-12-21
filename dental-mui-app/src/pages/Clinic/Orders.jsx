import { Box, Typography, Card, CardContent } from '@mui/material'
import { Inbox } from '@mui/icons-material'

const ClinicOrders = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <Inbox sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Заявки и заказы</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Заявки и заказы
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicOrders