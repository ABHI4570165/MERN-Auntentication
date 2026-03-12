import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const homeStyles = `
  .home-root {
    min-height: 100vh;
    background: #0a0a12;
    background-image:
      radial-gradient(ellipse 70% 55% at 15% 10%, rgba(99, 82, 255, 0.13) 0%, transparent 65%),
      radial-gradient(ellipse 55% 50% at 85% 85%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(99, 82, 255, 0.04) 0%, transparent 70%);
    position: relative;
    overflow: hidden;
  }

  .home-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .home-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .home-orb-1 {
    width: 500px;
    height: 500px;
    background: rgba(99, 82, 255, 0.07);
    top: -120px;
    left: -100px;
    animation: drift1 18s ease-in-out infinite;
  }

  .home-orb-2 {
    width: 400px;
    height: 400px;
    background: rgba(56, 189, 248, 0.05);
    bottom: -80px;
    right: -80px;
    animation: drift2 22s ease-in-out infinite;
  }

  .home-orb-3 {
    width: 300px;
    height: 300px;
    background: rgba(168, 155, 255, 0.04);
    top: 40%;
    left: 55%;
    animation: drift1 16s ease-in-out infinite 4s;
  }

  @keyframes drift1 {
    0%, 100% { transform: translate(0, 0); }
    33%       { transform: translate(30px, -20px); }
    66%       { transform: translate(-15px, 25px); }
  }

  @keyframes drift2 {
    0%, 100% { transform: translate(0, 0); }
    33%       { transform: translate(-20px, 15px); }
    66%       { transform: translate(25px, -30px); }
  }

  .home-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
`;

const Home = () => {
  return (
    <>
      <style>{homeStyles}</style>
      <div className="home-root">
        <div className="home-orb home-orb-1" />
        <div className="home-orb home-orb-2" />
        <div className="home-orb home-orb-3" />
        <div className="home-content">
          <Navbar />
          <Header />
        </div>
      </div>
    </>
  )
}

export default Home