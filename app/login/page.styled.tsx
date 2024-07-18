"use client";

import { css, styled } from "styled-components";

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #3f3f3f;
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