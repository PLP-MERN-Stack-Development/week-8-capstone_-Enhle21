import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
      <h1 className="text-xl font-bold mb-4">Live Alerts Map</h1>
      <MapContainer center={[-26.2, 28.0]} zoom={10} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {alerts.map((alert, idx) => (
          <Marker key={idx} position={[alert.location.latitude, alert.location.longitude]}>
            <Popup>
              Alert from user <br />
              <audio controls src={alert.audioUrl}></audio>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}