import { useState } from "react";
import "./Signup.css";

function Signup(props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Server error");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={`${firstName} ${lastName}`.trim()}
                onChange={(e) => {
                  const parts = e.target.value.split(' ');
                  setFirstName(parts[0] || '');
                  setLastName(parts.slice(1).join(' ') || '');
                }}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="auth-right">
          <button type="submit" className="primary-btn" onClick={handleSignupSubmit}>
            Sign Up
          </button>
          <p className="auth-link">
            Already have an account? <button onClick={props.onGoToLogin}>Log in</button>
          </p>
          <div className="divider">Or</div>
          <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer" className="social-btn">
            <span className="social-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.891.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9s.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
            </span>
            Sign up with Google
          </a>
          <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" className="social-btn">
            <span className="social-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" fill="#1877F2"/>
                <path d="M13.676 12.89l.443-2.89h-2.773V8.125c0-.791.387-1.562 1.63-1.562h1.26V6.102s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V10H8.44v2.89h2.54v6.987a10.005 10.005 0 0 0 3.125 0v-6.987h2.33z" fill="white"/>
              </svg>
            </span>
            Sign up with Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
