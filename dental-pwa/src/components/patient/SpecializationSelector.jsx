import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  Chip,
} from '@mui/material';
import { SPECIALIZATIONS } from '../../api/mockData/specializations';
import { formatPriceRange } from '../../utils/formatters';

export default function SpecializationSelector({ 
  specializations, 
  selected, 
  onChange 
}) {
  const handleToggle = (specType) => {
    if (selected.includes(specType)) {
      onChange(selected.filter(s => s !== specType));
    } else {
      onChange([...selected, specType]);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Выберите направления лечения
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Выберите, по каким направлениям вы хотите получить предложения от клиник
      </Typography>

      {specializations.map((spec) => {
        const specInfo = SPECIALIZATIONS[spec.type.toUpperCase()];
        const isSelected = selected.includes(spec.type);

        return (
          <Card 
            key={spec.type} 
            sx={{ 
              mb: 2, 
              border: isSelected ? 2 : 1,
              borderColor: isSelected ? 'primary.main' : 'divider',
            }}
          >
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleToggle(spec.type)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle1">
                      {specInfo?.icon} {specInfo?.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {spec.procedures.length} процедур
                    </Typography>
                  </Box>
                }
              />

              <Box mt={1}>
                <Chip 
                  label={formatPriceRange(spec.totalPrice.min, spec.totalPrice.max)}
                  size="small"
                  color={isSelected ? 'primary' : 'default'}
                />
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
