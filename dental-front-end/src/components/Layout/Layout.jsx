import Sidebar from './Sidebar';

const Layout = ({ user, onLogout, children }) => {
  return (
    <div className="app-container">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;