import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../context/useAuth';

function EditApplicationPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: '',
    role_title: '',
    location: '',
    status: 'Applied',
    application_date: '',
    job_link: '',
    notes: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`http://localhost:5001/api/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to load application');
        }

        setForm({
          company_name: data.application.company_name || '',
          role_title: data.application.role_title || '',
          location: data.application.location || '',
          status: data.application.status || 'Applied',
          application_date: data.application.application_date
            ? data.application.application_date.split('T')[0]
            : '',
          job_link: data.application.job_link || '',
          notes: data.application.notes || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setSaving(true);

      const res = await fetch(`http://localhost:5001/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update application');
      }

      navigate('/applications');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading application...</div>;
  }

  return (
    <div className="form-card">
      <div className="page-header">
        <h1 className="page-title">Edit Application</h1>
        <p className="page-subtitle">
          Update the current stage, notes, and details of this application.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="edit-company_name">
            Company Name
          </label>
          <input
            id="edit-company_name"
            className="form-control"
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={form.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-role_title">
            Role Title
          </label>
          <input
            id="edit-role_title"
            className="form-control"
            type="text"
            name="role_title"
            placeholder="Role Title"
            value={form.role_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-location">
            Location
          </label>
          <input
            id="edit-location"
            className="form-control"
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-status">
            Status
          </label>
          <select
            id="edit-status"
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-application_date">
            Application Date
          </label>
          <input
            id="edit-application_date"
            className="form-control"
            type="date"
            name="application_date"
            value={form.application_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-job_link">
            Job Link
          </label>
          <input
            id="edit-job_link"
            className="form-control"
            type="text"
            name="job_link"
            placeholder="Job Link"
            value={form.job_link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="edit-notes">
            Notes
          </label>
          <textarea
            id="edit-notes"
            className="form-textarea"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Application'}
          </button>

          <Link className="button-secondary" to="/applications">
            Back to Applications
          </Link>
        </div>
      </form>

      {error && <div className="error-state">{error}</div>}
    </div>
  );
}

export default EditApplicationPage;