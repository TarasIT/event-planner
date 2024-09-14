"use client";

import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Overlay, ModalContent, CloseButton } from "./Modal.styled";

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpened, onClose, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpened, onClose]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpened) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose} />
      </ModalContent>
    </Overlay>,
    document.body
  );
};

export default Modal;
