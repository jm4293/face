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
    smileDetect(videoRef, smileAlertedRef, smileIntervalIdRef, showModal);
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
    </div>
  );
}

export default App;
