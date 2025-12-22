import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Chip,
  Container,
} from '@mui/material'
import { MedicalServices, Login as LoginIcon } from '@mui/icons-material'
import { users } from '../data/mockUsers'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const allUsers = Object.values(users)
    const found = allUsers.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      onLogin(found)
    } else {
      setError('Неверный логин или пароль')
    }
  }

  const demoLogins = Object.values(users)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={8}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              
              <Typography variant="h4" gutterBottom>
                🦷 Dental AI
              </Typography>
              <Typography color="text.secondary">
                Маркетплейс стоматологических услуг
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
              >
                Войти
              </Button>
              <Box sx={{ height: 24 }} />
            </form>

            {/* <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider' }}>
              <Typography
                variant="overline"
                color="text.secondary"
                gutterBottom
              >
                Демо-аккаунты:
              </Typography>

              {demoLogins.map((u) => (
                <Box
                  key={u.username}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    mb: 1,
                    bgcolor: 'background.default',
                    borderRadius: 1,
                    border: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2">
                    <strong>{u.username}</strong> / demo123
                  </Typography>
                  <Chip label={u.role} color="primary" size="small" />
                </Box>
              ))}
            </Box> */}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Login
