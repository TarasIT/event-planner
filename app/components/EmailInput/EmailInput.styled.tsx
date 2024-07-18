"use client";

import { css, styled } from "styled-components";
import { RxCross2 } from "react-icons/rx";

interface CreateEventFormProps {
  emailInputValue?: string;
  isEmailInputValid?: boolean;
  isEmailInputCompleted?: boolean;
}

export const SvgDeleteIcon = styled(RxCross2)<CreateEventFormProps>`
  transition: color 300ms;
  color: ${({ emailInputValue, isEmailInputValid, isEmailInputCompleted }) => {
    if (emailInputValue && isEmailInputValid) return "#7b61ff";
    if (!isEmailInputValid) return "#ff2b77";
    if (!emailInputValue || isEmailInputCompleted) return "#aca7c3";
  }};
`;

export const InputEmail = styled.p`
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

export const EmailAuthInput = styled.input<CreateEventFormProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({
    emailInputValue,
    isEmailInputValid,
    isEmailInputCompleted,
  }) => {
    if (emailInputValue && isEmailInputValid && !isEmailInputCompleted) {
      return "#aca7c3";
    }
    if (!isEmailInputValid) return "#ff2b77";
    if (!emailInputValue) return "#aca7c3";
    if (emailInputValue && isEmailInputValid && isEmailInputCompleted) {
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

export const EmailLabel = styled.label`
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