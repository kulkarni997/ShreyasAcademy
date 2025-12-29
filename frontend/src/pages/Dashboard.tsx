import { useEffect, useState } from "react";
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
        const response = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setStudentData(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch student data", err);
        setError(err.message || "Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
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

 const makeMeAdmin = async () => {
  try {
    const res = await fetch("http://localhost:5000/make-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: user.email }),
    });

    const data = await res.json();
    
    if (res.ok) {
      alert(data.message + " - Redirecting to Admin Dashboard...");
      // Redirect to admin dashboard after successful promotion
      window.location.href = "/admin";
    } else {
      alert(data.message || "Failed to enable admin mode");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to enable admin mode");
  }
};

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back to Shreyas Academy 🎓</h1>
          <button className="dashboard-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {user.email === "shreyasacademy2025@gmail.com" && (
  <div style={{ marginBottom: "20px" }}>
    <button
      onClick={makeMeAdmin}
      style={{
        background: "#b91c1c",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Enable Mentor Mode (Admin)
    </button>
  </div>
)}


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