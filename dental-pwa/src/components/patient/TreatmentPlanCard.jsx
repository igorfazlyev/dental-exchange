import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { formatPriceRange } from '../../utils/formatters';
import { SPECIALIZATIONS } from '../../api/mockData/specializations';

export default function TreatmentPlanCard({ plan, onRequestOffers }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">План лечения</Typography>
          <Chip 
            label={plan.status === 'draft' ? 'Черновик' : 'Опубликован'} 
            color={plan.status === 'draft' ? 'default' : 'success'}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Общая стоимость: {formatPriceRange(plan.totalEstimate.min, plan.totalEstimate.max)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {plan.specializations.map((spec) => {
          const specInfo = SPECIALIZATIONS[spec.type.toUpperCase()];
          
          return (
            <Box key={spec.type} mb={3}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="subtitle1">
                  {specInfo?.icon} {specInfo?.displayName}
                </Typography>
                <Chip 
                  label={formatPriceRange(spec.totalPrice.min, spec.totalPrice.max)}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <List dense>
                {spec.procedures.map((proc) => (
                  <ListItem key={proc.id} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={proc.procedure}
                      secondary={
                        <>
                          {proc.toothNumber && `Зуб ${proc.toothNumber} • `}
                          {proc.diagnosis} • {formatPriceRange(proc.estimatedPrice.min, proc.estimatedPrice.max)}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        })}

        {plan.status === 'draft' && (
          <Button 
            variant="contained" 
            fullWidth 
            onClick={onRequestOffers}
            sx={{ mt: 2 }}
          >
            Получить предложения от клиник
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
