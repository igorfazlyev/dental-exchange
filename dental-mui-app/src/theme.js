import { createTheme, alpha } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your primary color
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: alpha('#1976d2', 0.08),
            borderLeft: '3px solid #1976d2',
            '& .MuiListItemIcon-root': {
              color: '#1976d2',
            },
            '& .MuiListItemText-primary': {
              color: '#1976d2',
              fontWeight: 600,
            },
          },
          '&.Mui-selected:hover': {
            backgroundColor: alpha('#1976d2', 0.12),
          },
          '&:hover': {
            backgroundColor: alpha('#1976d2', 0.04),
          },
        },
      },
    },
  },
})

export default theme
