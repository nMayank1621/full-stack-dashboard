import './Navbar.css';

function Navbar(props) {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    currentUser,
    onLogout,
    onGoToLogin,
    onGoToSignup,
    onGoToAbout,
    onGoToBlog,
    onGoToContact,
  } = props;

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <img src="escorts.png" alt="Escorts Kubota" />
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToAbout();
              }}
            >
              ABOUT
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToContact();
              }}
            >
              CONTACT
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToBlog();
              }}
            >
              BLOG
            </a>
          </li>
        </ul>
      </div>

      {currentUser ? (
        <div className="user-section">
          <div className="user-avatar">
            {currentUser?.name
              ? currentUser.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <button
            className="logout-btn"
            onClick={onLogout}
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <ul className={`signin-up ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onGoToLogin();
              }}
            >
              LOG-IN
            </a>
          </li>

          <li>
            <a
              href="#"
              className="signup-btn"
              onClick={(e) => {
                e.preventDefault();
                onGoToSignup();
              }}
            >
              SIGN-UP
            </a>
          </li>
        </ul>
      )}

      <button
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}

export default Navbar;