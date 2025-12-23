import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/login",
        {
          phone: email, // keeping payload key to avoid breaking backend logic
          password,
        },
        {
          withCredentials: true, // Enable sending/receiving cookies
        }
      );

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");
      setFailedAttempts(0);
      setIsLocked(false);
    } catch (err: any) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        setIsLocked(true);
        setError("Incorrect password. Please try again.");
      } else {
        setError("Incorrect password. Please try again.");
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
            <h2>Welcome Back</h2>
            <p>
              Log in to continue your mentorship journey
            </p>
          </div>

          <div className="contact-form">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  {error}
                </p>
              )}

              {isLocked && (
                <div
                  style={{
                    marginTop: "-4px",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--primary-blue)",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || isLocked}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p style={{ marginTop: "20px", textAlign: "center", color: "var(--gray)" }}>
              Don't have an account? <Link to="/signup" style={{ color: "var(--primary-blue)", fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
