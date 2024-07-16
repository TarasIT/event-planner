"use client";

import { css, styled } from "styled-components";
import { GoArrowLeft } from "react-icons/go";

export const Back = styled.span`
  display: block;
  height: 20px;
`;

export const GoBackLink = styled.a`
  display: flex;
  align-items: center;
  width: 100px;

  margin-bottom: 17px;

  color: #7b61ff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;

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

export const SvgBackLinkIcon = styled(GoArrowLeft)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  color: #7b61ff;

  ${GoBackLink}:hover > &,
  ${GoBackLink}:focus > & {
    color: #6243ff;
  }
`;
