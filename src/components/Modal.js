import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
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
        zIndex: 1000,
      }}
    >
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 200 }}>{children}</div>
    </div>,
    document.getElementById("modal-root") // 여기만 변경!
  );
}
