"use client";

import { styled, css, keyframes } from "styled-components";
import { FaArrowUp } from "react-icons/fa6";

interface SorterProps {
  isSorterOpened?: boolean;
  currentSorter?: string;
  isActive?: boolean;
  currentLang?: string;
}

const openSorter = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SorterBox = styled.div<SorterProps>`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: ${({ isSorterOpened, currentSorter, currentLang }) => {
    if (!isSorterOpened && currentLang === "ua" && !currentSorter)
      return "180px";
    if (!isSorterOpened && currentLang === "en" && !currentSorter)
      return "130px";

    if (isSorterOpened && currentLang === "ua") return "200px";

    if (
      !isSorterOpened &&
      currentLang === "ua" &&
      currentSorter &&
      currentSorter.length <= 4
    )
      return "210px";

    if (
      !isSorterOpened &&
      currentLang === "ua" &&
      currentSorter &&
      currentSorter.length > 4
    )
      return "255px";

    return "170px";
  }};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: ${({ isSorterOpened, currentSorter }) =>
    isSorterOpened ? "24px" : currentSorter ? "12px" : "16px"};
  padding-right: ${({ isSorterOpened, currentSorter }) =>
    isSorterOpened ? "24px" : currentSorter ? "12px" : "16px"};
  border: none;
  border-radius: 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: ${({ isSorterOpened }) =>
    isSorterOpened ? "0" : "8px"};
  border-bottom-right-radius: ${({ isSorterOpened }) =>
    isSorterOpened ? "0" : "8px"};
  cursor: pointer;
  transition-property: width padding-left padding-right color;
  transition-duration: 300ms;

  background: #fff;
  box-shadow: ${({ isSorterOpened }) =>
    isSorterOpened ? "none" : "2px 4px 9px 0px rgba(166, 141, 174, 0.28)"};

  ${css<SorterProps>`
    @media (width < 768px) {
      width: ${({ isSorterOpened }) => (isSorterOpened ? "170px" : "56px")};
      padding-left: 16px;
      padding-right: 16px;
      box-shadow: ${({ isSorterOpened }) =>
        isSorterOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
    }
  `}
`;

export const SorterList = styled.ul<SorterProps>`
  position: absolute;
  top: 57px;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 1px solid #aca7c3;
  background: #fff;

  ${css<SorterProps>`
    @media (width < 768px) {
      box-shadow: ${({ isSorterOpened }) =>
        isSorterOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
    }
  `}

  ${({ isSorterOpened }) =>
    isSorterOpened &&
    css`
      animation: ${openSorter} 300ms ease-out;
    `}
`;

export const Sorter = styled.p`
  display: inline-block;
  width: 100%;
`;

export const CurrentSorter = styled.p<SorterProps>`
  color: #3f3f3f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  transition: color 300ms;

  color: ${({ isSorterOpened }) => (isSorterOpened ? "#7b61ff" : "#3F3F3F")};

  ${SorterBox}:hover > & {
    color: #7b61ff;
  }

  ${css<SorterProps>`
    @media (width < 768px) {
      display: ${({ isSorterOpened }) => (isSorterOpened ? "block" : "none")};
    }
  `}
`;

export const SvgSorterIcon = styled.svg<SorterProps>`
  width: 24px;
  height: 24px;
  stroke: ${({ isSorterOpened }) => (isSorterOpened ? "#7b61ff" : "#3F3F3F")};

  transition: stroke 300ms;

  ${SorterBox}:hover > & {
    stroke: #7b61ff;
  }

  ${css<SorterProps>`
    @media (width < 768px) {
      stroke: ${({ currentSorter }) => (currentSorter ? "#7b61ff" : "#3f3f3f")};
    }
  `}
`;

export const SvgUpIcon = styled(FaArrowUp)<SorterProps>`
  color: ${({ isActive, isSorterOpened }) => {
    if (isActive && isSorterOpened) return "#7b61ff";
    if ((!isActive && !isSorterOpened) || (isActive && !isSorterOpened))
      return "#3f3f3f";
  }};
  transition: color 300ms;

  ${SorterBox}:hover &,
  ${SorterBox}:focus & {
    color: ${({ isSorterOpened }) => !isSorterOpened && "#7b61ff"};
  }
`;

export const SvgDownIcon = styled(FaArrowUp)<SorterProps>`
  color: ${({ isActive, isSorterOpened }) => {
    if (isActive && isSorterOpened) return "#7b61ff";
    if ((!isActive && !isSorterOpened) || (isActive && !isSorterOpened))
      return "#3f3f3f";
  }};
  transition: color 300ms;
  transform: rotate(180deg);

  ${SorterBox}:hover &,
  ${SorterBox}:focus & {
    color: ${({ isSorterOpened }) => !isSorterOpened && "#7b61ff"};
  }
`;

export const SorterItem = styled.li<SorterProps>`
  display: flex;
  align-items: center;
  min-height: 32px;
  padding-top: 8px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 4px;
  border-bottom: 1px solid;
  border-bottom-color: #aca7c3;

  color: #aca7c3;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #7b61ff;
      border-bottom-color: #7b61ff;
    `}

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    border-bottom-color: #7b61ff;
  }

  &:hover > ${Sorter} {
    color: #7b61ff;
  }

  &:hover > ${SvgUpIcon}, &:hover > ${SvgDownIcon} {
    color: #7b61ff;
  }
`;
