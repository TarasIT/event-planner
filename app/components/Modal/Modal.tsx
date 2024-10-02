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
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [isOpened]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
