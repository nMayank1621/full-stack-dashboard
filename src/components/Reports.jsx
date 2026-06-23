import './Reports.css';

function Reports(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const reports = [
    { id: 1, name: "Monthly Sales Report", date: "Jun 15, 2024", status: "Completed", icon: "📊" },
    { id: 2, name: "Q2 Financial Summary", date: "Jun 10, 2024", status: "Completed", icon: "📈" },
    { id: 3, name: "Customer Insights", date: "Jun 08, 2024", status: "Pending", icon: "📋" },
    { id: 4, name: "Marketing Performance", date: "Jun 05, 2024", status: "Completed", icon: "🎯" },
    { id: 5, name: "Inventory Report", date: "Jun 02, 2024", status: "Processing", icon: "📦" },
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
      <div className="reports-container">
        <div className="page-header">
          <h1>Reports</h1>
          <p className="subtitle">Generate and view your reports</p>
        </div>

        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-icon">{report.icon}</div>
              <div className="report-info">
                <h3>{report.name}</h3>
                <p className="report-date">{report.date}</p>
                <span className={`status-badge status-${report.status.toLowerCase()}`}>{report.status}</span>
              </div>
              <button className="download-btn">⬇️</button>
            </div>
          ))}
        </div>

        <div className="new-report-section">
          <button className="new-report-btn">+ Create New Report</button>
        </div>
      </div>
    </main>
  );
}

export default Reports;
