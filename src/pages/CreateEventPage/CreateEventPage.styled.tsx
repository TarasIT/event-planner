import { css, styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.section`
  width: 1280px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-top: 18px;
  padding-left: 87px;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        width: 320px;
        padding-top: 40px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        width: 768px;
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
      }
    }
  `}
`;

export const GoBackLink = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 67px;
  margin-bottom: 17px;

  color: #7b61ff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    color: #7b61ff;
  }

  ${css`
    @media screen and (max-width: 767px) {
      & {
        font-size: 14px;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        margin-bottom: 24px;
      }
    }
  `}
`;

export const SvgBackLinkIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #7b61ff;

  ${GoBackLink}:hover > & {
    stroke: #6243ff;
  }
`;

export const Title = styled.h2`
  color: #3f3f3f;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        font-size: 24px;
      }
    }
  `}
`;
