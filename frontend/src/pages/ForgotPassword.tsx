import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/forgot-password", {
        email,
      });

      setMessage(res.data.message);
    } catch {
      setMessage("Something went wrong. Try again.");
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
                <p style={{ color: "#22c55e", fontWeight: 600 }}>{message}</p>
              )}

              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p style={{ marginTop: "20px", textAlign: "center" }}>
              <Link to="/login" style={{ color: "var(--primary-blue)" }}>
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
