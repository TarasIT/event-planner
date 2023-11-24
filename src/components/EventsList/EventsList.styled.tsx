import { css, styled } from "styled-components";
import DefaultImage from "../../assets/images/default-vertical.jpg";
import DefaultImage2x from "../../assets/images/default-vertical-2x.jpg";
import { NavLink } from "react-router-dom";

interface EventProps {
  image?: string;
  priority?: string;
}

export const EventCardsList = styled.ul`
  display: grid;
  grid-template-columns: 302px 302px 302px 302px;
  column-gap: 24px;
  row-gap: 40px;
  margin-bottom: 32px;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      grid-template-columns: 332px 332px;
      row-gap: 24px;
    }
    @media screen and (max-width: 767px) {
      grid-template-columns: 271px;
      row-gap: 24px;
    }
  `}
`;

export const NoEventsFoundTitle = styled.h2`
  margin-top: 20vh;
  text-align: center;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const EventDetailsBox = styled.div`
  position: absolute;
  right: 0;
  bottom: -20px;

  display: flex;
  justify-content: end;
  align-items: center;

  padding-top: 8px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;

  transition: opacity 300ms, bottom 300ms;
  opacity: 0;
`;

export const TitleDescriptionContainer = styled.div`
  min-height: 144px;
  width: 100%;
  padding: 16px;
  margin-bottom: 0px;
  background-color: white;
  transition: margin-bottom 300ms;
`;

export const EventCard = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 302px;
  height: 480px;
  border-radius: 12px;

  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  &:hover {
    ${TitleDescriptionContainer} {
      margin-bottom: 64px;
    }

    ${EventDetailsBox} {
      bottom: 0;
      opacity: 1;
    }
  }

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 332px;
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
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  background-image: ${({ image }) => {
    return image ? `url(${image})` : `url(${DefaultImage})`;
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
        background-image: url(${DefaultImage2x});
      }
    }
  `}
`;

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  padding-top: 12px;
  padding-left: 12px;
`;

export const Category = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  padding: 6px 12px;
  border-radius: 8px;

  background: white;
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

  background: white;
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

export const DateTimeLocationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
`;

export const DateAndTime = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #7b61ff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Location = styled(DateAndTime)``;

export const Title = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  color: #1c1b1f;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export const Description = styled.p`
  width: 270px;
  height: 72px;
  padding-top: 8px;
  padding-bottom: 8px;
  word-wrap: break-word;

  overflow: hidden;
  text-overflow: ellipsis;

  color: #49454f;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export const EventDetailsBtn = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 40px;
  padding: 10px 24px;
  border-radius: 8px;

  background: #7b61ff;

  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
