"use client";

import { styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";

interface CreateEventFormProps {
  nameInputValue?: string;
  isNameInputValid?: boolean;
  isNameInputCompleted?: boolean;
}

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ nameInputValue, isNameInputValid, isNameInputCompleted }) => {
    if (nameInputValue && isNameInputValid) return "#7b61ff";
    if (!isNameInputValid) return "#ff2b77";
    if (!nameInputValue || isNameInputCompleted) return "#aca7c3";
  }};
`;

export const InputName = styled.p`
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

export const NameAuthInput = styled.input<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({
    nameInputValue,
    isNameInputValid,
    isNameInputCompleted,
  }) => {
    if (nameInputValue && isNameInputValid && !isNameInputCompleted) {
      return "#aca7c3";
    }
    if (!isNameInputValid) return "#ff2b77";
    if (!nameInputValue) return "#aca7c3";
    if (nameInputValue && isNameInputValid && isNameInputCompleted) {
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

export const NameLabel = styled.label`
  position: relative;
  display: block;
  width: 372px;

  color: #7b61ff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;

  @media (width < 768px) {
    width: 240px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (768px <= width < 1280px) {
    width: 308px;
  }
`;
