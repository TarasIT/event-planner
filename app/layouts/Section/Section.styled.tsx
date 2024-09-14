"use client";

import { css, styled } from "styled-components";

export const SectionLayout = styled.section`
  min-height: 100vh;
  width: 1279px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;

  ${css`
    @media (width < 768px) {
      & {
        width: 320px;
        padding-top: 40px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    @media (768px <= width < 1280px) {
      & {
        width: 767px;
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
      }
    }
  `}
`;
