"use client";

import Link from "next/link";
import { styled, keyframes, css } from "styled-components";
import { GrLogin } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";

interface AuthProps {
  isAuthSelectorOpened?: boolean;
  currentLang?: string;
}

const openAuthList = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AuthSelectorBox = styled.div<AuthProps>`
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

  transition: color, background-color, min-width 300ms;

  &:hover,
  &:focus {
    color: #7b61ff;
    background-color: #6243ff;
  }
`;

export const OpenAuthSelectorIcon = styled(GrLogin)<AuthProps>`
  color: #fff;
  transition-property: color;
  transition-duration: 300ms;

  ${AuthSelectorBox}:hover &,
  ${AuthSelectorBox}:focus & {
    color: #fff;
  }
`;

export const AuthSelectorList = styled.ul<AuthProps>`
  position: absolute;
  top: 63px;
  left: 0;
  z-index: 1;
  width: ${({ currentLang }) => (currentLang === "en" ? "100px" : "117px")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 12px;

  border-radius: 8px;
  background: #fff;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${({ isAuthSelectorOpened }) =>
    isAuthSelectorOpened &&
    css`
      animation: ${openAuthList} 300ms ease;
    `}
`;

export const AuthItem = styled.li`
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

export const GoogleIcon = styled(FcGoogle)``;

export const AuthBtn = styled.button`
  ${({ id }) =>
    id === "google" &&
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

      transition: background-color 300ms;

      &:hover,
      &:focus {
        background-color: #6243ff6f;
      }
    `}
`;
