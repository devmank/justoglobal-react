import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import LoginViaLink from "./pages/loginLink";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login-link" element={<LoginViaLink />} />
      </Routes>
    </Router>
  );
}

export default App;
