import { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io("http://localhost:5000");

export default function EmergencyAlert() {
  const [location, setLocation] = useState(null);

  const triggerAlert = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      setLocation(coords);

      const audio = await startRecording();

      const audioFile = new File([audio], "audio.webm", { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("upload_preset", "your_cloudinary_preset");

      const cloudRes = await axios.post("https://api.cloudinary.com/v1_1/your_cloud_name/video/upload", formData);
      const audioUrl = cloudRes.data.secure_url;

      const response = await axios.post('/api/alerts/create', {
        location: coords,
        audioUrl
      }, {
        headers: { Authorization: "Bearer dummy_token" }
      });

      console.log("Alert sent!", response.data);
    });
  };

  return (
    <div>
      <button className="bg-red-500 text-white p-4 rounded" onClick={triggerAlert}>
        Send Emergency Alert 🚨
      </button>
    </div>
  );
}

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];

  return new Promise((resolve) => {
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      resolve(blob);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 5000); // 5 seconds
  });
}