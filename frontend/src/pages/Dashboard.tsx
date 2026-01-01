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
        <div className="dashboard-header">
          <h1>Welcome to Shreyas Academy 🎓</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {/* Student Info */}
        <div className="dashboard-card">
          <h2>Hello {user.name || "Student"}</h2>
          <p>Roll No: {user.rollNumber || "Not assigned"}</p>
          <p>Course: {user.courseName || "Not enrolled"}</p>
          <p>Plan: {user.plan || "Not selected"}</p>
        </div>

        {/* Mentor */}
        <div className="dashboard-card">
          <h2>Mentor</h2>
          <p>{user.mentorName || "Not assigned"}</p>
          <p>{user.mentorContactNumber || "Not available"}</p>
        </div>

        {/* Marks */}
        <div className="dashboard-card">
          <h2>Recent Test Marks</h2>
          <p>Biology: {biology}/360</p>
          <p>Physics: {physics}/180</p>
          <p>Chemistry: {chemistry}/180</p>
          <h3>Total: {total}/720</h3>
        </div>

        {/* Weekly History */}
      {/* Weekly History */}
{/* Weekly History Table */}
<div className="dashboard-card">
  <h2>Weekly Tests History</h2>
  <div className="table-wrapper">
    <table className="weekly-table">
      <thead>
        <tr>
          <th>Week</th>
          <th>Biology</th>
          <th>Physics</th>
          <th>Chemistry</th>
          <th>Total</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        {user.weeklyMarks && user.weeklyMarks.length > 0 ? (
          user.weeklyMarks.map((w, index) => (
            <tr key={index}>
              <td>Week {w.week}</td>
              <td>{w.biologyMarks}/360</td>
              <td>{w.physicsMarks}/180</td>
              <td>{w.chemistryMarks}/180</td>
              <td className="bold-text">{w.totalMarks}/720</td>
              <td className="rank-cell">{w.rank || "N/A"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
              No test history found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

        {/* Logout Button */}
        <div className="dashboard-header">
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
