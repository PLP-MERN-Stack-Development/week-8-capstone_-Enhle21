// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    dob: '',
    cellphone: '',
    email: ''
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
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
          const res = await fetch('http://localhost:5000/api/alerts/trigger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alertData),
          });
          const data = await res.json();
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
import AlertButton from './components/AlertButton'; // adjust path as needed

function App() {
  return (
    <div>
      <h1>Welcome to SAFETY FOR ALL</h1>
      <AlertButton />
    </div>
  );
}

  return (
    <div className="app">
      <h1 className="title">SAFETY FOR ALL</h1>
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
    </div>
  );
}

export default App;


