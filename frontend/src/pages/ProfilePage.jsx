import useAuth from '../context/useAuth';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">
          Review your account information and keep your workspace organized.
        </p>
      </div>

      <div className="profile-grid">
        <div className="profile-item">
          <p className="profile-label">Name</p>
          <p className="profile-value">{user?.name || 'N/A'}</p>
        </div>

        <div className="profile-item">
          <p className="profile-label">Email</p>
          <p className="profile-value">{user?.email || 'N/A'}</p>
        </div>

        <div className="profile-item">
          <p className="profile-label">User ID</p>
          <p className="profile-value">{user?.id || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;