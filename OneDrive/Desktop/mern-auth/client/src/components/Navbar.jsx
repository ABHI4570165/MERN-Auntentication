import React, { useState, useEffect, useRef, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Sora:wght@400;600&display=swap');

  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2.5rem;
    background: rgba(10, 10, 18, 0.6);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-family: 'DM Sans', sans-serif;
  }

  .navbar-logo {
    width: 7rem;
    cursor: pointer;
    opacity: 0.92;
    transition: opacity 0.2s;
  }
  .navbar-logo:hover { opacity: 1; }

  .navbar-login-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(220, 220, 240, 0.85);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .navbar-login-btn:hover {
    background: rgba(99, 82, 255, 0.15);
    border-color: rgba(99, 82, 255, 0.4);
    color: #c4b8ff;
  }
  .navbar-login-btn img {
    width: 14px;
    opacity: 0.6;
    filter: invert(1);
  }

  .navbar-avatar-wrap { position: relative; }

  .navbar-avatar-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6352ff, #4f3de8);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 500;
    box-shadow: 0 0 0 2px rgba(99, 82, 255, 0.35);
    transition: box-shadow 0.2s, transform 0.15s;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    user-select: none;
  }
  .navbar-avatar-circle:hover {
    box-shadow: 0 0 0 3px rgba(99, 82, 255, 0.55);
    transform: scale(1.05);
  }
  .navbar-avatar-circle.open {
    box-shadow: 0 0 0 3px rgba(99, 82, 255, 0.65);
    transform: scale(1.05);
  }

  .navbar-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    min-width: 185px;
    background: rgba(14, 14, 24, 0.97);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 14px;
    padding: 6px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,82,255,0.08) inset;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 100;
    transform-origin: top right;
    animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes dropIn {
    from { opacity: 0; transform: scale(0.93) translateY(-8px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }

  .navbar-dropdown-header {
    padding: 0.5rem 0.75rem 0.65rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 5px;
  }
  .navbar-dropdown-label {
    font-size: 0.72rem;
    color: rgba(160,160,192,0.45);
    margin: 0 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-family: 'DM Sans', sans-serif;
  }
  .navbar-dropdown-name {
    font-size: 0.88rem;
    color: #e0e0f0;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 155px;
    margin: 0;
  }

  .navbar-dropdown-list { margin: 0; padding: 0; list-style: none; }

  .navbar-dropdown-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0.52rem 0.75rem;
    border-radius: 9px;
    font-size: 0.83rem;
    color: rgba(200, 200, 220, 0.75);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .navbar-dropdown-item:hover {
    background: rgba(99, 82, 255, 0.16);
    color: #c4b8ff;
  }
  .navbar-dropdown-item.danger { color: rgba(244, 118, 118, 0.7); }
  .navbar-dropdown-item.danger:hover {
    background: rgba(220, 60, 60, 0.13);
    color: #f47676;
  }

  .navbar-verify-dot {
    display: inline-block;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #f0a842;
    box-shadow: 0 0 5px rgba(240,168,66,0.6);
    margin-left: auto;
    flex-shrink: 0;
  }
`

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const avatarRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const sendVerificationEmail = async () => {
    setDropdownOpen(false)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data?.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data?.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  const logout = async () => {
    setDropdownOpen(false)
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        setUserData(false)
        setIsLoggedIn(false)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  return (
    <>
      <style>{navStyles}</style>
      <nav className="navbar">
        <img
          src={assets.logo}
          alt="logo"
          className="navbar-logo"
          onClick={() => navigate('/')}
        />

        {userData ? (
          <div className="navbar-avatar-wrap" ref={avatarRef}>
            <div
              className={`navbar-avatar-circle${dropdownOpen ? ' open' : ''}`}
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              {userData.name[0].toUpperCase()}
            </div>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                <div className="navbar-dropdown-header">
                  <p className="navbar-dropdown-label">Signed in as</p>
                  <p className="navbar-dropdown-name">{userData.name}</p>
                </div>
                <ul className="navbar-dropdown-list">
                  {!userData.isAccountVerified && (
                    <li className="navbar-dropdown-item" onClick={sendVerificationEmail}>
                      Verify email
                      <span className="navbar-verify-dot" />
                    </li>
                  )}
                  <li className="navbar-dropdown-item danger" onClick={logout}>
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="navbar-login-btn"
            onClick={() => navigate('/login')}
          >
            Log in
            <img src={assets.arrow_icon} alt="arrow" />
          </button>
        )}
      </nav>
    </>
  )
}

export default Navbar