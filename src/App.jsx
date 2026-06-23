import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardCard from './components/cards';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import Users from './components/Users';
import Settings from './components/Settings';
import AITools from './components/AITools';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import revenueData from './data/revenueData.json';
import sourceData from './data/sourceData.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('login'); // 'dashboard', 'login', 'signup', 'forgotPassword', 'about', 'blog', 'contact', 'analytics', 'reports', 'users', 'aitools', 'settings'
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const cardsData = [
    {
      icon: "💰",
      title: "Sales",
      value: "$1.5M",
      subtitle: "Total Sales",
      progressColor: "#ff6b81",
      progressValue: 50,
    },
    {
      icon: "📦",
      title: "Orders",
      value: "25K",
      subtitle: "New Orders",
      progressColor: "#a29bfe",
      progressValue: 60,
    },
    {
      icon: "👁️",
      title: "Visitors",
      value: "999K",
      subtitle: "Visitors",
      progressColor: "#74b9ff",
      progressValue: 85,
    },
    {
      icon: "👥",
      title: "Users",
      value: "585K",
      subtitle: "New Users",
      progressColor: "#55efc4",
      progressValue: 70,
    },
  ];

  const handleSalesCardClick = () => {
    alert('Sales card clicked!');
  };

  const handleOrdersCardClick = () => {
    alert('Orders card clicked!');
  };

  const handleVisitorsCardClick = () => {
    alert('Visitors card clicked!');
  };

  const handleUsersCardClick = () => {
    alert('Users card clicked!');
  };

  // Render different pages based on currentPage
const renderPage = () => {
  switch (currentPage) {

    case 'login':
      return (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onGoToSignup={() => setCurrentPage('signup')}
          onGoToForgotPassword={() => setCurrentPage('forgotPassword')}
        />
      );

    case 'signup':
      return <Signup onGoToLogin={() => setCurrentPage('login')} />;

    case 'forgotPassword':
      return <ForgotPassword onGoToLogin={() => setCurrentPage('login')} />;

    case 'about':
      return <About toggleSidebar={toggleSidebar} />;

    case 'blog':
      return <Blog toggleSidebar={toggleSidebar} />;

    case 'contact':
      return <Contact toggleSidebar={toggleSidebar} />;

    case 'analytics':
      return <Analytics toggleSidebar={toggleSidebar} />;

    case 'reports':
      return <Reports toggleSidebar={toggleSidebar} />;

    case 'users':
      return <Users toggleSidebar={toggleSidebar} />;

    case 'settings':
      return <Settings toggleSidebar={toggleSidebar} />;

    case 'aitools':
      return <AITools toggleSidebar={toggleSidebar} />;

    case 'dashboard':
    default:
      return (
        <main className="content">
          <button
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <div className="cards-grid">
            {cardsData.map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                subtitle={card.subtitle}
                progressColor={card.progressColor}
                progressValue={card.progressValue}
                onClick={
                  index === 0 ? handleSalesCardClick :
                  index === 1 ? handleOrdersCardClick :
                  index === 2 ? handleVisitorsCardClick :
                  handleUsersCardClick
                }
              />
            ))}
          </div>

          <div className="charts-grid">
  <div className="dataCard revenueCard">
    <Line
      data={{
        labels: revenueData.map((data) => data.label),
        datasets: [
          {
            label: "Revenue",
            data: revenueData.map((data) => data.revenue),
            borderColor: "#064FF0",
            backgroundColor: "#064FF0",
            fill: true,
            tension: 0.5,
          },
          {
            label: "Cost",
            data: revenueData.map((data) => data.cost),
            borderColor: "#FF3030",
            backgroundColor: "#FF3030",
            fill: true,
            tension: 0.5,
          },
        ],
      }}
    />
  </div>

  <div className="dataCard customerCard">
    <Bar
      data={{
        labels: sourceData.map((data) => data.label),
        datasets: [
          {
            label: "Count",
            data: sourceData.map((data) => data.value),
            backgroundColor: [
              "rgba(43,63,229,0.8)",
              "rgba(250,192,19,0.8)",
              "rgba(253,135,135,0.8)",
            ],
          },
        ],
      }}
    />
  </div>

  <div className="dataCard categoryCard">
    <Doughnut
      data={{
        labels: sourceData.map((data) => data.label),
        datasets: [
          {
            label: "Count",
            data: sourceData.map((data) => data.value),
            backgroundColor: [
              "rgba(43,63,229,0.8)",
              "rgba(250,192,19,0.8)",
              "rgba(253,135,135,0.8)",
            ],
          },
        ],
      }}
    />
  </div>
</div>
        </main>
      );
  }
};
return (
  <>
    <Navbar
      isMobileMenuOpen={isMobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
      currentUser={currentUser}
      onLogout={handleLogout}
      onGoToLogin={() => setCurrentPage('login')}
      onGoToSignup={() => setCurrentPage('signup')}
      onGoToAbout={() => setCurrentPage('about')}
      onGoToBlog={() => setCurrentPage('blog')}
      onGoToContact={() => setCurrentPage('contact')}
    />

    <div className="main-layout">
      {currentUser && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onNavigateToPage={(page) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      )}

      {renderPage()}
    </div>
  </>
);
}

export default App;