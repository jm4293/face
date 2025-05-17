import { useRef, useEffect, useState } from "react";

import { movingDetect } from "../../util/moving_detect";
import { smileDetect } from "../../util/smile_detect";

import "./cam.css";
import Modal from "../Modal";

export default function Cam({ onEndContest }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevBoxRef = useRef(null);
  const moveAlertedRef = useRef(false);
  const smileAlertedRef = useRef(false);
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
    movingDetect(
      videoRef,
      prevBoxRef,
      moveAlertedRef,
      moveIntervalIdRef,
      showModal,
      setShowSmileGif
    );
    smileDetect(
      videoRef,
      smileAlertedRef,
      smileIntervalIdRef,
      setShowSmileGif,
      showModal
    ); // showModal 추가

    return () => {
      clearInterval(moveIntervalIdRef.current);
      clearInterval(smileIntervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    const visited = localStorage.getItem("key");

    if (visited) {
      switch (visited) {
        case "move":
          setModalMsg("ADHD 왔네");
          setModalOpen(true);
          break;
        case "smile":
          setModalMsg("치료사 왔네");
          setModalOpen(true);
          break;
        default:
          break;
      }

      localStorage.removeItem("key");
    }
  }, []);

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => setModalOpen(false), 1000); // 3초 뒤 닫힘
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  return (
    <div className="contest-page">
      <h1 className="contest-title">
        <span className="wave-text">
          <span>멍</span>
          <span>때</span>
          <span>리</span>
          <span>기</span>
        </span>
        <span className="dots-animation">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h1>

      <div className="webcam-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="webcam-video"
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <button className="end-button" onClick={onEndContest}>
        대회 종료하기
      </button>

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
            zIndex: 500,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 400,
              textAlign: "center",
            }}
          >
            <img
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
