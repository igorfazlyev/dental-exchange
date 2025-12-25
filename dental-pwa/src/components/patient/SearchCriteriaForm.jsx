import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

const DISTRICTS = [
  'Центральный',
  'Тверской',
  'Пресненский',
  'Хамовники',
  'Арбат',
  'Замоскворечье',
];

const METRO_STATIONS = [
  'Маяковская',
  'Пушкинская',
  'Белорусская',
  'Фрунзенская',
  'Арбатская',
  'Третьяковская',
];

const PRICE_RANGES = [
  { value: 'low', label: 'Эконом (до 50 000 ₽)' },
  { value: 'medium', label: 'Средний (50 000 - 150 000 ₽)' },
  { value: 'high', label: 'Премиум (от 150 000 ₽)' },
];

export default function SearchCriteriaForm({ criteria, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...criteria, [field]: value });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Критерии поиска клиники
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Укажите ваши предпочтения для подбора клиник
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel>Район</InputLabel>
          <Select
            value={criteria.district || ''}
            onChange={(e) => handleChange('district', e.target.value)}
            label="Район"
          >
            <MenuItem value="">Любой</MenuItem>
            {DISTRICTS.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Метро</InputLabel>
          <Select
            value={criteria.metro || ''}
            onChange={(e) => handleChange('metro', e.target.value)}
            label="Метро"
          >
            <MenuItem value="">Любое</MenuItem>
            {METRO_STATIONS.map((station) => (
              <MenuItem key={station} value={station}>
                {station}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Ценовой сегмент</InputLabel>
          <Select
            value={criteria.priceRange || ''}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            label="Ценовой сегмент"
          >
            <MenuItem value="">Любой</MenuItem>
            {PRICE_RANGES.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Желаемая дата начала лечения"
          type="date"
          value={criteria.preferredDate || ''}
          onChange={(e) => handleChange('preferredDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
}
