import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function PoliceDashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new_alert", (alert) => {
      setAlerts(prev => [alert, ...prev]);
    });
  }, []);

  return (
    <div>
      <h1>Live Alerts</h1>
      {alerts.map((alert, index) => (
        <div key={index}>
          <p>Location: {alert.location.latitude}, {alert.location.longitude}</p>
          <audio controls src={alert.audioUrl}></audio>
        </div>
      ))}
    </div>
  );
}