"use client";

import { styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface CreateEventFormProps {
  password?: string;
  isPasswordLong?: boolean;
  isPasswordCompleted?: boolean;
}

export const SvgShowPasswordIcon = styled(IoMdEye)`
  position: absolute;
  bottom: 28px;
  right: -34px;
  transition: transform;
  transform: translateY(50%);
  cursor: pointer;

  @media (width < 768px) {
    right: -28px;
  }
`;

export const SvgHidePasswordIcon = styled(IoMdEyeOff)`
  position: absolute;
  bottom: 28px;
  right: -34px;
  transition: transform;
  transform: translateY(50%);
  cursor: pointer;

  @media (width < 768px) {
    right: -28px;
  }
`;

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ password, isPasswordLong, isPasswordCompleted }) => {
    if (password && isPasswordLong) return "#7b61ff";
    if (password && !isPasswordLong) return "#ff2b77";
    if (!password || isPasswordCompleted) return "#aca7c3";
  }};
`;

export const InputPassword = styled.p`
  display: block;
  margin-bottom: 8px;
`;

export const InvalidInputWarning = styled.p`
  position: absolute;
  right: 19px;
  bottom: -20px;

  color: #ff2b77;
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const PasswordAuthInput = styled.input<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ password, isPasswordLong, isPasswordCompleted }) => {
    if (password && isPasswordLong && !isPasswordCompleted) {
      return "#aca7c3";
    }
    if (password && !isPasswordLong) return "#ff2b77";
    if (!password) return "#aca7c3";
    if (password && isPasswordLong && isPasswordCompleted) {
      return "#7b61ff";
    }
  }};
  transition: border-color 300ms;

  color: #3f3f3f;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: #aca7c3;
  }
`;

export const PasswordLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;
  margin-left: auto;
  margin-right: auto;
  color: #7b61ff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 308px;
  }
`;
