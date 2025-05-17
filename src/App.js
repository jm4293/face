import React, { useRef, useEffect, useRef as useRef2, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { movingDetect } from "./util/moving_detect";
import { smileDetect } from "./util/smile_detect";
import Modal from "./components/Modal";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevBoxRef = useRef2(null);
  const moveAlertedRef = useRef2(false);
  const smileAlertedRef = useRef2(false);
  const moveIntervalIdRef = useRef(null);
  const smileIntervalIdRef = useRef(null);

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // 2초 이상 움직이지 않으면 모달 띄우기
  const [showSmileGif, setShowSmileGif] = useState(false);

  // 모달을 띄우는 함수
  const showModal = (msg) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  useEffect(() => {
    async function setup() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
    setup();
  }, []);

  useEffect(() => {
    movingDetect(videoRef, prevBoxRef, moveAlertedRef, moveIntervalIdRef, showModal);
    smileDetect(videoRef, smileAlertedRef, smileIntervalIdRef, setShowSmileGif); // ✅

    return () => {
      clearInterval(moveIntervalIdRef.current);
      clearInterval(smileIntervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => setModalOpen(false), 1000); // 3초 뒤 닫힘
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ position: "absolute", left: 0, top: 0 }} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalMsg}
      </Modal>

      {showSmileGif && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 200, textAlign: "center" }}>
            <img
              // src="https://media.tenor.com/2QG9b6pQbJwAAAAC/%EC%9B%83%EC%9D%8C%EB%B2%A8-%EA%B5%B0%EB%8C%80.gif"
              src="https://s.gae9.com/trend/9e5cd91b9d186c46.orig"
              alt="웃음벨 군대"
              style={{ width: "100%", maxWidth: 320, marginTop: 8 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
