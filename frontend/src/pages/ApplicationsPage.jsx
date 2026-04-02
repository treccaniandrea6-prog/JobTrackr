import { useEffect, useState } from "react";

const API_URL = "https://jobtrackr-backend-ctkm.onrender.com";

function ApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/applications`)
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  return (
    <div>
      {apps.map((app) => (
        <div key={app.id}>{app.company}</div>
      ))}
    </div>
  );
}

export default ApplicationsPage;