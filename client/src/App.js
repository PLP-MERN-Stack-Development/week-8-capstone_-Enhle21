import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBell } from "react-icons/fa";
import splashImage from './assets/splash.png';
import { CSSTransition } from 'react-transition-group';
import AlertButton from './components/AlertButton';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    dob: '',
    cellphone: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [splashFinished, setSplashFinished] = useState(false);

  const splashRef = useRef(null);
  const mainRef = useRef(null);

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSplashFinished(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      await res.json();
      alert('Registration successful!');
      setShowForm(false);

      // Save user info to localStorage so it persists
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  return (
    <div className="app-container">
      <div className="app-frame">
        {/* Splash Image */}
        <div
          ref={splashRef}
          className={`splash-image-container ${splashFinished ? 'move-top' : ''}`}
        >
          <img src={splashImage} alt="Splash" className="splash-image" />
        </div>

        {/* Main Content */}
        <CSSTransition
          nodeRef={mainRef}
          in={!loading}
          timeout={500}
          classNames="fade"
          appear
          unmountOnExit
        >
          <div
            ref={mainRef}
            className={`main-content ${splashFinished ? 'fade-in' : 'hidden'}`}
          >
            <h1 className="app-header">
              🧿 SAFETY FOR ALL <FaBell className="bell-icon" />
            </h1>
            <div className="symbols">🧿✊🌸</div>

            {!showForm ? (
              <div className="buttons">
                <button className="btn" onClick={() => setShowForm(true)}>
                  Register
                </button>
                <AlertButton />
              </div>
            ) : (
              <form className="form" onSubmit={handleRegister}>
                <input
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
                <input
                  name="surname"
                  placeholder="Surname"
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  onChange={handleChange}
                  required
                />
                <input
                  name="cellphone"
                  placeholder="Cellphone Number"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
