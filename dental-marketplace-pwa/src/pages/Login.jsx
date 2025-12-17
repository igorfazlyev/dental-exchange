import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  LocalHospital,
  Person,
  Business,
  AccountBalance,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      type: 'patient',
      title: 'Пациент',
      description: 'Управление планом лечения и поиск клиник',
      icon: <Person sx={{ fontSize: 48 }} />,
      color: 'primary',
    },
    {
      type: 'clinic',
      title: 'Клиника',
      description: 'Получение заказов и управление пациентами',
      icon: <Business sx={{ fontSize: 48 }} />,
      color: 'secondary',
    },
    {
      type: 'insurance',
      title: 'Страховая компания',
      description: 'Управление портфелем и согласования',
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      color: 'info',
    },
  ];

  const handleRoleSelect = (roleType) => {
    setSelectedRole(roleType);
  };

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: { xs: 2, md: 4 },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Card
          sx={{
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            width: '100%',
            maxWidth: 1200,
          }}
        >
          <Grid container>
            {/* Left Side - Branding */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ mb: 4 }}>
                <LocalHospital sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h3" gutterBottom fontWeight={700}>
                  Dental
                </Typography>
                <Typography variant="h3" gutterBottom fontWeight={700}>
                  Marketplace
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Современная платформа для управления стоматологическим лечением
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                  ✓ Планы лечения с FDI нумерацией
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                  ✓ Сравнение предложений клиник
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                  ✓ Автоматические рекомендации специалистов
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  ✓ Интеграция со страховыми компаниями
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} md={7}>
              <CardContent sx={{ p: 6 }}>
                {!selectedRole ? (
                  <>
                    <Typography variant="h4" gutterBottom fontWeight={600}>
                      Добро пожаловать!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      Выберите тип аккаунта для входа в систему
                    </Typography>

                    <Grid container spacing={3}>
                      {roles.map((role) => (
                        <Grid item xs={12} key={role.type}>
                          <Paper
                            sx={{
                              p: 3,
                              cursor: 'pointer',
                              border: 2,
                              borderColor: 'transparent',
                              transition: 'all 0.3s',
                              '&:hover': {
                                borderColor: `${role.color}.main`,
                                bgcolor: `${role.color}.50`,
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                              },
                            }}
                            onClick={() => handleRoleSelect(role.type)}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  color: `${role.color}.main`,
                                  mr: 3,
                                }}
                              >
                                {role.icon}
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                  {role.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {role.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Button
                      size="small"
                      onClick={() => setSelectedRole(null)}
                      sx={{ mb: 2 }}
                    >
                      ← Назад к выбору роли
                    </Button>
                    <Typography variant="h4" gutterBottom fontWeight={600}>
                      Вход в систему
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      {roles.find(r => r.type === selectedRole)?.title}
                    </Typography>

                    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                      <TextField
                        fullWidth
                        label="Email или номер телефона"
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus
                      />
                      <TextField
                        fullWidth
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                      >
                        Войти
                      </Button>
                      <Button
                        variant="text"
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Забыли пароль?
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                      >
                        Создать аккаунт
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: 'white', opacity: 0.8 }}
        >
          © 2025 Dental Marketplace. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
}
