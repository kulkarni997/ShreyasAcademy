import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const dateCards = [
    { label: "Plan Start Date", value: "April 10, 2024", variant: "start" },
    { label: "Plan Expiry Date", value: "July 10, 2024", variant: "end" },
  ];

  const subjects = [
    { name: "Biology", score: 355, total: 360, color: "teal" },
    { name: "Chemistry", score: 140, total: 180, color: "amber" },
    { name: "Physics", score: 155, total: 180, color: "blue" },
    { name: "Grand Total", score: 650, total: 720, color: "coral" },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-top">
        <div className="title-block">
          <h1 className="welcome-title">Welcome to Shreyas Academy</h1>
          <p className="hello-line">
            <span className="wave">👋</span> Hello User!
          </p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <section className="dates-grid">
          {dateCards.map((card) => (
            <article key={card.label} className={`date-card ${card.variant}`}>
              <div className="date-icon" aria-hidden>
                📅
              </div>
              <p className="label">{card.label}</p>
              <p className="value">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="mentor-section">
          <div className="mentor-bar">
            <div className="mentor-icon" aria-hidden>
              👩‍⚕️
            </div>
            <p className="mentor-name">Assigned Mentor – Srujan S</p>
          </div>
        </section>

        <section className="marks-card">
          <div className="marks-header">
            <div className="marks-icon" aria-hidden>
              📈
            </div>
            <h2>Marks Analysis — NEET</h2>
          </div>

          <div className="marks-grid">
            {subjects.map((subject) => {
              const percent = Math.min(
                100,
                Math.round((subject.score / subject.total) * 100)
              );

              return (
                <article key={subject.name} className="subject-card">
                  <div className="subject-title">
                    <p className="name">{subject.name}</p>
                    <p className="score">
                      <span className="score-value">{subject.score}</span>/
                      {subject.total}
                    </p>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar ${subject.color}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

