import { Link } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../services/router';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", username: "" });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validator = (field, value) => {
    let errorMessage = "";

    if (field === "password") {
      if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters long.";
      } else if (!/[a-z]/.test(value)) {
        errorMessage = "Password must contain at least one lowercase letter.";
      } else if (!/[A-Z]/.test(value)) {
        errorMessage = "Password must contain at least one uppercase letter.";
      } else if (!/[0-9]/.test(value)) {
        errorMessage = "Password must contain at least one number.";
      } else if (!/[!@#$%^&*]/.test(value)) {
        errorMessage = "Password must contain at least one special character.";
      }
    } else if (field === "confirmPassword") {
      if (value !== formData.password) {
        errorMessage = "Passwords do not match.";
      }

    } else if (field === "email") {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    try {
      const response = await api.post("/auth/signup", userData, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      console.log(response?.data?.message);
      toast.success(response?.data?.message || "Account created successfully! You can now log in.");
      navigate("/")
    } catch (e) {
      console.error('Error:', e.response.data?.detail);
      toast.error(e.response.data?.detail);
    }
  };

  const isFormValid = () => {
    return !errors.email && !errors.password && !errors.confirmPassword && formData.email && formData.password && formData.confirmPassword;
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Create Account</h2>
        <p>Please fill in your details to create an account</p>

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
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, email: value });
                validator("email", value);
              }}
              required
            />
            {errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, password: value });
                validator("password", value);
              }}
              required
            />
            {errors.password && <p style={{ color: "red", fontSize: "12px" }}>{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, confirmPassword: value });
                validator("confirmPassword", value);
              }}
              required
            />
            {errors.confirmPassword && <p style={{ color: "red", fontSize: "12px" }}>{errors.confirmPassword}</p>}

          </div>

          <button type="submit"
            className="auth-button"
            disabled={!isFormValid()}>
            Create Account
          </button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;