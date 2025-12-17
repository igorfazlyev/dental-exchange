import { useState } from 'react';
import { users } from '../data/mockData';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = Object.values(users).find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const demoLogins = Object.values(users);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <i className="fas fa-tooth"></i>
          <h1>DentalAI Platform</h1>
          <p>Современная платформа для стоматологии</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>
              <i className="fas fa-user"></i> Логин
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            <i className="fas fa-sign-in-alt"></i> Войти
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Демо-аккаунты:</h3>
          {demoLogins.map(user => (
            <div key={user.username} className="demo-account">
              <strong>{user.username}</strong> / demo123
              <span className="role-badge">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
