import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const verifyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Sora:wght@400;600&display=swap');

  .verify-root {
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

  .verify-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .verify-logo {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    width: 7rem;
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .verify-logo:hover { opacity: 1; }

  .verify-card {
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

  .verify-icon-wrap {
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

  .verify-icon-wrap svg {
    width: 22px;
    height: 22px;
    color: #a89bff;
  }

  .verify-eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6352ff;
    margin-bottom: 0.4rem;
  }

  .verify-title {
    font-family: 'Sora', sans-serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: #f0f0f8;
    margin-bottom: 0.35rem;
    line-height: 1.2;
  }

  .verify-subtitle {
    font-size: 0.875rem;
    color: rgba(160, 160, 192, 0.65);
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .verify-otp-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .verify-otp-input {
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

  .verify-otp-input:focus {
    border-color: rgba(99, 82, 255, 0.6);
    background: rgba(99, 82, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99, 82, 255, 0.2);
  }

  .verify-btn {
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
  }

  .verify-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .verify-btn:active { transform: translateY(0); }
`;

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(input => input.value);
      const otp = otpArray.join('');

      if (otp.length < 6) {
        return toast.error('Please enter the full 6-digit code');
      }

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message || 'Email verified successfully');
        await getUserData();
        navigate('/');
      } else {
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <>
      <style>{verifyStyles}</style>
      <div className="verify-root">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
          className="verify-logo"
        />

        <form onSubmit={handleSubmit} className="verify-card">
          <div className="verify-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>

          <p className="verify-eyebrow">Verification</p>
          <h1 className="verify-title">Check your inbox</h1>
          <p className="verify-subtitle">
            We sent a 6-digit code to your email address. Enter it below to verify your account.
          </p>

          <div className="verify-otp-row" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="verify-otp-input"
                ref={el => inputRefs.current[index] = el}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button type="submit" className="verify-btn">
            Verify email
          </button>
        </form>
      </div>
    </>
  )
}

export default EmailVerify;