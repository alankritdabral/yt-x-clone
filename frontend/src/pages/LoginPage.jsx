import { useState } from 'react'
import '../styles/LoginPage.css'

// TODO: Implement email/password validation
// TODO: Add error handling and display
// TODO: Implement "remember me" functionality
// TODO: Add password visibility toggle
// TODO: Implement forgot password link
// TODO: Add social login options (Google, GitHub, etc.)

const LoginPage = ({ setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // TODO: Send login request to /api/users/login
    // try {
    //   setLoading(true)
    //   const response = await fetch('/api/users/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   })
    //   const data = await response.json()
    //   if (data.success) {
    //     setIsLoggedIn(true)
    //     setUser(data.data.user)
    //     localStorage.setItem('token', data.data.token)
    //   } else {
    //     setError(data.message)
    //   }
    // } catch (err) {
    //   setError('Login failed. Please try again.')
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to YT-X Clone</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#forgot-password">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="social-login">
          <p>Or login with:</p>
          <button className="social-btn google-btn">Google</button>
          <button className="social-btn github-btn">GitHub</button>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <a href="#register">Sign up here</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
