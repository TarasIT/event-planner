import { css, styled } from "styled-components";

export const MainContainer = styled.section`
  width: 1280px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-top: 18px;

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
