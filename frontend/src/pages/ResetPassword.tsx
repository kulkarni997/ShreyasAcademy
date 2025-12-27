import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/reset-password/${token}`, {
        password,
      });
      alert("Password reset successful!");
      navigate("/login");
    } catch {
      setError("Invalid or expired reset link");
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh" }}>
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
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              {error && <p style={{ color: "#ef4444" }}>{error}</p>}

              <button className="btn btn-primary">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
