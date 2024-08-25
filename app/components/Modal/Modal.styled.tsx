"use client";

import { styled, keyframes } from "styled-components";
import { IoClose } from "react-icons/io5";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeIn} 0.3s forwards;
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  border: none;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  background-color: white;
  opacity: 0;
  animation: ${slideIn} 0.3s forwards;
`;

export const CloseButton = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
