"use client";

import { css, styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";

interface CreateEventFormProps {
  descriptionInputValue?: string;
  isDescriptionInputCompleted?: boolean;
}

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ descriptionInputValue, isDescriptionInputCompleted }) => {
    if (descriptionInputValue) return "#7b61ff";
    if (!descriptionInputValue || isDescriptionInputCompleted) return "#aca7c3";
  }};
`;
export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;
`;

export const DescriptionTextArea = styled.textarea<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 156px;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ descriptionInputValue, isDescriptionInputCompleted }) => {
    if (
      (descriptionInputValue && !isDescriptionInputCompleted) ||
      !descriptionInputValue
    ) {
      return "#aca7c3";
    }
    if (descriptionInputValue && isDescriptionInputCompleted) {
      return "#7b61ff";
    }
  }};
  transition: border-color 300ms;
  resize: none;

  color: #3f3f3f;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: #aca7c3;
  }
`;

export const DescriptionLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;

  color: #7b61ff;
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
