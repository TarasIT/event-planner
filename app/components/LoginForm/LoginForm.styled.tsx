"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { ImSpinner9 } from "react-icons/im";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const AccidentSpinner = styled(ImSpinner9)`
  width: 1.5em;
  height: 1.5em;
  color: #7b61ff;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const ForgotPasswordLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7b61ff;
  transition: color 300ms;

  &:hover,
  &:focus {
    color: #6243ff;
  }
`;

export const ResendVerificationEmailLink = styled.a`
  max-width: 372px;
  text-align: center;
  color: #7b61ff;
  transition: color 300ms;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #6243ff;
  }
`;
