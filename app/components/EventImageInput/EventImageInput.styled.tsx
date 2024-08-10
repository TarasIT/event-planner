"use client";

import { css, styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";

interface CreateEventFormProps {
  image?: File | Blob | null;
  isImageInputCompleted?: boolean;
}

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ image, isImageInputCompleted }) => {
    if (image) return "#7b61ff";
    if (!image || isImageInputCompleted) return "#aca7c3";
  }};
`;

export const InputName = styled.p<CreateEventFormProps>`
  display: block;
  margin-bottom: 8px;
  color: ${({ image, isImageInputCompleted }) => {
    if (image) return "#7b61ff";
    if (!image || isImageInputCompleted) return "#aca7c3";
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
  border-color: ${({ image, isImageInputCompleted }) => {
    if (image) return "#7b61ff";
    if (!image || isImageInputCompleted) return "#aca7c3";
  }};
  transition: border-color 300ms;
  cursor: pointer;

  & > label {
    color: ${({ image, isImageInputCompleted }) => {
      if (image) return "#3F3F3F";
      if (!image || isImageInputCompleted) return "#aca7c3";
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
    @media screen and (max-width: 767px) {
      width: 240px;
      margin-left: auto;
      margin-right: auto;
    }
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
  `}
`;
