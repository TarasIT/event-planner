import { styled, css } from "styled-components";
import DesktopBg from "../assest/images/main-bg-desktop.png";
import TabletBg from "../assest/images/main-bg-tablet.png";
import MobileBg from "../assest/images/main-bg-mobile.png";

export const Main = styled.main`
  background-image: url(${DesktopBg});
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center 0;

  ${css`
    @media screen and (max-width: 767px) {
      & {
        background-image: url(${MobileBg});
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        background-image: url(${TabletBg});
      }
    }
  `}
`;

export const Container = styled.section`
  width: 1280px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-top: 60px;
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
