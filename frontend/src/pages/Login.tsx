import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Make login request with credentials enabled (for cookies)
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          phone,
          password,
        },
        {
          withCredentials: true, // Enable sending/receiving cookies
        }
      );

      alert(res.data.message || "Login successful 🎉");
      // TODO: Handle login success, e.g., redirect or set auth state
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
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
                <label>Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <p style={{ color: "red", marginBottom: "10px" }}>
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
