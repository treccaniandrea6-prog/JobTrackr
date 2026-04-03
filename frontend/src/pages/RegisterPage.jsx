import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
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
      const res = await fetch('https://jobtrackr-backend-ctkm.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Register failed');
      }

      alert('Register successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-card">
      <div className="page-header">
        <h1 className="page-title">Create your account</h1>
        <p className="page-subtitle">
          Start tracking your applications with a clean and structured workflow.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            className="form-control"
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button className="button" type="submit">
            Register
          </button>
          <Link className="button-secondary" to="/login">
            Already have an account?
          </Link>
        </div>
      </form>

      {error && <p className="error-state">{error}</p>}
    </div>
  );
}

export default RegisterPage;