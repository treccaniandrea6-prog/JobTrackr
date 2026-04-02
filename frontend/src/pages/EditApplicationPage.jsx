import { useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://jobtrackr-backend-ctkm.onrender.com";

function EditApplicationPage() {
  const { id } = useParams();
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ company }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditApplicationPage;