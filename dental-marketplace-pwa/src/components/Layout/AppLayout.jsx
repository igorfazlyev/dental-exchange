import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  LocalHospital,
  Store,
  Newspaper,
  Assignment,
  People,
  Analytics,
  Notifications,
  AccountCircle,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockData } from '../../services/mockData';

const drawerWidth = 260;

const navigationItems = {
  patient: [
    { text: 'Дашборд', icon: <Dashboard />, path: '/patient/dashboard' },
    { text: 'План лечения', icon: <LocalHospital />, path: '/patient/treatment-plan' },
    { text: 'Предложения клиник', icon: <Store />, path: '/patient/offers' },
    { text: 'Новости и акции', icon: <Newspaper />, path: '/patient/news' },
  ],
  clinic: [
    { text: 'Дашборд', icon: <Dashboard />, path: '/clinic/dashboard' },
    { text: 'Заказы', icon: <Assignment />, path: '/clinic/orders' },
    { text: 'Пациенты', icon: <People />, path: '/clinic/patients' },
    { text: 'Аналитика', icon: <Analytics />, path: '/clinic/analytics' },
  ],
  insurance: [
    { text: 'Дашборд', icon: <Dashboard />, path: '/insurance/dashboard' },
    { text: 'Портфель', icon: <People />, path: '/insurance/portfolio' },
    { text: 'Согласования', icon: <Assignment />, path: '/insurance/approvals' },
    { text: 'Аналитика', icon: <Analytics />, path: '/insurance/analytics' },
  ],
};

export default function AppLayout({ children, userRole, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
    navigate('/login');
  };

  const getUserName = () => {
    if (userRole === 'patient') return mockData.patientProfile.name;
    if (userRole === 'clinic') return mockData.clinicDashboard.clinicName;
    if (userRole === 'insurance') return mockData.insuranceDashboard.companyName;
    return 'User';
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <LocalHospital sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          Dental MP
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, flexGrow: 1 }}>
        {navigationItems[userRole].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {userRole === 'patient' && 'Личный кабинет пациента'}
          {userRole === 'clinic' && 'Панель клиники'}
          {userRole === 'insurance' && 'Панель страховой компании'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
              {getUserName().charAt(0)}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2">{getUserName()}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
              Профиль
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Настройки
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
              Выйти
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
