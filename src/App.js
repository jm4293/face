import React, { useRef, useEffect, useRef as useRef2 } from "react";
import * as faceapi from "@vladmandic/face-api";
import { movingDetect } from "./util/moving_detect";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevBoxRef = useRef2(null);
  const alertedRef = useRef2(false);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    async function setup() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    setup();
  }, []);

  useEffect(() => {
    movingDetect(videoRef, canvasRef, prevBoxRef, alertedRef, intervalIdRef);
    return () => clearInterval(intervalIdRef.current);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", left: 0, top: 0 }} />
    </div>
  );
}

export default App;
