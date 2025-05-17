import React, { useRef, useEffect, useRef as useRef2 } from "react";
import * as faceapi from "@vladmandic/face-api";
import { movingDetect } from "./util/moving_detect";
import { smileDetect } from "./util/smile_detect";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevBoxRef = useRef2(null);
  const moveAlertedRef = useRef2(false);
  const smileAlertedRef = useRef2(false);
  const moveIntervalIdRef = useRef(null);
  const smileIntervalIdRef = useRef(null);

  useEffect(() => {
    async function setup() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
      // 표정 감지용 모델도 미리 로드
      await faceapi.nets.faceExpressionNet.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    setup();
  }, []);

  useEffect(() => {
    movingDetect(videoRef, canvasRef, prevBoxRef, moveAlertedRef, moveIntervalIdRef);
    smileDetect(videoRef, smileAlertedRef, smileIntervalIdRef);
    return () => {
      clearInterval(moveIntervalIdRef.current);
      clearInterval(smileIntervalIdRef.current);
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", left: 0, top: 0 }} />
    </div>
  );
}

export default App;
