import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://shreyasacademy-pd3b.onrender.com/forgot-password",
        { email: email.trim().toLowerCase() }
      );

      if (res.data.message) {
        let displayMessage = res.data.message;
        
        // In development, show the reset link if provided
        if (res.data.resetLink && import.meta.env.DEV) {
          displayMessage += `\n\nReset Link (Development):\n${res.data.resetLink}`;
        }
        
        setMessage(displayMessage);
      }
    } catch (err: any) {
      console.error("FORGOT PASSWORD FRONTEND ERROR:", err);
      
      // Handle network errors
      if (!err.response) {
        setError("Network error. Please check your connection and try again.");
        return;
      }
      
      // Handle server errors with specific messages
      if (err.response?.status === 500) {
        setError(err.response?.data?.message || "Server error. Please try again later.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh" }}>
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
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {message && (
                <div style={{ 
                  color: "green", 
                  fontWeight: 600,
                  whiteSpace: "pre-line",
                  wordBreak: "break-all",
                  padding: "10px",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  fontSize: "14px"
                }}>
                  {message}
                </div>
              )}

              {error && (
                <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
              )}

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
