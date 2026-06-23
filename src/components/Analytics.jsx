import './Analytics.css';

function Analytics(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const analyticsData = [
    { title: "Page Views", value: "2.5M", icon: "📊", color: "#3498db" },
    { title: "Bounce Rate", value: "42%", icon: "📈", color: "#2ecc71" },
    { title: "Avg. Session", value: "4.2m", icon: "⏱️", color: "#e74c3c" },
    { title: "Conversion", value: "3.5%", icon: "💹", color: "#f39c12" },
  ];

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
      <div className="analytics-container">
        <div className="page-header">
          <h1>Analytics</h1>
          <p className="subtitle">Track your performance metrics</p>
        </div>

        <div className="analytics-grid">
          {analyticsData.map((item, index) => (
            <div key={index} className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: item.color + '20' }}>
                <span>{item.icon}</span>
              </div>
              <div className="analytics-info">
                <p className="analytics-value">{item.value}</p>
                <p className="analytics-title">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-section">
          <h2>Top Pages</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Duration</th>
                  <th>Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>/dashboard</td>
                  <td>154,200</td>
                  <td>3:24</td>
                  <td>35%</td>
                </tr>
                <tr>
                  <td>/products</td>
                  <td>98,500</td>
                  <td>2:15</td>
                  <td>42%</td>
                </tr>
                <tr>
                  <td>/about</td>
                  <td>45,800</td>
                  <td>1:40</td>
                  <td>55%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analytics;
