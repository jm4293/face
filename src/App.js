import * as faceapi from "@vladmandic/face-api";
import React, { useRef, useEffect, useRef as useRef2 } from "react";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevBoxRef = useRef2(null); // 이전 얼굴 위치 저장
  const alertedRef = useRef2(false); // 알림 중복 방지

  useEffect(() => {
    async function setup() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("https://justadudewhohacks.github.io/face-api.js/models");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    setup();
  }, []);

  useEffect(() => {
    let intervalId;
    async function detect() {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.width;
        canvas.height = video.height;

        intervalId = setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, detections);

          if (detections.length > 0) {
            const box = detections[0].box; // 첫 번째 얼굴만 사용
            if (prevBoxRef.current) {
              // 이전 위치와 현재 위치의 중심점 거리 계산
              const prev = prevBoxRef.current;
              const dx = box.x + box.width / 2 - (prev.x + prev.width / 2);
              const dy = box.y + box.height / 2 - (prev.y + prev.height / 2);
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist > 50 && !alertedRef.current) {
                // 50px 이상 움직이면 알림
                alertedRef.current = true;
                alert("움직이네?");
                setTimeout(() => {
                  alertedRef.current = false;
                }, 2000); // 2초 후 알림 재허용
              }
            }
            prevBoxRef.current = box;
          }
        }, 200);
      }
    }
    detect();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", left: 0, top: 0 }} />
    </div>
  );
}

export default App;
