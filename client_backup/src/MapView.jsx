import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ location }) {
  return (
    <div style={{ height: '300px', width: '100%' }}>
      {location && (
        <MapContainer center={[location.latitude, location.longitude]} zoom={15} scrollWheelZoom={false} style={{ height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Victim's Last Known Location</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}