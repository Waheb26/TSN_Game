import React, { useState } from "react";
import "./SignUp.scss";
import { useNavigate, NavLink } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/Login");
  };

  return (
    <div className="login_container">
      <div className="screen">
        <div className="screen-content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="text"
                className="login-input"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-field">
              <input
                type="email"
                className="login-input"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                className="login-input"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-field">
              <input
                type="password"
                className="login-input"
                value={confirmPassword}
                placeholder="Password confirmation"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <NavLink to="/Login" className="subscribe">
              Sing In
            </NavLink>
            <button
              type="submit"
              className="button login-submit"
              data-hover="Let's Go!"
            >
              <div className="button-text">Sign Up</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
