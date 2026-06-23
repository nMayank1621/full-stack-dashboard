import { useState } from 'react';
import './Settings.css';

function Settings(props) {
  const toggleSidebar = props.toggleSidebar;
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

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
      <div className="settings-container">
        <div className="page-header">
          <h1>Settings</h1>
          <p className="subtitle">Manage your preferences</p>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Profile</h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Full Name</label>
              <input type="text" defaultValue="John Doe" />
            </div>
            <div className="setting-item">
              <label>Email</label>
              <input type="email" defaultValue="john@example.com" />
            </div>
            <button className="save-btn">Save Changes</button>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Preferences</h2>
          <div className="settings-card">
            <div className="setting-item toggle-item">
              <div className="toggle-info">
                <label>Dark Mode</label>
                <span className="toggle-desc">Enable dark theme</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item toggle-item">
              <div className="toggle-info">
                <label>Email Notifications</label>
                <span className="toggle-desc">Receive email updates</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Security</h2>
          <div className="settings-card">
            <button className="action-btn">Change Password</button>
            <button className="action-btn danger">Delete Account</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
