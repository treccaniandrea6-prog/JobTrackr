import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import CreateApplicationPage from "./pages/CreateApplicationPage";
import EditApplicationPage from "./pages/EditApplicationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/create" element={<CreateApplicationPage />} />
        <Route path="/edit/:id" element={<EditApplicationPage />} />
      </Routes>
    </Router>
  );
}

export default App;