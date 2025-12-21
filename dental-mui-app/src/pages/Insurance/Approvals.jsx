import { Box, Typography, Card, CardContent } from '@mui/material'
import { CheckBox } from '@mui/icons-material'

const InsuranceApprovals = () => {
  return (
    <Box>
      <Box sx={ { display: 'flex', alignItems: 'center', mb: 3, gap: 2 } }>
        <CheckBox sx={ { fontSize: 40, color: 'primary.main' } } />
        <Typography variant="h4">Согласования</Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Страница в разработке. Здесь будет отображаться: Согласования
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default InsuranceApprovals