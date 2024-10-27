"use client";

import { styled } from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";

interface PagesProps {
  isActive: boolean;
}

export const PagesList = styled.ul`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;

  padding: 10px;
  border-radius: 8px;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  @media (width < 768px) {
    gap: 0;
  }
`;

export const SvgDecreasePage = styled(FaChevronLeft)<PagesProps>`
  color: #3f3f3f;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "#7b61ff" : "#aca7c3")};
`;

export const SvgIncreasePage = styled(SvgDecreasePage)`
  transform: rotate(180deg);
`;

export const PageItem = styled.li<PagesProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;

  color: ${({ isActive }) => (isActive ? "#7b61ff" : "#aca7c3")};
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;

  @media (width < 768px) {
    width: 40px;
    height: 40px;
    font-weight: 800;
  }
`;

export const Page = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Ellipsis = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
