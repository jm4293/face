import * as faceapi from "@vladmandic/face-api";
import React, { useRef, useEffect } from "react";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function setup() {
      // 모델 로드
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
      // 웹캠 연결
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    setup();
  }, []);

  useEffect(() => {
    async function detect() {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.width;
        canvas.height = video.height;

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
          // faceapi.draw.drawDetections(canvas, detections);

          console.log("detections", detections);
        }, 100);
      }
    }
    detect();
  }, []);

  console.log("faceapi.nets.", faceapi.nets);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", left: 0, top: 0 }} />
    </div>
  );
}

export default App;
