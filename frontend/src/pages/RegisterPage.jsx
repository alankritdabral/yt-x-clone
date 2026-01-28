// TODO: Create Register page component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateUsername } from '../utils/validators';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  // TODO: Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: Validate form data
  const validateForm = () => {
    const errors = {};
    if (!validateUsername(formData.username)) {
      errors.username = 'Username must be 3-20 characters, alphanumeric with underscores';
    }
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  // TODO: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await handleRegister(formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        {/* TODO: Add logo */}
        <h1>Create Your Account</h1>

        {/* TODO: Display error messages */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* TODO: Username input */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {validationErrors.username && <span className="error-text">{validationErrors.username}</span>}
          </div>

          {/* TODO: Full Name input */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* TODO: Email input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
          </div>

          {/* TODO: Password input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password && <span className="error-text">{validationErrors.password}</span>}
          </div>

          {/* TODO: Confirm Password input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {validationErrors.confirmPassword && <span className="error-text">{validationErrors.confirmPassword}</span>}
          </div>

          {/* TODO: Terms and conditions */}
          <div className="form-group">
            <label>
              <input type="checkbox" required /> I agree to Terms and Conditions
            </label>
          </div>

          {/* TODO: Submit button */}
          <button type="submit" disabled={loading} className="btn btn--primary">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* TODO: Link to login page */}
        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
