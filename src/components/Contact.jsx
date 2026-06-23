import { useState } from 'react';
import './Contact.css';

function Contact(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  }

  return (
    <main className="content">
      <button
        className="sidebar-toggle-btn"
        onClick={(e) => {
          e.preventDefault();
          if (toggleSidebar) toggleSidebar();
        }}
      >
        ☰
      </button>
      <div className="page-card">
        <h1>Contact Us</h1>
        {submitted ? (
          <p className="success-message">Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                type="email"
                id="contact-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="auth-btn">Send Message</button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Contact;
