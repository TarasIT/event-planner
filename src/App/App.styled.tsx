import { styled, css } from "styled-components";
import DesktopBg from "../assets/images/main-bg-desktop.jpg";
import TabletBg from "../assets/images/main-bg-tablet.jpg";
import MobileBg from "../assets/images/main-bg-mobile.jpg";
import DesktopBg2x from "../assets/images/main-bg-desktop-2x.jpg";
import TabletBg2x from "../assets/images/main-bg-tablet-2x.jpg";
import MobileBg2x from "../assets/images/main-bg-mobile-2x.jpg";

export const Main = styled.main`
  background-image: url(${DesktopBg});
  background-repeat: no-repeat;
  background-position: center 0;

  ${css`
    @media (min-device-pixel-ratio: 2),
      (-webkit-min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      & {
        background-image: url(${DesktopBg2x});
      }
    }
  `}

  ${css`
    @media screen and (max-width: 767px) {
      & {
        background-image: url(${MobileBg});
      }

      @media (min-device-pixel-ratio: 2),
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        & {
          background-image: url(${MobileBg2x});
        }
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1279px) {
      & {
        background-image: url(${TabletBg});
      }

      @media (min-device-pixel-ratio: 2),
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        & {
          background-image: url(${TabletBg2x});
        }
      }
    }
  `}
`;
