 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

interface WeeklyMark {
  week: number;
  date: string;
  biologyMarks: number;
  physicsMarks: number;
  chemistryMarks: number;
  totalMarks: number;
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
        const response = await fetch("http://localhost:5000/profile", {
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
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  if (loading) return <div className="loading-message">Loading…</div>;
  if (error) return <div className="error-message">{error}</div>;

  const user = studentData?.user || {};

  const biology = user.biologyMarks || 0;
  const physics = user.physicsMarks || 0;
  const chemistry = user.chemistryMarks || 0;
  const total = user.totalMarks || biology + physics + chemistry;

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
              </tr>
            </thead>
            <tbody>
              {user.weeklyMarks?.map(w => (
                <tr key={w.week}>
                  <td>Week {w.week}</td>
                  <td>{w.biologyMarks}</td>
                  <td>{w.physicsMarks}</td>
                  <td>{w.chemistryMarks}</td>
                  <td>{w.totalMarks}</td>
                </tr>
              )) || (
                <tr><td colSpan={5}>No tests yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
