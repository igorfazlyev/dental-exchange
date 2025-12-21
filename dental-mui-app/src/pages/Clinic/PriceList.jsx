import { Box, Typography, Card, CardContent } from '@mui/material'
import { AttachMoney } from '@mui/icons-material'

const ClinicPriceList = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <AttachMoney sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Прайс-лист</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Прайс-лист
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClinicPriceList