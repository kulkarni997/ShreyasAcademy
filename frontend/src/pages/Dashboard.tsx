import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      // Redirect to login after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#f9fafb" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Welcome to Shreyas Academy 🎓</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#ef4444",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: "#555" }}>
        You are logged in successfully.
      </p>
    </div>
  );
};

export default Dashboard;

