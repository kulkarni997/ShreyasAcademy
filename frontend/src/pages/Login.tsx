import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

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

      navigate("/dashboard");
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: any) {
      setError("Incorrect email or password. Please try again.");
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
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
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
