import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BottomNav from '../../components/common/BottomNav';
import useStore from '../../store/useStore';

export default function PatientProfile() {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/patient')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Профиль
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {user?.id}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user?.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Телефон" secondary="+7 (999) 123-45-67" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Роль" secondary="Пациент" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              О приложении
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Dental AI Platform - умная платформа для планирования стоматологического лечения
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Версия: 1.0.0 (Demo)
            </Typography>
          </CardContent>
        </Card>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Выйти из аккаунта
        </Button>
      </Container>

      <BottomNav />
    </Box>
  );
}
