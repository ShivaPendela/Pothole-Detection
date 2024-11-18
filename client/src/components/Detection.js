import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Detection.css';

export default function Detection() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState([]);
  const originalCanvasRef = useRef(null);
  const detectionCanvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const originalCanvas = originalCanvasRef.current;
    const detectionCanvas = detectionCanvasRef.current;
    if (originalCanvas && detectionCanvas && image) {
      const originalCtx = originalCanvas.getContext('2d');
      const detectionCtx = detectionCanvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        originalCanvas.width = img.width;
        originalCanvas.height = img.height;
        originalCtx.drawImage(img, 0, 0);

        detectionCanvas.width = img.width;
        detectionCanvas.height = img.height;
        detectionCtx.drawImage(img, 0, 0);
        result.forEach((obj) => {
          detectionCtx.beginPath();
          detectionCtx.lineWidth = '3';
          detectionCtx.strokeStyle = '#ff6347';
          detectionCtx.rect(
            obj.xmin,
            obj.ymin,
            obj.xmax - obj.xmin,
            obj.ymax - obj.ymin
          );
          detectionCtx.stroke();
        });
      };
      img.src = URL.createObjectURL(image);
    }
  }, [image, result]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    try {
      const res = await axios.post('http://localhost:8000/objectdetection', formData);
      setResult(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Pothole Detector</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <form onSubmit={handleUpload} className="upload-form">
        <input type='file' onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit' className="upload-button">Upload</button>
      </form>
      {result.length > 0 && (
        <div className="result-container">
          <h2>Pothole Detection Result:</h2>
          <div className="canvas-container">
            <div>
              <h3>Original Image</h3>
              <canvas ref={originalCanvasRef}></canvas>
            </div>
            <div>
              <h3>Detected Image</h3>
              <canvas ref={detectionCanvasRef}></canvas>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
