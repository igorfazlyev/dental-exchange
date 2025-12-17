import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppLayout from './components/Layout/AppLayout';

// Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import TreatmentPlan from './pages/patient/TreatmentPlan';
import ClinicOffers from './pages/patient/ClinicOffers';
import NewsFeed from './pages/patient/NewsFeed';
import ClinicDashboard from './pages/clinic/ClinicDashboard';
import ClinicOrders from './pages/clinic/ClinicOrders';
import InsuranceDashboard from './pages/insurance/InsuranceDashboard';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [userRole, setUserRole] = useState('patient');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <AppLayout userRole={userRole} onLogout={handleLogout}>
            <Routes>
              {/* Patient Routes */}
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/treatment-plan" element={<TreatmentPlan />} />
              <Route path="/patient/offers" element={<ClinicOffers />} />
              <Route path="/patient/news" element={<NewsFeed />} />
              
              {/* Clinic Routes */}
              <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
              <Route path="/clinic/orders" element={<ClinicOrders />} />
              
              {/* Insurance Routes */}
              <Route path="/insurance/dashboard" element={<InsuranceDashboard />} />
              
              <Route path="/" element={<Navigate to={`/${userRole}/dashboard`} />} />
            </Routes>
          </AppLayout>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
