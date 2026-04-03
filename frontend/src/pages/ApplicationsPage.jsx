import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

function ApplicationsPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError('');

        const queryParams = new URLSearchParams();

        if (statusFilter) {
          queryParams.append('status', statusFilter);
        }

        if (searchTerm.trim()) {
          queryParams.append('search', searchTerm.trim());
        }

        const url = `https://jobtrackr-backend-ctkm.onrender.com/api/applications${
          queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to load applications.');
        }

        setApplications(data.applications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, statusFilter, searchTerm]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const res = await fetch(`https://jobtrackr-backend-ctkm.onrender.com/api/applications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete application.');
      }

      setApplications((prev) =>
        prev.filter((application) => application.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusClassName = (status) => {
    const normalized = status?.toLowerCase();

    if (normalized === 'applied') return 'status-pill';
    if (normalized === 'interview') return 'status-pill';
    if (normalized === 'offer') return 'status-pill';
    if (normalized === 'rejected') return 'status-pill';

    return 'status-pill';
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Applications</h1>
        <p className="page-subtitle">
          Track every role, filter your pipeline, and keep your next steps under
          control.
        </p>
      </div>

      <div className="toolbar">
        <Link className="button" to="/applications/new">
          Create New Application
        </Link>

        <div className="filters-row">
          <input
            className="form-control"
            type="text"
            placeholder="Search company or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading && <div className="loading-state">Loading applications...</div>}

      {error && <div className="error-state">{error}</div>}

      {!loading && !error && applications.length === 0 && (
        <div className="empty-state">
          No applications found. Start by creating your first application entry.
        </div>
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="card-grid">
          {applications.map((application) => (
            <article key={application.id} className="application-card">
              <div className="application-header">
                <div>
                  <h2 className="application-title">{application.role_title}</h2>
                  <p className="application-company">{application.company_name}</p>
                </div>

                <span className={getStatusClassName(application.status)}>
                  {application.status}
                </span>
              </div>

              <div className="application-meta">
                <p>
                  <strong>Location:</strong> {application.location || 'N/A'}
                </p>
                <p>
                  <strong>Application Date:</strong>{' '}
                  {application.application_date || 'N/A'}
                </p>
                <p>
                  <strong>Job Link:</strong> {application.job_link || 'N/A'}
                </p>
                <p>
                  <strong>Notes:</strong> {application.notes || 'N/A'}
                </p>
              </div>

              <div className="application-actions">
                <Link
                  className="button-secondary"
                  to={`/applications/${application.id}/edit`}
                >
                  Edit
                </Link>

                <button
                  className="button-danger"
                  type="button"
                  onClick={() => handleDelete(application.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;