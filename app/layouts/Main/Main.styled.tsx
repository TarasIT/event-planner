"use client";

import { css, styled } from "styled-components";
import DesktopBg from "../../assets/images/main-bg-desktop.jpg";
import DesktopBg2x from "../../assets/images/main-bg-desktop-2x.jpg";
import MobileBg from "../../assets/images/main-bg-mobile.jpg";
import MobileBg2x from "../../assets/images/main-bg-mobile-2x.jpg";
import TabletBg from "../../assets/images/main-bg-tablet.jpg";
import TabletBg2x from "../../assets/images/main-bg-tablet-2x.jpg";

export const MainLayout = styled.main`
  min-height: 100vh;
  background-image: url(${DesktopBg.src});
  background-repeat: no-repeat;
  background-position: center 0;

  ${css`
    @media (min-device-pixel-ratio: 2),
      (-webkit-min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      & {
        background-image: url(${DesktopBg2x.src});
      }
    }
  `}

  ${css`
    @media (width < 768px) {
      & {
        background-image: url(${MobileBg.src});
      }

      @media (min-device-pixel-ratio: 2),
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        & {
          background-image: url(${MobileBg2x.src});
        }
      }
    }

    @media (768px <= width < 1280px) {
      & {
        background-image: url(${TabletBg.src});
      }

      @media (min-device-pixel-ratio: 2),
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        & {
          background-image: url(${TabletBg2x.src});
        }
      }
    }
  `}
`;
