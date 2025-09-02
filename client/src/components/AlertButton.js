// src/components/AlertButton.js
import React from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const AlertButton = () => {
  // Read user info from localStorage
  const storedUser = localStorage.getItem('userInfo');
  const userInfo = storedUser ? JSON.parse(storedUser) : null;

  const handleAlert = () => {
    if (!userInfo || !userInfo.name) {
      alert('Please register first before sending an alert.');
      return;
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const alertData = {
            ...userInfo,
            location,
            audioUrl: '', // Optional: add audio later if needed
          };

          try {
            const res = await axios.post(`${API}/api/alerts/trigger`, alertData);
            alert('🚨 Alert sent successfully!');
            console.log(res.data);
          } catch (err) {
            console.error('❌ Error sending alert:', err);
            alert('Failed to send alert');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location.');
        }
      );
    } else {
      alert('Geolocation not supported by your browser.');
    }
  };

  return (
    <button
      onClick={handleAlert}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      🚨 Send Alert
    </button>
  );
};

export default AlertButton;
