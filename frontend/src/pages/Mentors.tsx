import { mentors } from "../data/mentors";
import MentorCard from "../components/MentorCard";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
const Mentors = () => {
  const navigate = useNavigate();
  
  return (
    <section className="all-mentors" id="all-mentors" style={{ minHeight: "100vh" }}>
      <button 
        onClick={() => navigate(-1)}
        className="go-back-button"
        aria-label="Go back to previous page"
      >
        ← Go Back
      </button>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">All Our Mentors</h2>
          <p className="section-subtitle">
            Meet all our exceptional mentors who are ready to guide you to success
          </p>
        </div>

        <div className="mentor-grid">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>

        <div className="mentor-actions" style={{ marginTop: "2rem" }}>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mentors;


