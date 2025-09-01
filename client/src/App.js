<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBell } from "react-icons/fa";
import splashImage from './assets/splash.png';
import { CSSTransition } from 'react-transition-group';

const API = process.env.REACT_APP_API_URL;
=======

// src/App.js
import React, { useState } from 'react';
import './App.css';
import AlertButton from './components/AlertButton';
import { FaBell } from "react-icons/fa";
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466

function App() {
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    dob: '',
    cellphone: '',
    email: ''
  });
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [splashFinished, setSplashFinished] = useState(false);

  const splashRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSplashFinished(true);
    }, 3000); // 3 seconds splash
    return () => clearTimeout(timer);
  }, []);
=======
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const res = await fetch(`${API}/api/users/register`, {
=======
      const res = await fetch('http://localhost:5000/api/users/register', {
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
<<<<<<< HEAD
      await res.json();
=======
      const data = await res.json();
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
      alert('Registration successful!');
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  const handleAlert = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const alertData = {
          ...userInfo,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        };

        try {
<<<<<<< HEAD
          const res = await fetch(`${API}/api/alerts/trigger`, {
=======
          const res = await fetch('http://localhost:5000/api/alerts/trigger', {
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alertData),
          });
<<<<<<< HEAD
          await res.json();
=======
          const data = await res.json();
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
          alert('🚨 Alert sent with your location!');
        } catch (err) {
          console.error(err);
          alert('Failed to send alert.');
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not get your location.");
      }
    );
  };

  return (
    <div className="app-container">
<<<<<<< HEAD
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
                <button className="btn alert" onClick={handleAlert}>
                  Alert
                </button>
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
=======
      <h1 className="app-header">
        🧿SAFETY FOR ALL <FaBell className="bell-icon" />
      </h1>
      <div className="symbols">🧿✊🌸</div>

      {!showForm ? (
        <div className="buttons">
          <button className="btn" onClick={() => setShowForm(true)}>Register</button>
          <button className="btn alert" onClick={handleAlert}>Alert</button>
        </div>
      ) : (
        <form className="form" onSubmit={handleRegister}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="surname" placeholder="Surname" onChange={handleChange} required />
          <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
          <input name="cellphone" placeholder="Cellphone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <button type="submit" className="btn">Submit</button>
        </form>
      )}
>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
    </div>
  );
}

export default App;
<<<<<<< HEAD
=======


>>>>>>> 9ba8fdae7e4f04bc088ee72af682079150190466
