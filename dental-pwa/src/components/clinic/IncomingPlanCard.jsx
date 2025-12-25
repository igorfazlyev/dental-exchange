import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { formatPriceRange, formatDate } from '../../utils/formatters';
import { SPECIALIZATIONS } from '../../api/mockData/specializations';

export default function IncomingPlanCard({ plan, onCalculate }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Box>
            <Typography variant="h6">Новый план лечения</Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.patientGender === 'male' ? 'Мужчина' : 'Женщина'}, {plan.patientAge} лет
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Создан: {formatDate(plan.createdDate)}
            </Typography>
          </Box>
          <Chip label="Новый" color="success" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Ориентировочная стоимость: {formatPriceRange(plan.totalEstimate.min, plan.totalEstimate.max)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Требуемые специализации:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {plan.specializations.map((spec) => {
            const specInfo = SPECIALIZATIONS[spec.type.toUpperCase()];
            return (
              <Chip
                key={spec.type}
                label={`${specInfo?.icon} ${specInfo?.displayName}`}
                size="small"
                variant="outlined"
              />
            );
          })}
        </Box>

        {plan.searchCriteria && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Критерии пациента:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {plan.searchCriteria.district && `Район: ${plan.searchCriteria.district}`}
              {plan.searchCriteria.metro && ` • Метро: ${plan.searchCriteria.metro}`}
              {plan.searchCriteria.priceRange && ` • Ценовой сегмент: ${plan.searchCriteria.priceRange}`}
            </Typography>
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={() => onCalculate(plan)}
        >
          Рассчитать предложение
        </Button>
      </CardContent>
    </Card>
  );
}
