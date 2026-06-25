import { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword(props) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  async function handleSendCode(e) {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setStep(2);
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('http://localhost:5000/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setStep(3);
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setTimeout(() => {
          props.onGoToLogin();
        }, 2000);
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          {step === 1 && <h2>Forgot Password</h2>}
          {step === 2 && <h2>Verify Code</h2>}
          {step === 3 && <h2>Reset Password</h2>}
          
          {message && (
            <p className={messageType === 'success' ? 'success-message' : 'error-message'}>
              {message}
            </p>
          )}

          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
          )}
        </div>
        <div className="auth-right">
          {step === 1 && (
            <>
              <button className="primary-btn" onClick={handleSendCode}>
                Send Code
              </button>
              <p className="auth-link">
                Remember your password? <button onClick={props.onGoToLogin}>Login</button>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <button className="primary-btn" onClick={handleVerifyCode}>
                Verify Code
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button className="primary-btn" onClick={handleResetPassword}>
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
