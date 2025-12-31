import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoHome = () => navigate("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError("Passwords do not match");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      setSuccess("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError("Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh", position: "relative" }}>
      <button onClick={handleGoHome} style={backButtonStyle}>← Go Back</button>
      
      <div className="section-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Reset Password</h2>
            <p>Enter a new password for your account</p>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Re-using the same style
const backButtonStyle: React.CSSProperties = {
  position: 'absolute', top: '20px', right: '20px', padding: '10px 20px',
  background: 'rgba(102, 126, 234, 0.1)', color: '#667eea', border: '1px solid #667eea',
  borderRadius: '5px', cursor: 'pointer', fontWeight: '600', zIndex: 10
};

export default ResetPassword;