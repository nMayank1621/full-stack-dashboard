import './Cards.css';

function DashboardCard(props) {
    let icon = props.icon;
    let title = props.title;
    let value = props.value;
    let subtitle = props.subtitle;
    let progressColor = props.progressColor;
    let progressValue = props.progressValue;
    let onClick = props.onClick;

    return (
        <div className="dashboard-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="card-content">
                <div className="card-icon" style={{ backgroundColor: progressColor + '30' }}>
                    <span style={{ color: progressColor }}>{icon}</span>
                </div>
                <div className="card-info">
                    <h3 className="card-title">{title}</h3>
                    <div className="card-value-section">
                        <p className="card-subtitle">{subtitle}</p>
                        <p className="card-value">{value}</p>
                    </div>
                </div>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: progressValue + '%', backgroundColor: progressColor }}></div>
            </div>
        </div>
    );
}

export default DashboardCard;
