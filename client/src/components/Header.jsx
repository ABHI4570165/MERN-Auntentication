import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const headerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Sora:wght@400;600;700&display=swap');

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1.5rem;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    position: relative;
  }

  .hero-avatar-wrap {
    position: relative;
    margin-bottom: 2rem;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hero-avatar-ring {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1px solid rgba(99, 82, 255, 0.3);
    animation: pulse-ring 2.5s ease-in-out infinite;
  }

  .hero-avatar-ring-outer {
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 1px solid rgba(99, 82, 255, 0.12);
    animation: pulse-ring 2.5s ease-in-out infinite 0.4s;
  }

  @keyframes pulse-ring {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.05); }
  }

  .hero-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(99, 82, 255, 0.4);
    box-shadow: 0 0 40px rgba(99, 82, 255, 0.2);
    display: block;
  }

  .hero-greeting {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: rgba(180, 175, 220, 0.8);
    font-weight: 400;
    margin-bottom: 0.75rem;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  .hero-greeting img {
    width: 22px;
    animation: wave 1.6s ease-in-out infinite;
    transform-origin: 70% 80%;
  }

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    20%       { transform: rotate(15deg); }
    40%       { transform: rotate(-8deg); }
    60%       { transform: rotate(10deg); }
    80%       { transform: rotate(-4deg); }
  }

  .hero-name {
    color: #a89bff;
    font-weight: 500;
  }

  .hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.25rem, 6vw, 3.75rem);
    font-weight: 700;
    color: #f0f0f8;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  }

  .hero-title-accent {
    background: linear-gradient(120deg, #a89bff 0%, #6db3f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.05rem;
    color: rgba(160, 160, 200, 0.65);
    max-width: 440px;
    line-height: 1.65;
    margin-bottom: 2.25rem;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
  }

  .hero-cta-group {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
  }

  .hero-btn-primary {
    padding: 0.75rem 2rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #6352ff 0%, #4f3de8 100%);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(99, 82, 255, 0.4);
    letter-spacing: 0.01em;
  }

  .hero-btn-primary:hover {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(99, 82, 255, 0.45);
  }

  .hero-btn-primary:active { transform: translateY(0); }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    background: rgba(99, 82, 255, 0.1);
    border: 1px solid rgba(99, 82, 255, 0.25);
    font-size: 0.78rem;
    color: rgba(168, 155, 255, 0.85);
    margin-bottom: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hero-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6352ff;
    box-shadow: 0 0 6px #6352ff;
    animation: blink 1.8s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .hero-features {
    display: flex;
    gap: 1.5rem;
    margin-top: 3.5rem;
    animation: fadeSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-feature-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: rgba(160, 160, 200, 0.5);
  }

  .hero-feature-check {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(99, 82, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .hero-feature-check svg {
    width: 9px;
    height: 9px;
    color: #a89bff;
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const Header = () => {
  const navigate = useNavigate()
  const { userData } = useContext(AppContext)

  return (
    <>
      <style>{headerStyles}</style>
      <div className="hero">
        {/* Avatar */}
        <div className="hero-avatar-wrap">
          <div className="hero-avatar-ring-outer" />
          <div className="hero-avatar-ring" />
          <img src={assets.header_img} alt="header" className="hero-avatar" />
        </div>

        {/* Live badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Secure authentication platform
        </div>

        {/* Greeting */}
        <p className="hero-greeting">
          Hey,{' '}
          <span className="hero-name">
            {userData ? userData.name : 'there'}
          </span>
          <img src={assets.hand_wave} alt="wave" />
        </p>

        {/* Title */}
        <h1 className="hero-title">
          Welcome to{' '}
          <span className="hero-title-accent">our app</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          {userData
            ? `Great to have you back! Dive in and explore everything your account has to offer.`
            : `Sign in to unlock your personalized experience. Safe, fast, and built for you.`}
        </p>

        {/* CTA */}
        <div className="hero-cta-group">
          {!userData && (
            <button
              className="hero-btn-primary"
              onClick={() => navigate('/login')}
            >
              Get started →
            </button>
          )}
        </div>

        {/* Feature hints */}
        <div className="hero-features">
          {['Secure by default', 'Email verification', 'Easy password reset'].map(f => (
            <div className="hero-feature-item" key={f}>
              <div className="hero-feature-check">
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 5l2 2 4-4"/>
                </svg>
              </div>
              {f}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Header