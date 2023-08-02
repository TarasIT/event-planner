import { css, styled } from "styled-components";
// import { NavLink } from "react-router-dom";

export const Header = styled.header`
  border-bottom: 1px solid #7b61ff;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 1280px;
  min-height: 92px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 22px;
  padding-left: 87px;
  background: #fefcff;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        justify-content: space-between;
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

export const Link = styled.a`
  height: 33px;
  padding-top: 7px;
  font-family: Alata;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #7b61ff;
`;

export const SearchBox = styled.div`
  margin-left: auto;
  margin-right: 24px;

  ${css`
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 96px;
      left: 50%;
      transform: translateX(-50%);
      margin-right: auto;
    }
  `}
`;

export const SearchLabel = styled.label`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 410px;
  height: 48px;
  padding: 12px 12px 12px 48px;
  border-radius: 8px;
  border: none;
  background: #fff;

  color: #7b61ff;
  font-family: Poppins;
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

export const SvgSearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;
