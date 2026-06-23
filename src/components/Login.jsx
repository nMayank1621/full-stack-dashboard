import { useState } from "react";
import "./Login.css";

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLoginSubmit(e) {

    e.preventDefault();

    setError("");

    try {

      const response = await fetch("http://localhost:5000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),

      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );

        props.onLoginSuccess(data.user);

      } else {

        setError(data.message || "Invalid Email or Password");

      }

    } catch (error) {

      console.log(error);

      setError("Server Error");

    }

  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLoginSubmit}>

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

          <button type="submit" className="auth-btn">

            Login

          </button>

        </form>

        <p className="auth-link">

          Don't have an account?

          <button onClick={props.onGoToSignup}>

            Sign Up

          </button>

        </p>

        <p className="auth-link">

          Forgot password?

          <button onClick={props.onGoToForgotPassword}>

            Forgot Password

          </button>

        </p>

      </div>

    </div>

  );

}

export default Login;
