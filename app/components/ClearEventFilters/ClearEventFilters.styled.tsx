"use client";

import { styled } from "styled-components";
import { AiOutlineClear } from "react-icons/ai";

export const SvgClearIcon = styled(AiOutlineClear)`
  width: 24px;
  height: 24px;
  transition: color 300ms;
  color: #3f3f3f;
`;

export const ClearBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 56px;
  padding: 16px;
  border-radius: 8px;
  border: none;

  background-color: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);
  cursor: pointer;

  &:hover,
  &:focus {
    ${SvgClearIcon} {
      color: #7b61ff;
    }
  }
`;
