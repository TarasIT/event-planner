"use client";

import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Overlay, ModalContent, CloseButton } from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };

  if (!isOpen) return null;

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
