import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    const remembered = localStorage.getItem('rememberMe') === 'true';
    
    if (remembered && savedUsername) {
      setFormData(prev => ({
        ...prev,
        username: savedUsername
      }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (user || token) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberMe');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData, { withCredentials: true });
      
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', formData.username);
        localStorage.setItem('rememberMe', 'true');
      }

      localStorage.setItem('accessToken', response.data.accessToken);
      setUser(true);
      window.location.href = '/';
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="image-text">
          <h2>Welcome to FlexFit</h2>
          <p>Transform your body, transform your life. Join us on your fitness journey.</p>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-box">
          <div className="brand-logo">
            <h2 
              className="cursor-pointer"
              onClick={() => navigate('/')}
            >
              FlexFit
            </h2>
          </div>
          <div className="login-header">
            <h1>Sign in to your account</h1>
            <p>Please enter your credentials to continue</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="remember-forgot">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
          
          <div className="signup-section">
            <p className="signup-text">Don't have an account?</p>
            <Link to="/register" className="signup-button">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
