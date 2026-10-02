import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    onLogin(username);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="login-header">
          <div className="login-icon">💰</div>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your daily expenses</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="login-form">
          {error && <div className="message error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username / Email</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
