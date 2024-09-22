"use client";

import { ImSpinner9 } from "react-icons/im";
import { keyframes, styled } from "styled-components";

export const TimeSelector = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  background-color: transparent;
  touch-action: none;
  cursor: pointer;
`;

export const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
`;

export const DeleteIconBox = styled(SvgContainer)`
  position: absolute;
  top: 40px;
  right: 12px;
  cursor: pointer;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled(ImSpinner9)`
  width: 1.5em;
  height: 1.5em;
  color: #fff;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const AuthForm = styled.form`
  display: grid;
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 8px;
  width: 460px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  @media (width < 768px) {
    width: 100%;
  }
`;

export const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 193px;
  height: 56px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 8px;
  border: none;

  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  background: #7b61ff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);
  cursor: pointer;
  transition: background 300ms;

  &:hover {
    background: #6243ff;
  }

  @media (width < 768px) {
    width: 240px;
  }
`;

export const ModalBtn = styled.button`
  min-width: 80px;
  min-height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: #7b61ff;
  transition: color 300ms, background-color 300ms;

  &:hover,
  &:focus {
    background-color: #6243ff97;
  }

  font-size: 18px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const ModalDescription = styled.p`
  font-size: 20px;
  text-align: center;
  color: #3f3f3f;
  margin-bottom: 20px;
`;
