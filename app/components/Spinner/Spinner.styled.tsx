"use client";

import { styled, keyframes } from "styled-components";
import { ImSpinner9 } from "react-icons/im";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled(ImSpinner9)`
  position: absolute;
  z-index: 5;
  top: 40%;
  left: 450%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  color: #7b61ff;
  animation: ${spinAnimation} 1s linear infinite;
`;
