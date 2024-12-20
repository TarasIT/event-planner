"use client";

import { styled, css, keyframes } from "styled-components";
import { CiFilter } from "react-icons/ci";

interface CategoryProps {
  isCategoryListOpened?: boolean;
  currentCategory?: string;
  isActive?: boolean;
}

const openCategories = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CategoryBox = styled.div<CategoryProps>`
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  min-width: ${({ isCategoryListOpened }) =>
    isCategoryListOpened ? "185px" : "158px"};
  padding: 16px;
  border: none;
  border-radius: 8px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: ${({ isCategoryListOpened }) =>
    isCategoryListOpened ? "0" : "8px"};
  border-bottom-right-radius: ${({ isCategoryListOpened }) =>
    isCategoryListOpened ? "0" : "8px"};
  cursor: pointer;
  transition-property: min-width color;
  transition-duration: 300ms;

  background: #fff;
  box-shadow: ${({ isCategoryListOpened }) =>
    isCategoryListOpened
      ? "none"
      : "2px 4px 9px 0px rgba(166, 141, 174, 0.28)"};

  &:hover {
    color: #7b61ff;
  }

  @media (width < 768px) {
    position: absolute;
    z-index: ${({ isCategoryListOpened }) =>
      isCategoryListOpened ? "2" : "0"};
    min-width: ${({ isCategoryListOpened }) =>
      isCategoryListOpened ? "158px" : "56px"};
    box-shadow: ${({ isCategoryListOpened }) =>
      isCategoryListOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
  }
`;

export const CategoryList = styled.ul<CategoryProps>`
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

  ${({ isCategoryListOpened }) =>
    isCategoryListOpened &&
    css`
      animation: ${openCategories} 300ms ease;
    `}

  @media (width < 768px) {
    box-shadow: ${({ isCategoryListOpened }) =>
      isCategoryListOpened && "0px 4px 10px 0px rgba(0, 0, 0, 0.25)"};
  }
`;

export const CategoryItem = styled.li<CategoryProps>`
  display: flex;
  align-items: center;
  padding-top: 4px;
  border-bottom: 1px solid #aca7c3;

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
`;

export const CurrentCategory = styled.p<CategoryProps>`
  color: #3f3f3f;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transition: color 300ms;

  color: ${({ isCategoryListOpened }) =>
    isCategoryListOpened ? "#7b61ff" : "#3F3F3F"};

  ${CategoryBox}:hover > & {
    color: #7b61ff;
  }

  @media (width < 768px) {
    display: ${({ isCategoryListOpened }) =>
      isCategoryListOpened ? "block" : "none"};
  }
`;

export const SvgCategoryIcon = styled(CiFilter)<CategoryProps>`
  width: 24px;
  height: 24px;
  transition: color 300ms;
  stroke-width: 1px;
  color: ${({ isCategoryListOpened }) =>
    isCategoryListOpened ? "#7b61ff" : "#3F3F3F"};

  ${CategoryBox}:hover > &,
  ${CategoryBox}:focus > & {
    color: #7b61ff;
  }

  @media (width < 768px) {
    color: ${({ currentCategory }) =>
      currentCategory ? "#7b61ff" : "#3f3f3f"};
  }
`;

export const Category = styled.p`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 24px;
  padding-right: 24px;

  &:hover {
    color: #7b61ff;
  }
`;
