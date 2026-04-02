import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, {user?.name || 'User'}. Manage your progress with a
          clear overview of your job search.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Profile</p>
          <p className="stat-value">{user?.name ? 'Ready' : 'Missing'}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Session</p>
          <p className="stat-value">Active</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Workspace</p>
          <p className="stat-value">Live</p>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: '20px' }}>
        <h2 className="application-title">Your Account</h2>
        <div className="application-meta">
          <p>
            <strong>Name:</strong> {user?.name || 'User'}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || 'No email available'}
          </p>
        </div>

        <div className="quick-actions">
          <Link className="button" to="/applications">
            View Applications
          </Link>
          <Link className="button-secondary" to="/applications/new">
            Create Application
          </Link>
          <Link className="button-secondary" to="/profile">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;