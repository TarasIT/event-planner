import styled, { keyframes } from "styled-components";
import { RxCross2 } from "react-icons/rx";

const slideFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  overflow: scroll;

  @media (width < 768px) {
    display: block;
  }
`;

export const MobileMenuContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  min-width: 75vw;
  min-height: 100%;
  padding: 20px 30px;
  overflow-y: auto;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #7b61ff;
  animation: ${slideFromRight} 0.3s ease;
`;

export const CloseBtn = styled(RxCross2)`
  width: 24px;
  height: 24px;
  margin-left: auto;
  cursor: pointer;
`;
