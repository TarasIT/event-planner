"use client";

import { styled } from "styled-components";
import { GoSearch } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";

interface HeaderProps {
  query?: string;
  isLoggedIn?: boolean;
}

export const AppHeader = styled.header`
  border-bottom: 1px solid #7b61ff;
`;

export const Container = styled.div<HeaderProps>`
  position: relative;
  display: flex;
  width: 1279px;
  min-height: 92px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 22px;
  background: #fefcff;

  @media (width < 768px) {
    flex-wrap: wrap;
    min-height: ${({ isLoggedIn }) => (isLoggedIn ? "140px" : "80px")};
    width: 320px;
    padding-top: ${({ isLoggedIn }) => (isLoggedIn ? "10px" : "0px")};
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (768px <= width < 1280px) {
    width: 767px;
    min-height: 92px;
    padding-top: 26px;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

export const HomeBtn = styled.button`
  display: flex;
  align-items: start;
  padding-top: 7px;
  margin-right: auto;
  border: none;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #7b61ff;
  background-color: #fff;
  cursor: pointer;

  @media (width < 768px) {
    align-items: center;
    padding-top: 0;
  }
`;

export const OpenMobileMenuIcon = styled(IoIosMenu)`
  display: none;
  width: 24px;
  height: 24px;
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;

  @media (width < 768px) {
    display: block;
  }
`;

export const SearchBox = styled.div`
  @media (768px <= width < 1280px) {
    margin-right: 12px;
  }
  @media (width >= 1280px) {
    margin-right: 24px;
  }
`;

export const SearchLabel = styled.label`
  position: relative;
  display: block;
`;

export const SearchIcon = styled(GoSearch)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #aca7c3;
  transition: color 300ms;

  ${SearchLabel}:hover > &, ${SearchLabel}:focus > & {
    color: #7b61ff;
  }
`;

export const DeleteIcon = styled(RxCross2)<HeaderProps>`
  display: ${({ query }) => (query ? "block" : "none")};
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #aca7c3;
  cursor: pointer;
  transition: color 300ms;

  ${SearchLabel}:hover > &, ${SearchLabel}:focus > & {
    color: #7b61ff;
  }
`;

export const SearchInput = styled.input`
  width: 410px;
  height: 48px;
  padding: 12px 12px 12px 48px;
  border-radius: 8px;
  border: none;
  background: #fff;

  color: #7b61ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  @media (width < 768px) {
    width: 272px;
  }

  @media (768px <= width < 1280px) {
    width: 350px;
  }

  &::placeholder {
    color: #888;
  }
`;
