import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const loginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Sora:wght@400;600&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: #0a0a12;
    background-image:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99, 82, 255, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba(56, 189, 248, 0.08) 0%, transparent 60%);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .auth-logo {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    width: 7rem;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .auth-logo:hover { opacity: 1; }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 2.5rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 80px rgba(0,0,0,0.5);
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6352ff;
    margin-bottom: 0.5rem;
  }

  .auth-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: #f0f0f8;
    margin-bottom: 0.35rem;
    line-height: 1.2;
  }

  .auth-subtitle {
    font-size: 0.875rem;
    color: rgba(160, 160, 192, 0.7);
    margin-bottom: 2rem;
  }

  .auth-tabs {
    display: flex;
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 1.75rem;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .auth-tab {
    flex: 1;
    padding: 0.5rem;
    border-radius: 7px;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(160, 160, 192, 0.6);
    cursor: pointer;
    transition: all 0.2s;
  }

  .auth-tab.active {
    background: rgba(99, 82, 255, 0.25);
    color: #a89bff;
    font-weight: 500;
    border: 1px solid rgba(99, 82, 255, 0.3);
  }

  .auth-field {
    position: relative;
    margin-bottom: 1rem;
  }

  .auth-field-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    opacity: 0.4;
  }

  .auth-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: #e8e8f0;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s, background 0.2s;
  }

  .auth-input::placeholder { color: rgba(160, 160, 192, 0.35); }

  .auth-input:focus {
    border-color: rgba(99, 82, 255, 0.5);
    background: rgba(99, 82, 255, 0.07);
  }

  .auth-forgot {
    display: block;
    text-align: right;
    font-size: 0.8rem;
    color: #6352ff;
    cursor: pointer;
    margin-top: -0.5rem;
    margin-bottom: 1.25rem;
    text-decoration: none;
    transition: color 0.2s;
  }
  .auth-forgot:hover { color: #a89bff; }

  .auth-btn {
    width: 100%;
    padding: 0.8rem;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #6352ff 0%, #4f3de8 100%);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 0.25rem;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(99, 82, 255, 0.3);
  }

  .auth-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .auth-btn:active { transform: translateY(0); opacity: 1; }

  .auth-footer {
    text-align: center;
    font-size: 0.82rem;
    color: rgba(160, 160, 192, 0.5);
    margin-top: 1.5rem;
  }

  .auth-footer-link {
    color: #6352ff;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s;
  }
  .auth-footer-link:hover { color: #a89bff; }

  .auth-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .auth-divider::before, .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .auth-divider span {
    font-size: 0.75rem;
    color: rgba(160, 160, 192, 0.4);
    white-space: nowrap;
  }
`;

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext)

  const [state, setState] = useState('sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true

      if (state === 'sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
        if (data?.success) {
          setIsLoggedIn(true)
          getUserData()
          toast.success('Account created successfully!')
          navigate('/')
        } else {
          toast.error(data?.message || 'Something went wrong')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })
        if (data?.success) {
          setIsLoggedIn(true)
          getUserData()
          toast.success('Welcome back!')
          navigate('/')
        } else {
          toast.error(data?.message || 'Something went wrong')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  return (
    <>
      <style>{loginStyles}</style>
      <div className="auth-root">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
          className="auth-logo"
        />

        <div className="auth-card">
          <p className="auth-eyebrow">Welcome</p>
          <h1 className="auth-title">
            {state === 'sign Up' ? 'Create account' : 'Sign in'}
          </h1>
          <p className="auth-subtitle">
            {state === 'sign Up'
              ? 'Fill in your details to get started'
              : 'Enter your credentials to continue'}
          </p>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${state === 'sign Up' ? 'active' : ''}`}
              onClick={() => setState('sign Up')}
              type="button"
            >
              Sign up
            </button>
            <button
              className={`auth-tab ${state === 'Login' ? 'active' : ''}`}
              onClick={() => setState('Login')}
              type="button"
            >
              Log in
            </button>
          </div>

          <form onSubmit={onSubmitHandler}>
            {state === 'sign Up' && (
              <div className="auth-field">
                <img src={assets.person_icon} alt="" className="auth-field-icon" />
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <img src={assets.mail_icon} alt="" className="auth-field-icon" />
              <input
                className="auth-input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <img src={assets.lock_icon} alt="" className="auth-field-icon" />
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {state === 'Login' && (
              <span
                className="auth-forgot"
                onClick={() => navigate('/reset-password')}
              >
                Forgot password?
              </span>
            )}

            <button className="auth-btn" type="submit">
              {state === 'sign Up' ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="auth-footer">
            {state === 'sign Up' ? (
              <>
                Already have an account?{' '}
                <span className="auth-footer-link" onClick={() => setState('Login')}>
                  Log in
                </span>
              </>
            ) : (
              <>
                No account yet?{' '}
                <span className="auth-footer-link" onClick={() => setState('sign Up')}>
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default Login