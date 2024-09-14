"use client";

import { css, keyframes, styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";

interface CreateEventFormProps {
  picture?: File | Blob | string;
  isImageInputCompleted?: boolean;
}

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ picture, isImageInputCompleted }) => {
    if (picture) return "#7b61ff";
    if (!picture || isImageInputCompleted) return "#aca7c3";
  }};
`;

export const Spinner = styled(ImSpinner9)`
  color: #7b61ff;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const InputName = styled.p<CreateEventFormProps>`
  display: block;
  margin-bottom: 8px;
  color: ${({ picture, isImageInputCompleted }) => {
    if (picture) return "#7b61ff";
    if (!picture || isImageInputCompleted) return "#aca7c3";
  }};
`;

export const ImageInput = styled.input<CreateEventFormProps>`
  display: none;
`;

export const ImageInputWrapper = styled.div<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ picture, isImageInputCompleted }) => {
    if (picture) return "#7b61ff";
    if (!picture || isImageInputCompleted) return "#aca7c3";
  }};
  transition: border-color 300ms;
  cursor: pointer;

  & > label {
    color: ${({ picture, isImageInputCompleted }) => {
      if (picture) return "#3F3F3F";
      if (!picture || isImageInputCompleted) return "#aca7c3";
    }};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    cursor: pointer;
  }
`;

export const ImageLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;

  color: #aca7c3;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;

  ${css`
    @media (width < 768px) {
      width: 240px;
      margin-left: auto;
      margin-right: auto;
    }
    @media (768px <= width < 1280px) {
      width: 308px;
    }
  `}
`;
