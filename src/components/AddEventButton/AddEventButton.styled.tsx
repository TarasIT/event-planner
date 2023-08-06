import { css, styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const AddEventLink = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 193px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 21px;
  padding-right: 12px;
  border-radius: 8px;
  border: none;

  color: #fff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  background: #7b61ff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);
  cursor: pointer;
  transition: background 300ms;

  &:hover {
    background: #6243ff;
  }

  ${css`
    @media screen and (max-width: 767px) {
      & > span {
        display: none;
      }

      & {
        width: 56px;
        padding: 16px;
      }
    }
  `}
`;

export const SvgButtonIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: white;
`;
