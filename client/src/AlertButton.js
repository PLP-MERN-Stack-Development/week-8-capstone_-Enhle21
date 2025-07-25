import React from 'react';
import axios from 'axios';

const AlertButton = () => {
  const handleAlert = () => {
    const userId = localStorage.getItem('userId'); // must be set at login or registration

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const alertData = {
          userId,
          location,
          audioUrl: '', // Optional: if you want to add audio later
        };

        try {
          const res = await axios.post('http://localhost:5000/api/alerts/trigger', alertData);
          alert('🚨 Alert sent successfully!');
          console.log(res.data);
        } catch (err) {
          console.error('❌ Error sending alert:', err);
          alert('Failed to send alert');
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location.');
      });
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
