import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        phone,
        password,
      });

      alert(res.data.message || "Signup successful 🎉");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh" }}>
      <div className="section-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Join Shreyas Academy</h2>
            <p>
              Create your student account to unlock elite NEET mentorship,
              personalized study plans, and direct guidance from toppers.
            </p>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
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
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

