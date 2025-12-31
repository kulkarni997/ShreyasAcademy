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
          <h2>Marks</h2>
          <p>Biology: {biology}/360</p>
          <p>Physics: {physics}/180</p>
          <p>Chemistry: {chemistry}/180</p>
          <h3>Total: {total}/720</h3>
        </div>

        {/* Weekly History */}
      {/* Weekly History */}
<div className="dashboard-card">
  <h2>Weekly Tests</h2>
  <table className="weekly-table">
    <thead>
      <tr>
        <th>Week</th>
        <th>Bio</th>
        <th>Phy</th>
        <th>Chem</th>
        <th>Total</th>
        <th>Rank</th> {/* Added Rank Column */}
      </tr>
    </thead>
    <tbody>
      {user.weeklyMarks?.map((w, index) => (
        <tr key={index}>
          <td>Week {w.week}</td>
          <td>{w.biologyMarks}</td>
          <td>{w.physicsMarks}</td>
          <td>{w.chemistryMarks}</td>
          <td>{w.totalMarks}</td>
          <td>{w.rank || "N/A"}</td> {/* Display the rank */}
        </tr>
      )) || (
        <tr><td colSpan={6}>No tests yet</td></tr>
      )}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
