import { css, styled } from "styled-components";
import { NavLink } from "react-router-dom";

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
