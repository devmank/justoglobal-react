import "./loginForm.css";

import { handleSendLoginLink } from "../api/loginLink";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await login(username, password);
    console.log("Login successful", data);

    if (data) {
      console.log("Login successful", data);
      setMessage("Login successful!");
      localStorage.setItem("token", data.payload.accessToken);
      navigate("/dashboard");
    } else {
      setError(data?.error);
    }
  };
  const handleLoginLink = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await handleSendLoginLink(username, setMessage);
      if (data?.link) {
        navigate(`/login-link?redirectUrl=${encodeURIComponent(data.link)}`);
      } else {
        setError("Failed to retrieve login link.");
      }
    } catch (error) {
      console.debug(error);
      setError("Failed to send login link.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email or Phone:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="or-text">OR</p>
        <button onClick={handleLoginLink} className="login-link-button">
          Login via Email Link
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
