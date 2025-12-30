import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/api'; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Trim email but DON'T trim password (in case it has intentional spaces)
    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password, // Keep password as-is
    };

    console.log('🔵 Frontend: Sending login data');
    console.log('Email:', loginData.email);
    console.log('Password length:', loginData.password.length);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      console.log('📡 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (response.ok) {
        console.log('✅ Login successful! Role:', data.role);

         window.location.href = data.role === 'admin' ? '/admin' : '/dashboard';
        
        // Small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Redirect based on role
        if (data.role === 'admin') {
          console.log('🎯 Redirecting to /admin');
          navigate('/admin', { replace: true });
        } else {
          console.log('🎯 Redirecting to /dashboard');
          navigate('/dashboard', { replace: true });
        }
      } else {
        console.log('❌ Login failed:', data.message);
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Network error. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Login to Shreyas Academy
        </h2>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: '12px',
              marginBottom: '20px',
              background: '#fee',
              color: '#c33',
              borderRadius: '5px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              background: isLoading ? '#999' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <Link to="/forgot-password" style={{ color: '#667eea', textDecoration: 'none' }}>
            Forgot Password?
          </Link>
          <Link to="/signup" style={{ color: '#667eea', textDecoration: 'none' }}>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;