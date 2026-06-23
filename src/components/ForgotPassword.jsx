import { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  function handleForgotPasswordSubmit(e) {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('dashboardUsers') || '[]');
    const user = users.find(u => u.email === email);

    if (user) {
      setMessage('Password reset link sent to your email! (This is a mock)');
      setMessageType('success');
    } else {
      setMessage('Email not found!');
      setMessageType('error');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        {message && (
          <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
            {message}
          </p>
        )}
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="form-group">
            <label htmlFor="forgot-email">Email</label>
            <input
              type="email"
              id="forgot-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Reset Password</button>
        </form>
        <p className="auth-link">
          Remember your password? <button onClick={props.onGoToLogin}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
