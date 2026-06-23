import './Sidebar.css';

function Sidebar(props) {
    let isSidebarOpen = props.isSidebarOpen;
    let onNavigateToPage = props.onNavigateToPage;
    let currentPage = props.currentPage;

    function handleDashboardClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('dashboard');
    }

    function handleAnalyticsClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('analytics');
    }

    function handleReportsClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('reports');
    }

    function handleUsersClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('users');
    }

    function handleSettingsClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('settings');
    }

    function handleAIToolsClick(e) {
        e.preventDefault();
        if (onNavigateToPage) onNavigateToPage('aitools');
    }

    return (
        <div className={"sidebar " + (isSidebarOpen ? "open" : "closed")}>
            <ul className="sidebar-nav">
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'dashboard' ? "active" : ""}
                        onClick={handleDashboardClick}
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'analytics' ? "active" : ""}
                        onClick={handleAnalyticsClick}
                    >
                        Analytics
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'reports' ? "active" : ""}
                        onClick={handleReportsClick}
                    >
                        Reports
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'users' ? "active" : ""}
                        onClick={handleUsersClick}
                    >
                        Users
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'aitools' ? "active" : ""}
                        onClick={handleAIToolsClick}
                    >
                        AI Tools
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={currentPage === 'settings' ? "active" : ""}
                        onClick={handleSettingsClick}
                    >
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
