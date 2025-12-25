import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (pathname) => {
    if (pathname === '/patient') return 0;
    if (pathname.startsWith('/patient/scans')) return 1;
    if (pathname.startsWith('/patient/appointments')) return 2;
    if (pathname.startsWith('/patient/profile')) return 3;
    return 0;
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000,
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={getValueFromPath(location.pathname)}
        onChange={(event, newValue) => {
          const paths = [
            '/patient',
            '/patient/scans',
            '/patient/appointments',
            '/patient/profile',
          ];
          navigate(paths[newValue]);
        }}
        showLabels
      >
        <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
        <BottomNavigationAction label="Снимки" icon={<ImageIcon />} />
        <BottomNavigationAction label="Приёмы" icon={<LocalHospitalIcon />} />
        <BottomNavigationAction label="Профиль" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
