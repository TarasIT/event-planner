"use client";

import styled, { keyframes } from "styled-components";
import { ImSpinner9 } from "react-icons/im";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ForgotSpinner = styled(ImSpinner9)`
  width: 1.5em;
  height: 1.5em;
  color: #7b61ff;
  animation: ${spinAnimation} 1s linear infinite;
`;
