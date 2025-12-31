import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import axios from "axios";
import { API_URL } from '../config/api';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /* Redirects to the home page */
  const handleGoHome = () => {
    navigate("/"); 
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!firstName.trim() || firstName.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters.";
    }

    if (!lastName.trim() || lastName.trim().length < 2) {
      errs.lastName = "Last name must be at least 2 characters.";
    }

    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errs.phone = "Phone number must be 10 digits.";
    }

    if (!password || password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    const name = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const res = await axios.post(`${API_URL}/signup`, {
        name,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
      });

      const message = res.data.message || "Signup successful 🎉";
      alert(message);
      // Redirect to login after successful signup
      navigate("/login"); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ 
      minHeight: "100vh", 
      position: "relative", // Required for absolute positioning
      display: "flex",
      alignItems: "center"
    }}>
      
      {/* GO BACK BUTTON */}
      <button 
        onClick={handleGoHome}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: 'rgba(102, 126, 234, 0.1)',
          color: 'white',
          border: '1px solid white',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#667eea';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
          e.currentTarget.style.color = '#667eea';
        }}
      >
        ← Go Back
      </button>

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
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {fieldErrors.firstName && (
                  <span className="error-message" style={{ color: "red", fontSize: "12px" }}>{fieldErrors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {fieldErrors.lastName && (
                  <span className="error-message" style={{ color: "red", fontSize: "12px" }}>{fieldErrors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {fieldErrors.email && (
                  <span className="error-message" style={{ color: "red", fontSize: "12px" }}>{fieldErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {fieldErrors.phone && (
                  <span className="error-message" style={{ color: "red", fontSize: "12px" }}>{fieldErrors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {fieldErrors.password && (
                  <span className="error-message" style={{ color: "red", fontSize: "12px" }}>{fieldErrors.password}</span>
                )}
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
                style={{ width: "100%", marginTop: "10px" }}
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