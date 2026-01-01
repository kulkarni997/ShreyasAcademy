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
  <div className="login-page">
    <button onClick={handleGoHome} className="go-home-btn">
      ← Go Back
    </button>

    <div className="login-card">
      <h2 className="login-title">Shreyas Academy</h2>
      
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-alert">{error}</div>}
        
        <div className="input-group">
          <label>Email</label>
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

        <button type="submit" disabled={isLoading} className="login-submit-btn">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="login-support-box">
        <p className="support-title">Having trouble logging in?</p>
        <div className="contact-numbers">
          <div className="contact-row">
            <span>Admin:</span>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </div>
          <div className="contact-row">
            <span>Support:</span>
            <a href="tel:+919876543211">+91 98765 43211</a>
          </div>
        </div>
        <p className="support-note">
          Call us to verify your identity and manually reset your password.
        </p>
        <Link to="/signup" className="signup-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  </div>
);
};
export default Login;