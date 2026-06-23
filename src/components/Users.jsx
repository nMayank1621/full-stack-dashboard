import './Users.css';

function Users(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Editor", status: "Active" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", role: "Viewer", status: "Active" },
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
      <div className="users-container">
        <div className="page-header">
          <h1>Users</h1>
          <p className="subtitle">Manage your team members</p>
        </div>

        <div className="users-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p className="user-email">{user.email}</p>
              </div>
              <span className="user-role">{user.role}</span>
              <span className={`user-status status-${user.status.toLowerCase()}`}>{user.status}</span>
            </div>
          ))}
        </div>

        <div className="add-user-section">
          <button className="add-user-btn">+ Add New User</button>
        </div>
      </div>
    </main>
  );
}

export default Users;
