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

          nfirst_name: firstName,
          
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

      }

      else {

        setError(data.message);

      }

    }

    catch (error) {

      console.log(error);

      setError("Server error");

    }

  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>Sign Up</h2>

        {error && <p className="error-message">{error}</p>}

        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSignupSubmit}>

          <div className="form-group">

            <label>First Name</label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Last Name</label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

          </div>

          <button type="submit" className="auth-btn">

            Sign Up

          </button>

        </form>

        <p className="auth-link">

          Already have an account?

          <button onClick={props.onGoToLogin}>

            Login

          </button>

        </p>

      </div>

    </div>

  );

}

export default Signup;