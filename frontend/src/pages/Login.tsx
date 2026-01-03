import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* Redirects to the root/home page */
  const handleGoHome = () => {
    navigate("/"); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password, 
    };

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact" style={{ 
      minHeight: "100vh", 
      position: "relative",
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
            <h2>Welcome Back</h2>
            <p>
              Log in to your Shreyas Academy account to track your NEET performance, 
              connect with your mentor, and view your weekly test results.
            </p>
          </div>

          <div className="contact-form">
            <h2 style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: "24px",
              textAlign: "center",
              color: "#0f172a"
            }}>Login</h2>
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  background: "#fff1f2",
                  color: "#e11d48",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  fontSize: "0.9rem",
                  border: "1px solid #ffe4e6",
                  fontWeight: 500,
                  textAlign: "center"
                }}>{error}</div>
              )}
              
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
                style={{ width: "100%", marginTop: "10px" }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Support contacts */}
            <div style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #f1f5f9",
              textAlign: "center"
            }}>
              <p style={{
                color: "#64748b",
                fontSize: "0.85rem",
                marginBottom: "15px",
                fontWeight: 500,
                lineHeight: 1.5
              }}>
                Forgot Password? Contact our support team to reset password.
              </p>
              <div style={{
                background: "#f8fafc",
                padding: "16px",
                borderRadius: "16px",
                marginBottom: "20px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "0.95rem",
                  alignItems: "center"
                }}>
                  <span style={{ color: "#64748b" }}>Support Team:</span>
                  <a href="tel:+919972737380" style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 700
                  }}>+91 9972737380</a>
                  <a href="tel:+918618158884" style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 700
                  }}>+91 8618158884</a>
                </div>
              </div>
              <Link to="/signup" style={{
                display: "block",
                marginTop: "15px",
                color: "#475569",
                fontSize: "0.9rem",
                textDecoration: "none",
                fontWeight: 600
              }}>
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;