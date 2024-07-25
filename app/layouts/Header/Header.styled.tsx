"use client";

import { css, styled } from "styled-components";
import { GoSearch } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

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
  width: 1280px;
  min-height: 92px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 22px;
  background: #fefcff;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        flex-wrap: wrap;
        min-height: 168px;
        width: 320px;
        padding-top: 24px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        width: 768px;
        padding-top: 26px;
        padding-left: 40px;
        padding-right: 40px;
      }
    }
  `}
`;

export const HomeLink = styled(Link)<HeaderProps>`
  width: 100%;
  padding-top: 7px;
  margin-right: auto;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #7b61ff;
  cursor: pointer;
`;

export const SearchBox = styled.div`
  margin-left: auto;

  ${css`
    @media screen and (min-width: 767px) and (max-width: 1279px) {
      margin-right: 12px;
    }
    @media screen and (min-width: 1279px) {
      margin-right: 24px;
    }
  `}
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

  ${css`
    @media screen and (max-width: 767px) {
      & {
        width: 272px;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        width: 368px;
      }
    }
  `}

  &::placeholder {
    color: #888;
  }
`;
