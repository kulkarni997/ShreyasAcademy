import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config/api'; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleGoHome = () => navigate("/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { 
        email: email.trim().toLowerCase() 
      });
      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh", position: "relative" }}>
      {/* GO BACK BUTTON */}
      <button onClick={handleGoHome} style={backButtonStyle}>← Go Back</button>
      
      <div className="section-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Forgot Password</h2>
            <p>Enter your registered email to receive a reset link</p>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {message && <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/login" style={{ color: "#667eea" }}>Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const backButtonStyle: React.CSSProperties = {
  position: 'absolute', top: '20px', right: '20px', padding: '10px 20px',
  background: 'rgba(102, 126, 234, 0.1)', color: '#667eea', border: '1px solid #667eea',
  borderRadius: '5px', cursor: 'pointer', fontWeight: '600', zIndex: 10
};

export default ForgotPassword;