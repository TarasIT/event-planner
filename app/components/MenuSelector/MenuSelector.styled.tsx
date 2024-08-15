"use client";

import Link from "next/link";
import { styled, keyframes, css } from "styled-components";
import { LuLogOut } from "react-icons/lu";

interface MenuProps {
  isMenuSelectorOpened?: boolean;
  currentLang?: string;
  isLoggedIn?: boolean;
}

const openMenuList = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MenuTitle = styled.p<MenuProps>`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const MenuSelectorBox = styled.div<MenuProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ currentLang }) => (currentLang === "en" ? "100px" : "117px")};
  height: 48px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background-color: #7b61ff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  transition: min-width 300ms, background-color 300ms;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        min-width: 50px;
      }
    }
  `}

  &:hover,
  &:focus {
    background-color: #6243ff;
  }
`;

export const MenuSelectorList = styled.ul<MenuProps>`
  position: absolute;
  top: 63px;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        left: -50px;
      }
    }
  `}

  z-index: 2;
  width: ${({ currentLang }) => (currentLang === "en" ? "100px" : "117px")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;

  border-radius: 8px;
  background: #fff;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${({ isMenuSelectorOpened }) =>
    isMenuSelectorOpened &&
    css`
      animation: ${openMenuList} 300ms ease;
    `}
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 100%;
  padding-bottom: 4px;

  color: #aca7c3;
  font-feature-settings: "clig" off, "liga" off;
  font-size: 16px;
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

export const LogoutIcon = styled(LuLogOut)``;

export const MenuLink = styled(Link)`
  ${({ id }) =>
    id === "logout" &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    `}
`;