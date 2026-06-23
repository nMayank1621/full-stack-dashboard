import './About.css';

function About(props) {
  const toggleSidebar = props.toggleSidebar;
  
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
        <h1>About Us</h1>
        <p>
          Welcome to Escorts Kubota Limited! We are a leading company dedicated to excellence in our field.
          With years of experience, we strive to provide the best services and products to our customers.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver innovative solutions that empower our clients and drive positive change in the industry.
        </p>
        
        <h2>Our Vision</h2>
        <p>
          To be the global leader in our sector, setting new standards of quality and customer satisfaction.
        </p>
        
        <h2>Our Values</h2>
        <ul className="values-list">
          <li>Integrity: We uphold the highest ethical standards</li>
          <li>Innovation: We continuously seek new ways to improve</li>
          <li>Excellence: We deliver outstanding results</li>
          <li>Customer Focus: We prioritize our customers' needs</li>
        </ul>
      </div>
    </main>
  );
}

export default About;
