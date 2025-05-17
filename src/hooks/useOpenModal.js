import { useEffect, useState } from "react";

const MODAL_CLOSE_TIME = 3000;

export const useOpenModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const showModal = (msg) => {
    setModalMsg(msg);
    setModalOpen(true);
  };

  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => setModalOpen(false), MODAL_CLOSE_TIME);
      return () => clearTimeout(timer);
    }
  }, [modalOpen]);

  return { modalOpen, modalMsg, showModal };
};
