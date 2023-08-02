import { styled, css } from "styled-components";
import MainBgImage from "../assest/images/main-bg.png";

export const Main = styled.main`
  background-image: url(${MainBgImage});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Container = styled.section`
  width: 1280px;
  min-height: 1349px;
  margin-left: auto;
  margin-right: auto;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        width: 320px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        width: 768px;
        padding-left: 40px;
        padding-right: 40px;
      }
    }
  `}
`;
