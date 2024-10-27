"use client";

import { styled } from "styled-components";
import { BsPlusLg } from "react-icons/bs";

export const AddEventBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 21px;
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
    & > span {
      display: none;
    }

    & {
      width: 56px;
      padding: 16px;
    }
  }
`;

export const SvgButtonIcon = styled(BsPlusLg)`
  width: 24px;
  height: 24px;
  color: white;
`;
