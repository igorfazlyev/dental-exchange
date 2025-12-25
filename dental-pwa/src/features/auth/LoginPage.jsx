import { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import useStore from '../../store/useStore';
import apiService from '../../api/services/apiService';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.login(email, password, role);
      
      if (response.success) {
        setUser(response.user, role);
        
        // Navigate based on role
        switch (role) {
          case 'patient':
            navigate('/patient');
            break;
          case 'clinic':
            navigate('/clinic');
            break;
          case 'insurance':
            navigate('/insurance');
            break;
          case 'government':
            navigate('/government');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.message || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const getRoleInfo = () => {
    const info = {
      patient: {
        icon: <PersonIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
        title: 'Вход для пациентов',
        description: 'Получите план лечения от ИИ и предложения от клиник',
        demoEmail: 'patient@demo.com',
      },
      clinic: {
        icon: <LocalHospitalIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
        title: 'Вход для клиник',
        description: 'Получайте заявки от пациентов и управляйте лечением',
        demoEmail: 'clinic@demo.com',
      },
      insurance: {
        icon: <BusinessIcon sx={{ fontSize: 48, color: 'success.main' }} />,
        title: 'Вход для страховых',
        description: 'Отслеживайте лечение застрахованных пациентов',
        demoEmail: 'insurance@demo.com',
      },
      government: {
        icon: <AccountBalanceIcon sx={{ fontSize: 48, color: 'warning.main' }} />,
        title: 'Вход для департамента',
        description: 'Мониторинг и аналитика стоматологических услуг',
        demoEmail: 'government@demo.com',
      },
    };
    return info[role];
  };

  const roleInfo = getRoleInfo();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dental AI Platform
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Умная платформа для планирования стоматологического лечения
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Tabs
              value={role}
              onChange={(e, newValue) => setRole(newValue)}
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab label="Пациент" value="patient" />
              <Tab label="Клиника" value="clinic" />
              <Tab label="Страховая" value="insurance" />
              <Tab label="ДЗ" value="government" />
            </Tabs>

            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              {roleInfo.icon}
              <Typography variant="h6" mt={2} mb={1}>
                {roleInfo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {roleInfo.description}
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  autoComplete="email"
                  placeholder={roleInfo.demoEmail}
                />

                <TextField
                  label="Пароль"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  autoComplete="current-password"
                  placeholder="demo123"
                />

                {error && (
                  <Alert severity="error" onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <Alert severity="info">
                  <Typography variant="body2" fontWeight="bold">
                    Демо-доступ:
                  </Typography>
                  <Typography variant="body2">
                    Email: {roleInfo.demoEmail}
                  </Typography>
                  <Typography variant="body2">Пароль: demo123</Typography>
                </Alert>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Вход...' : 'Войти'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
          © 2024 Dental AI Platform. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
}
