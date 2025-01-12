import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../services/router';
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from '../services/constant';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    try {
      const response = await api.post("/auth/token", formData, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      console.log(response);
      if (response.data?.access_token) {
        localStorage.setItem(ACCESS_TOKEN, response.data?.access_token);
        console.log(response.data);
        toast.success("You're now log in.");
        navigate("/home")
      }
    } catch (e) {
      console.error('Error:', e.response.data?.detail);
      toast.error(e.response.data?.detail);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Welcome Back</h2>
        <p>Please enter your details to sign in</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="auth-button">Sign In</button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;