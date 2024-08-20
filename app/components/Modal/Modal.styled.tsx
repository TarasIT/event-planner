"use client";

import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";

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
`;

export const ModalContent = styled.div`
  padding: 20px;
  border: 1px solid #411dd1;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 500px;
  background-color: white;
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
