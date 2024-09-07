"use client";

import { styled, css } from "styled-components";
import { FcGoogle } from "react-icons/fc";

interface MenuProps {
  currentLang?: string;
  isLoggedIn?: boolean;
}

export const AuthMobileList = styled.ul<MenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: ${({ currentLang }) => (currentLang === "en" ? "100px" : "117px")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background: transparent;
  color: #aca7c3;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:hover {
    color: #7b61ff;
  }
`;

export const GoogleIcon = styled(FcGoogle)`
  height: 1.5em;
  width: 1.5em;
`;

export const AuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  padding: 15px;

  background-color: transparent;
  cursor: pointer;
  transition: color 300ms;
  color: #fff;

  ${({ id }) =>
    id === "logout" &&
    css`
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    `}
`;
