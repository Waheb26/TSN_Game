import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import toastr from "toastr";
import "./SignUp.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "200",
  hideDuration: "500",
  timeOut: "6000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  escapeHtml: true,
};

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevVisible) => !prevVisible);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const viewer = {
      username,
      hashedPassword: password,
      email,
    };
    if (password !== confirmPassword) {
      toastr.info("Password and password confirmation don't match.");
      return;
    }
    if (!passwordRegex.test(password)) {
      toastr.info(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5001"
        }/viewers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(viewer),
        }
      );
      if (res.ok) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        toastr.success("Account created successfully");
        navigate("/Login");
      } else if (res.status === 403) {
        toastr.error("Account already exists");
      } else {
        toastr.error("Account creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-box">
      <Header />
      <div className="signup-container">
        <form className="signup" onSubmit={handleSubmit}>
          <h3 className="signup-title title">Create your account</h3>
          <div className="signup-field">
            <input
              type="text"
              className="signup-input"
              id="username"
              value={username}
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="signup-field">
            <input
              type="email"
              className="signup-input"
              id="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup-field">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="signup-input"
              value={password}
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={handleTogglePasswordVisibility}
            >
              {passwordVisible ? (
                <img
                  src="/assets/hidePassword.png"
                  alt="Hide Password"
                  height="20"
                  width="20"
                />
              ) : (
                <img
                  src="/assets/showPassword.png"
                  alt="Show Password"
                  height="20"
                  width="20"
                />
              )}
            </button>
          </div>
          <div className="signup-field">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="password"
              className="signup-input"
              value={confirmPassword}
              required
              placeholder="Password confirmation"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={handleToggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <img
                  src="/assets/hidePassword.png"
                  alt="Hide Password"
                  height="20"
                  width="20"
                />
              ) : (
                // <i className="fas fa-eye" />
                <img
                  src="/assets/showPassword.png"
                  alt="Show Password"
                  height="20"
                  width="20"
                />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="button signup-submit"
            data-hover="Let's Go!"
          >
            <div className="button-text">Sign Up</div>
          </button>
          <NavLink to="/login" className="login">
            Sign In
          </NavLink>
        </form>
      </div>
      <Footer />
    </div>
  );
}
