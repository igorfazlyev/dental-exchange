import { Chip } from '@mui/material';
import { getStatusDisplay, getStatusColor } from '../../utils/formatters';

export default function StatusChip({ status, ...props }) {
  return (
    <Chip
      label={getStatusDisplay(status)}
      color={getStatusColor(status)}
      size="small"
      {...props}
    />
  );
}
