import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

interface StudentData {
  user?: {
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
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile",
          { withCredentials: true }
        );
        setStudentData(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch student data", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

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

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="loading-message">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  const user = studentData?.user || {};
  const studentFullName = user.name || "Student";
  const rollNumber = user.rollNumber || "Not assigned";
  const courseName = user.courseName || "Not enrolled";
  const courseStartDate = user.courseStartDate || "Not set";
  const courseEndDate = user.courseEndDate || "Not set";
  const mentorName = user.mentorName || "Not assigned";
  const mentorContactNumber = user.mentorContactNumber || "Not available";
  const biologyMarks = user.biologyMarks ?? 0;
  const physicsMarks = user.physicsMarks ?? 0;
  const chemistryMarks = user.chemistryMarks ?? 0;
  const totalMarks = user.totalMarks ?? biologyMarks + physicsMarks + chemistryMarks;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome to Shreyas Academy 🎓</h1>
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Student Details Section */}
        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2 className="section-heading">Student Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-greeting">Hello {studentFullName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Roll Number:</span>
                <span className="info-value">{rollNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2 className="section-heading">Course Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Enrolled Course:</span>
                <span className="info-value">{courseName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Course Start Date:</span>
                <span className="info-value">{courseStartDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Course End Date:</span>
                <span className="info-value">{courseEndDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Details Section */}
        <div className="dashboard-section">
          <div className="dashboard-card">
            <h2 className="section-heading">Mentor Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Assigned Mentor:</span>
                <span className="info-value">{mentorName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Contact Number:</span>
                <span className="info-value">{mentorContactNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Marks Analysis Section */}
        <div className="dashboard-section">
          <div className="dashboard-card marks-card">
            <h2 className="section-heading marks-heading">Marks Analysis – NEET</h2>
            <div className="marks-grid">
              <div className="mark-item">
                <div className="mark-label">Biology</div>
                <div className="mark-value">{biologyMarks} / 360</div>
              </div>
              <div className="mark-item">
                <div className="mark-label">Physics</div>
                <div className="mark-value">{physicsMarks} / 180</div>
              </div>
              <div className="mark-item">
                <div className="mark-label">Chemistry</div>
                <div className="mark-value">{chemistryMarks} / 180</div>
              </div>
              <div className="mark-item mark-total">
                <div className="mark-label">Grand Total</div>
                <div className="mark-value">{totalMarks} / 720</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
