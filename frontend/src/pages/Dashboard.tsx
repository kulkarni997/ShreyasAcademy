 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { API_URL } from '../config/api'; 

interface WeeklyMark {
  week: number;
  date: string;
  biologyMarks: number;
  physicsMarks: number;
  chemistryMarks: number;
  totalMarks: number;
  rank?: number | string; // 👈 Add this line to fix the red error
  plan: string;
}

interface StudentUser {
  name?: string;
  email?: string;
  phone?: string;
  rollNumber?: string;
  courseName?: string;
  courseStartDate?: string;
  courseEndDate?: string;
  mentorName?: string;
  mentorContactNumber?: string;
  plan?: string; // 👈 Add this so user.plan doesn't cause errors

  biologyMarks?: number;
  physicsMarks?: number;
  chemistryMarks?: number;
  totalMarks?: number;

  weeklyMarks?: WeeklyMark[];
}

interface StudentData {
  user?: StudentUser;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${API_URL}/profile`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setStudentData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  if (loading) return <div className="loading-message">Loading…</div>;
  if (error) return <div className="error-message">{error}</div>;

  const user = studentData?.user || {};

// Get the latest test from the weeklyMarks array
const latestTest = user.weeklyMarks && user.weeklyMarks.length > 0 
  ? user.weeklyMarks[user.weeklyMarks.length - 1] 
  : null;

const biology = latestTest?.biologyMarks || 0;
const physics = latestTest?.physicsMarks || 0;
const chemistry = latestTest?.chemistryMarks || 0;
const total = latestTest?.totalMarks || 0;
return (
  <div className="dashboard-page">
    <div className="dashboard-container">
      {/* Header with Styled Title and Logout */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Shreyas Academy 🎓</h1>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Section: Replaces the bland Student Info card */}
      <div className="student-profile-section">
  <div className="profile-info-block">
    <span className="label-text">Student Name</span>
    <span className="value-text">{user.name || "Student"}</span>
  </div>
  <div className="profile-info-block">
    <span className="label-text">Roll Number</span>
    <span className="value-text">{user.rollNumber || "N/A"}</span>
  </div>
  <div className="profile-info-block">
    <span className="label-text">Assigned Mentor</span>
    <span className="value-text">{user.mentorName || "Assigning..."}</span>
  </div>
  {/* NEW CONTACT BLOCK */}
  <div className="profile-info-block">
    <span className="label-text">Mentor Contact</span>
    <span className="value-text">
      {user.mentorContactNumber ? (
        <a href={`tel:${user.mentorContactNumber}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {user.mentorContactNumber}
        </a>
      ) : (
        "Not available"
      )}
    </span>
  </div>
</div>

      {/* Marks Analysis Cards */}
      <div className="marks-grid">
        <h3>Recent Weekly Performance</h3>
        <div className="mark-item">
          <span className="mark-label">Biology</span>
          <div className="mark-value">{biology}/360</div>
        </div>
        <div className="mark-item">
          <span className="mark-icon">⚛️</span>
          <span className="mark-label">Physics</span>
          <div className="mark-value">{physics}/180</div>
        </div>
        <div className="mark-item">
          <span className="mark-label">Chemistry</span>
          <div className="mark-value">{chemistry}/180</div>
        </div>
        <div className="mark-item mark-total">
          <span className="mark-label">Overall Total</span>
          <div className="mark-value">{total}/720</div>
        </div>
      </div>

      {/* Weekly History Table */}
      <div className="dashboard-card">
        <h2 className="section-heading">Weekly Performance History</h2>
        <div className="table-wrapper">
          <table className="weekly-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Biology</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Total Score</th>
                <th>Global Rank</th>
              </tr>
            </thead>
            <tbody>
              {user.weeklyMarks && user.weeklyMarks.length > 0 ? (
                user.weeklyMarks.map((w, index) => (
  <tr key={index}>
    {/* No label needed for the first cell as it acts as a header */}
    <td className="bold-text">Week {w.week}</td>
    
    <td data-label="Biology">
      <span className="subject-badge badge-bio">{w.biologyMarks}/360</span>
    </td>
    
    <td data-label="Physics">
      <span className="subject-badge badge-phy">{w.physicsMarks}/180</span>
    </td>
    
    <td data-label="Chemistry">
      <span className="subject-badge badge-chem">{w.chemistryMarks}/180</span>
    </td>
    
    <td data-label="Total Score" className="bold-text">
      {w.totalMarks}/720
    </td>
    
    <td data-label="Global Rank" className="rank-cell">
      {w.rank === 1 ? "🏆 1" : w.rank || "N/A"}
    </td>
  </tr>
))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "40px" }}>
                    No test history found. Your performance metrics will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
};

export default Dashboard;
