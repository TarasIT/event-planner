"use client";

import { css, styled } from "styled-components";
import DefaultImage from "../../assets/images/default-vertical.jpg";
import DefaultImage2x from "../../assets/images/default-vertical-2x.jpg";

interface EventProps {
  picture?: string;
  priority?: string;
  isLoading?: boolean;
  description?: string | null;
}

export const EventCardsList = styled.ul<EventProps>`
  display: grid;
  grid-template-columns: 302px 302px 302px 302px;
  column-gap: 24px;
  row-gap: 40px;
  margin-bottom: 32px;
  background-color: #fff;

  ${css`
    @media (768px <= width < 1280px) {
      grid-template-columns: 332px 332px;
      row-gap: 24px;
    }
    @media (width < 768px) {
      grid-template-columns: 271px;
      row-gap: 24px;
    }
  `}
`;

export const NoEventsTitle = styled.h2`
  margin-top: 20vh;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const EventDetailsBox = styled.div<EventProps>`
  position: ${({ description }) => (description ? "absolute" : "static")};
  right: 0;
  bottom: -20px;

  display: flex;
  justify-content: end;
  align-items: center;

  width: 100%;
  padding-top: 8px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 12px;

  background: #fff;
  opacity: 0;
  transition: opacity 300ms, bottom 300ms;
`;

export const TitleDescriptionContainer = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 0px;
  border-radius: 12px;
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
    @media (768px <= width < 1280px) {
      width: 332px;
    }
    @media (width < 768px) {
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

  background-image: ${({ picture }) => {
    return picture ? `url(${picture})` : `url(${DefaultImage.src})`;
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
        background-picture: url(${DefaultImage2x.src});
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
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

export const EventDetailsBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 40px;
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: #7b61ff;

  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
