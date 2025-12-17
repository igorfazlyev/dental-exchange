import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const patientLinks = [
    { path: '/patient/news', icon: 'fa-newspaper', label: 'Новости и акции' },
    { path: '/patient/scans', icon: 'fa-images', label: 'Мои снимки' },
    { path: '/patient/plan', icon: 'fa-file-medical', label: 'План лечения' },
    { path: '/patient/criteria', icon: 'fa-sliders-h', label: 'Критерии поиска' },
    { path: '/patient/offers', icon: 'fa-hospital-alt', label: 'Предложения клиник' },
    { path: '/patient/status', icon: 'fa-tasks', label: 'Статус лечения' },
    { path: '/patient/consultations', icon: 'fa-calendar-check', label: 'Консультации' },
    { path: '/patient/reviews', icon: 'fa-star', label: 'Отзывы' }
  ];

  const clinicLinks = [
    { path: '/clinic/dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { path: '/clinic/orders', icon: 'fa-inbox', label: 'Входящие заказы' },
    { path: '/clinic/patients', icon: 'fa-user-friends', label: 'Пациенты' },
    { path: '/clinic/pricelist', icon: 'fa-dollar-sign', label: 'Прайс-лист' },
    { path: '/clinic/schedule', icon: 'fa-calendar', label: 'Расписание' },
    { path: '/clinic/analytics', icon: 'fa-chart-line', label: 'Аналитика' },
    { path: '/clinic/complaints', icon: 'fa-exclamation-circle', label: 'Жалобы' }
  ];

  const governmentLinks = [
    { path: '/government/dashboard', icon: 'fa-chart-pie', label: 'Сводка региона' },
    { path: '/government/analytics', icon: 'fa-search', label: 'Аналитика' },
    { path: '/government/clinics', icon: 'fa-building', label: 'Реестр клиник' }
  ];

  const insuranceLinks = [
    { path: '/insurance/dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { path: '/insurance/portfolio', icon: 'fa-users', label: 'Портфель пациентов' },
    { path: '/insurance/approvals', icon: 'fa-check-circle', label: 'Согласования' },
    { path: '/insurance/analytics', icon: 'fa-chart-bar', label: 'Аналитика' }
  ];

  const links = {
    patient: patientLinks,
    clinic: clinicLinks,
    government: governmentLinks,
    insurance: insuranceLinks
  }[user.role] || [];

  const icons = {
    patient: 'fa-user-circle',
    clinic: 'fa-hospital',
    government: 'fa-landmark',
    insurance: 'fa-shield-alt'
  };

  const titles = {
    patient: 'Личный кабинет пациента',
    clinic: 'Панель клиники',
    government: 'Панель гос. органа',
    insurance: 'Панель страховой'
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <i className={`fas ${icons[user.role]}`}></i>
        <h2>{titles[user.role]}</h2>
      </div>

      <nav className="sidebar-nav">
        {links.map(link => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`nav-link ${isActive(link.path)}`}
          >
            <i className={`fas ${link.icon}`}></i>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <button onClick={onLogout} className="btn btn-secondary logout-btn">
        <i className="fas fa-sign-out-alt"></i>
        Выход
      </button>
    </aside>
  );
};

export default Sidebar;
