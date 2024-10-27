"use client";

import { css, keyframes, styled } from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import { SvgContainer, TimeSelector } from "../../styles/common.styled";

interface TimePickerProps {
  selectedTime?: string;
  isTimePickerOpened?: boolean;
  isHourAscending?: boolean | string;
  isMinuteAscending?: boolean | string;
  isDayHalfAscending?: boolean | string;
}

const changeInputValueDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(10px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

const changeInputValueUp = keyframes`
  100% {
    opacity: 0;
    transform: translateY(0);
  }
  0% {
    opacity: 1;
    transform: translateY(-10px);
  }
`;

const openTimePicker = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TimePicker = styled.ul<TimePickerProps>`
  position: absolute;
  top: 64px;
  left: 0;
  z-index: 1;
  translate: -1px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 372px;
  height: 160px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;

  background: #fff;
  box-shadow: 2px 4px 9px 0px rgba(166, 141, 174, 0.28);

  ${({ isTimePickerOpened }) => {
    return (
      isTimePickerOpened &&
      css`
        animation: ${openTimePicker} 300ms;
      `
    );
  }}

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }
`;

export const TimeItem = styled.li`
  display: flex;
  color: #aca7c3;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:nth-child(2) {
    border-top: 1px solid #aca7c3;
    border-bottom: 1px solid #aca7c3;
  }
`;

export const UnchoosenTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 121px;
  height: 48px;
`;

export const HourSelector = styled(TimeSelector)<TimePickerProps>`
  width: 57px;
  padding: 12px 24px 12px 10px;

  ${({ isHourAscending }) => {
    if (isHourAscending === true) {
      return css`
        animation: ${changeInputValueUp} 300ms;
      `;
    }
    if (!isHourAscending) {
      return css`
        animation: ${changeInputValueDown} 300ms;
      `;
    }
  }}
`;

export const MinuteSelector = styled(TimeSelector)<TimePickerProps>`
  width: 57px;
  padding: 12px 12px 12px 24px;

  ${({ isMinuteAscending }) => {
    if (isMinuteAscending === true) {
      return css`
        animation: ${changeInputValueUp} 300ms;
      `;
    }
    if (!isMinuteAscending) {
      return css`
        animation: ${changeInputValueDown} 300ms;
      `;
    }
  }}
`;

export const DayHalfSelector = styled(TimeSelector)<TimePickerProps>`
  width: 90px;
  padding: 12px 16px;

  ${({ isDayHalfAscending }) => {
    if (isDayHalfAscending === true) {
      return css`
        animation: ${changeInputValueUp} 300ms;
      `;
    }
    if (!isDayHalfAscending) {
      return css`
        animation: ${changeInputValueDown} 300ms;
      `;
    }
  }}
`;

export const Divider = styled.p`
  color: #3f3f3f;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const Selectors = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 121px;
`;

export const Hour = styled.p`
  padding: 12px 12px 12px 10px;
`;

export const Minute = styled.p`
  padding: 12px;
`;

export const DayHalf = styled.p`
  width: 90px;
  padding: 12px 16px;
`;

export const TextInput = styled.p<TimePickerProps>`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: #fff;
  transition: color 300ms;
  color: ${({ isTimePickerOpened, selectedTime }) =>
    isTimePickerOpened ? "#7b61ff" : selectedTime ? "#3f3f3f" : "#aca7c3"};
`;
export const TimeIconContainer = styled(SvgContainer)`
  pointer-events: none;
`;

export const SvgTimeIcon = styled(FaChevronDown)<TimePickerProps>`
  color: #7b61ff;
  transition: transform 300ms;
  pointer-events: none;
  transform: ${({ isTimePickerOpened }) =>
    isTimePickerOpened ? "rotate(180deg)" : "rotate(0deg)"};
  cursor: pointer;
`;

export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;

  color: #7b61ff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const TimeInput = styled.div<TimePickerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 372px;
  height: 56px;
  padding: 16px 12px;
  border: 1px solid;
  border-radius: 8px;
  border-color: #aca7c3;
  transition: color 300ms;
  border-color: ${({ selectedTime }) => (selectedTime ? "#7b61ff" : "#aca7c3")};
  cursor: pointer;

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }
`;

export const TimeBox = styled.div`
  width: 372px;

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }
`;
