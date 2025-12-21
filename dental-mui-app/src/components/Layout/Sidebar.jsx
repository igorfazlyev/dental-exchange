import { Link, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material'
import {
  Newspaper,
  Image,
  MedicalServices,
  Tune,
  LocalHospital,
  CheckBox,
  CalendarMonth,
  Star,
  Dashboard,
  Inbox,
  People,
  AttachMoney,
  Schedule,
  Analytics,
  ReportProblem,
  PieChart,
  Search,
  Business,
  Shield,
  Person,
  AccountBalance,
  Logout,
} from '@mui/icons-material'

const Sidebar = ({ user, onLogout, drawerWidth }) => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const patientLinks = [
    { path: '/patient/news', icon: <Newspaper />, label: 'Новости и акции' },
    { path: '/patient/scans', icon: <Image />, label: 'Мои снимки' },
    { path: '/patient/plan', icon: <MedicalServices />, label: 'План лечения' },
    { path: '/patient/criteria', icon: <Tune />, label: 'Критерии поиска' },
    { path: '/patient/offers', icon: <LocalHospital />, label: 'Предложения клиник' },
    { path: '/patient/status', icon: <CheckBox />, label: 'Статус лечения' },
    { path: '/patient/consultations', icon: <CalendarMonth />, label: 'Консультации' },
    { path: '/patient/reviews', icon: <Star />, label: 'Отзывы / жалобы' },
  ]

  const clinicLinks = [
    { path: '/clinic/dashboard', icon: <Dashboard />, label: 'Dashboard' },
    { path: '/clinic/orders', icon: <Inbox />, label: 'Заявки / заказы' },
    { path: '/clinic/patients', icon: <People />, label: 'Пациенты' },
    { path: '/clinic/pricelist', icon: <AttachMoney />, label: 'Прайс-лист' },
    { path: '/clinic/schedule', icon: <Schedule />, label: 'Слоты / расписание' },
    { path: '/clinic/analytics', icon: <Analytics />, label: 'Аналитика' },
    { path: '/clinic/complaints', icon: <ReportProblem />, label: 'Жалобы' },
    { path: '/clinic/profile', icon: <Business />, label: 'Профиль клиники' },
  ]

  const governmentLinks = [
    { path: '/government/dashboard', icon: <PieChart />, label: 'Сводка региона' },
    { path: '/government/analytics', icon: <Search />, label: 'Аналитика' },
    { path: '/government/clinics', icon: <Business />, label: 'Реестр клиник' },
  ]

  const insuranceLinks = [
    { path: '/insurance/dashboard', icon: <Dashboard />, label: 'Dashboard' },
    { path: '/insurance/portfolio', icon: <People />, label: 'Портфель пациентов' },
    { path: '/insurance/approvals', icon: <CheckBox />, label: 'Согласования' },
    { path: '/insurance/analytics', icon: <Analytics />, label: 'Аналитика' },
  ]

  const linksByRole = {
    patient: patientLinks,
    clinic_doctor: clinicLinks,
    clinic_manager: clinicLinks,
    government: governmentLinks,
    insurance: insuranceLinks,
  }

  const links = linksByRole[user.role] || []

  const roleIcon = {
    patient: <Person />,
    clinic_doctor: <LocalHospital />,
    clinic_manager: <LocalHospital />,
    government: <AccountBalance />,
    insurance: <Shield />,
  }[user.role]

  const roleTitle = {
    patient: 'Личный кабинет пациента',
    clinic_doctor: 'Кабинет врача',
    clinic_manager: 'Кабинет руководителя',
    government: 'Кабинет регулятора',
    insurance: 'Кабинет страховой',
  }[user.role]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <Box sx={{ color: 'primary.main', fontSize: 32 }}>{roleIcon}</Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {user.username}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {roleTitle}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {links.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              selected={isActive(link.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  '&:hover': { backgroundColor: 'primary.light' },
                },
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<Logout />}
          onClick={onLogout}
        >
          Выход
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar