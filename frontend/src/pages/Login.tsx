import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/api';
import './login.css';

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
    <div className="login-page">
      <button onClick={handleGoHome} className="go-home-btn">
        ← Go Back
      </button>

      <div className="login-container">
        {/* LEFT SIDE: Branding Section */}
        <div className="login-branding">
          <h1 className="branding-title">Welcome Back</h1>
          <p className="branding-subtitle">
            Log in to your Shreyas Academy account to track your NEET performance, 
            connect with your mentor, and view your weekly test results.
          </p>
        </div>

        {/* RIGHT SIDE: White Form Card */}
        <div className="login-card">
          <h2 className="form-title">Login</h2>
          <div className="login-form">
            {error && <div className="error-alert">{error}</div>}
            
            <div className="input-group">
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

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={isLoading} 
              className="login-submit-btn"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Support contacts moved inside the white card for a clean look */}
          <div className="login-support-box">
            <p className="support-title">Forgot Password?</p>
            <div className="contact-numbers">
              <div className="contact-row">
                <span>Admin:</span>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>
            <Link to="/signup" className="signup-link">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;