import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const resetStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Sora:wght@400;600&display=swap');

  .reset-root {
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
  }

  .reset-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .reset-logo {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    width: 7rem;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .reset-logo:hover { opacity: 1; }

  .reset-card {
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

  .reset-step-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 1.75rem;
  }

  .reset-step-dot {
    height: 3px;
    flex: 1;
    border-radius: 99px;
    background: rgba(255,255,255,0.1);
    transition: background 0.3s;
  }

  .reset-step-dot.active {
    background: #6352ff;
  }

  .reset-step-dot.done {
    background: rgba(99, 82, 255, 0.4);
  }

  .reset-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(99, 82, 255, 0.15);
    border: 1px solid rgba(99, 82, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
  }

  .reset-icon-wrap svg {
    width: 22px;
    height: 22px;
    color: #a89bff;
  }

  .reset-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6352ff;
    margin-bottom: 0.4rem;
  }

  .reset-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #f0f0f8;
    margin-bottom: 0.35rem;
    line-height: 1.2;
  }

  .reset-subtitle {
    font-size: 0.875rem;
    color: rgba(160, 160, 192, 0.65);
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .reset-field {
    position: relative;
    margin-bottom: 1rem;
  }

  .reset-field-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    opacity: 0.4;
  }

  .reset-input {
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

  .reset-input::placeholder { color: rgba(160, 160, 192, 0.35); }
  .reset-input:focus {
    border-color: rgba(99, 82, 255, 0.5);
    background: rgba(99, 82, 255, 0.07);
  }

  .reset-otp-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .reset-otp-input {
    width: 48px;
    height: 52px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #e8e8f0;
    font-family: 'Sora', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    outline: none;
    transition: border-color 0.2s, background 0.2s, transform 0.1s;
    caret-color: #a89bff;
  }

  .reset-otp-input:focus {
    border-color: rgba(99, 82, 255, 0.6);
    background: rgba(99, 82, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99, 82, 255, 0.2);
  }

  .reset-btn {
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
    letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(99, 82, 255, 0.3);
    margin-top: 0.5rem;
  }

  .reset-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .reset-btn:active { transform: translateY(0); }
`;

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
  const [otp, setOtp] = useState('')
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('').slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });
  };

  const onSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(backendUrl + '/api/auth/sent-reset-otp', { email });
      data.success && setIsEmailSubmitted(true)
      toast[data?.success ? 'success' : 'error'](data?.message || 'Something went wrong')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  const onSubmitOtp = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      setOtp(otpArray.join(''))
      setIsOtpSubmitted(true)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  const onSubmitNewPassword = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
      data.success && toast.success(data.message || 'Password reset successfully')
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  const currentStep = !isEmailSubmitted ? 0 : !isOtpSubmitted ? 1 : 2;

  return (
    <>
      <style>{resetStyles}</style>
      <div className="reset-root">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
          className="reset-logo"
        />

        {/* Step 1 — Email */}
        {!isEmailSubmitted && (
          <form onSubmit={onSubmitEmail} className="reset-card">
            <div className="reset-step-bar">
              <div className="reset-step-dot active" />
              <div className="reset-step-dot" />
              <div className="reset-step-dot" />
            </div>

            <div className="reset-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>

            <p className="reset-eyebrow">Step 1 of 3</p>
            <h1 className="reset-title">Reset password</h1>
            <p className="reset-subtitle">
              Enter the email address linked to your account and we'll send a reset code.
            </p>

            <div className="reset-field">
              <img src={assets.mail_icon} alt="" className="reset-field-icon" />
              <input
                type="email"
                placeholder="Email address"
                className="reset-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="reset-btn">
              Send reset code
            </button>
          </form>
        )}

        {/* Step 2 — OTP */}
        {isEmailSubmitted && !isOtpSubmitted && (
          <form onSubmit={onSubmitOtp} className="reset-card">
            <div className="reset-step-bar">
              <div className="reset-step-dot done" />
              <div className="reset-step-dot active" />
              <div className="reset-step-dot" />
            </div>

            <div className="reset-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>

            <p className="reset-eyebrow">Step 2 of 3</p>
            <h1 className="reset-title">Enter the code</h1>
            <p className="reset-subtitle">
              A 6-digit code was sent to <strong style={{ color: '#a89bff', fontWeight: 500 }}>{email}</strong>. Enter it below.
            </p>

            <div className="reset-otp-row" onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="reset-otp-input"
                  ref={el => inputRefs.current[index] = el}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button type="submit" className="reset-btn">
              Verify code
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {isEmailSubmitted && isOtpSubmitted && (
          <form onSubmit={onSubmitNewPassword} className="reset-card">
            <div className="reset-step-bar">
              <div className="reset-step-dot done" />
              <div className="reset-step-dot done" />
              <div className="reset-step-dot active" />
            </div>

            <div className="reset-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <p className="reset-eyebrow">Step 3 of 3</p>
            <h1 className="reset-title">New password</h1>
            <p className="reset-subtitle">
              Choose a strong, unique password for your account.
            </p>

            <div className="reset-field">
              <img src={assets.lock_icon} alt="" className="reset-field-icon" />
              <input
                type="password"
                placeholder="New password"
                className="reset-input"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="reset-btn">
              Set new password
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default ResetPassword