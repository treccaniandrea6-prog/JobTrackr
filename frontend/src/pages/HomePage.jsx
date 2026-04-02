import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hero-section">
      <p className="page-subtitle">
        Modern job tracking for focused job seekers
      </p>

      <h1 className="hero-title">
        Organize every application, interview, and next step in one place.
      </h1>

      <p className="hero-description">
        JobTrackr helps you manage your job search with a clean workflow,
        structured tracking, and a professional dashboard built for clarity.
      </p>

      <div className="hero-actions">
        {isAuthenticated ? (
          <>
            <Link className="button" to="/dashboard">
              Open Dashboard
            </Link>
            <Link className="button-secondary" to="/applications">
              View Applications
            </Link>
          </>
        ) : (
          <>
            <Link className="button" to="/register">
              Get Started
            </Link>
            <Link className="button-secondary" to="/login">
              Login
            </Link>
          </>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Track applications</p>
          <p className="stat-value">CRUD</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Authentication</p>
          <p className="stat-value">Secure</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Workflow</p>
          <p className="stat-value">Organized</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;