import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

function CreateApplicationPage() {
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

  const [error, setError] = useState('');

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
      const res = await fetch('https://jobtrackr-backend-ctkm.onrender.com/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create application');
      }

      navigate('/applications');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-card">
      <div className="page-header">
        <h1 className="page-title">Create Application</h1>
        <p className="page-subtitle">
          Add a new role to your pipeline and keep your search structured from
          day one.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="company_name">
            Company Name
          </label>
          <input
            id="company_name"
            className="form-control"
            type="text"
            name="company_name"
            placeholder="e.g. Google"
            value={form.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="role_title">
            Role Title
          </label>
          <input
            id="role_title"
            className="form-control"
            type="text"
            name="role_title"
            placeholder="e.g. Frontend Engineer"
            value={form.role_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            className="form-control"
            type="text"
            name="location"
            placeholder="e.g. Milan or Remote"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
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
          <label className="form-label" htmlFor="application_date">
            Application Date
          </label>
          <input
            id="application_date"
            className="form-control"
            type="date"
            name="application_date"
            value={form.application_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="job_link">
            Job Link
          </label>
          <input
            id="job_link"
            className="form-control"
            type="text"
            name="job_link"
            placeholder="Paste the role URL"
            value={form.job_link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            className="form-textarea"
            name="notes"
            placeholder="Add useful notes, interview steps, or follow-ups"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="button" type="submit">
            Create Application
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

export default CreateApplicationPage;