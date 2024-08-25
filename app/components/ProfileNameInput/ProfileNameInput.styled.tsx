"use client";

import { css, styled } from "styled-components";

export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid;
  border-color: #7b61ff;
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

export const Label = styled.label`
  position: relative;
  display: block;
  width: 372px;
  margin-bottom: 20px;

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
