import { useState } from "react";

const API_URL = "https://jobtrackr-backend-ctkm.onrender.com";

function CreateApplicationPage() {
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/applications`, {
      method: "POST",
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
        placeholder="Company"
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateApplicationPage;