"use client";

import { styled } from "styled-components";

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
