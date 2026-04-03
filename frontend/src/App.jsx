import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import CreateApplicationPage from './pages/CreateApplicationPage';
import EditApplicationPage from './pages/EditApplicationPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './context/useAuth';

function AppContent() {
  const { isAuthenticated, user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('https://jobtrackr-backend-ctkm.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-topbar">
          <div className="app-topbar-row">
            <div className="brand-block">
              <h1 className="brand-title">JobTrackr</h1>
              <p className="brand-subtitle">
                Job Application Management Platform
              </p>
            </div>

            <nav className="nav-actions">
              <Link className="nav-link" to="/">
                Home
              </Link>

              {!isAuthenticated && (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}

              {!isAuthenticated && (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}

              {isAuthenticated && (
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              )}

              {isAuthenticated && (
                <Link className="nav-link" to="/applications">
                  Applications
                </Link>
              )}

              {isAuthenticated && (
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              )}

              {isAuthenticated && (
                <button className="button-secondary" type="button" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </nav>
          </div>

          <div className="status-panel">
            <div className="status-badge">
              <span
                className={`status-dot ${isAuthenticated ? 'is-authenticated' : ''}`}
              ></span>
              {isAuthenticated
                ? `Logged in as ${user?.name || 'User'}`
                : 'Logged out'}
            </div>
          </div>
        </header>

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute>
                  <ApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications/new"
              element={
                <ProtectedRoute>
                  <CreateApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications/:id/edit"
              element={
                <ProtectedRoute>
                  <EditApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;