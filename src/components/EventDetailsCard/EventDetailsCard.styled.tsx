import { css, styled } from "styled-components";
import DesktopDefaultImg from "../../assets/images/default-horizontal.jpg";
import DesktopDefaultImg2x from "../../assets/images/default-horizontal-2x.jpg";
import MobileDefaultImg from "../../assets/images/default-vertical.jpg";
import MobileDefaultImg2x from "../../assets/images/default-vertical-2x.jpg";
import { NavLink } from "react-router-dom";

interface EventProps {
  image?: string;
  priority?: string;
}

export const EventCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 628px;
  min-height: 492px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  padding-bottom: 40px;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 688px;
    }
    @media screen and (max-width: 767px) {
      width: 272px;
    }
  `}
`;

export const BackgroundContainer = styled.div<EventProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 336px;
  margin-bottom: 20px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  background-image: ${({ image }) => {
    return image ? `url(${image})` : `url(${DesktopDefaultImg})`;
  }};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  ${css`
    @media screen (min-device-pixel-ratio: 2),
      (-webkit-min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      & {
        background-image: url(${DesktopDefaultImg2x});
      }
    }
  `}

  ${css`
    @media screen and (max-width: 767px) {
      & {
        border-radius: 8px;
        background-image: url(${MobileDefaultImg});
      }
      @media screen (min-device-pixel-ratio: 2),
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        & {
          background-image: url(${MobileDefaultImg2x});
        }
      }
    }
  `}
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin-bottom: 24px;
  gap: 12px;
  width: 100%;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      padding-left: 24px;
      padding-right: 24px;
    }
    @media screen and (max-width: 767px) {
      flex-wrap: wrap;
      margin-bottom: 40px;
      padding-left: 16px;
      padding-right: 16px;
    }
  `}
`;

export const Category = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  padding: 6px 12px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 4px 5px 9px 0px rgba(166, 141, 174, 0.28);

  color: #7b61ff;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const Priority = styled.p<EventProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  padding: 6px 12px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 4px 5px 9px 0px rgba(166, 141, 174, 0.28);

  color: ${({ priority }) => {
    switch (priority) {
      case "High":
        return "#ff2b77";
      case "Medium":
        return "#E2A300";
      case "Low":
        return "#6BD475";
      default:
        return "black";
    }
  }};
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const DateAndTime = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 6px 12px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 4px 5px 9px 0px rgba(166, 141, 174, 0.28);

  color: #7b61ff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Location = styled(DateAndTime)``;

export const Title = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  color: #3f3f3f;
  font-family: Poppins;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  ${css`
    @media screen and (min-width: 1280px) {
      margin-left: auto;
      margin-right: auto;
      width: 628px;
    }
  `}
`;

export const Description = styled.p`
  width: 602px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;
  word-wrap: break-word;

  overflow: hidden;
  text-overflow: ellipsis;

  color: #49454f;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 640px;
      height: 40px;
      margin-bottom: 24px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
      margin-bottom: 24px;
    }
  `}
`;

export const DeleteEventBtn = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 8px 16px;
  border-radius: 4px;

  background: #7b61ff;

  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  ${css`
    @media screen and (max-width: 767px) {
      width: 108px;
    }
  `}
`;

export const EditEventBtn = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #7b61ff;

  color: #7b61ff;
  text-align: center;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  ${css`
    @media screen and (max-width: 767px) {
      width: 108px;
    }
  `}
`;

export const EventButtonsBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 16px;
  padding-right: 40px;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      padding-right: 24px;
    }
    @media screen and (max-width: 767px) {
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;
    }
  `}
`;
