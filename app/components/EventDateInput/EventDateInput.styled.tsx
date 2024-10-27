"use client";

import { css, keyframes, styled } from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { SvgContainer } from "@/app/styles/common.styled";

interface DatePickerProps {
  selectedDate?: Date | string | null;
  isCalendarOpened?: boolean;
}

const openDatePicker = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SvgDecreaseMonthIcon = styled(FaChevronLeft)`
  color: #3f3f3f;
  cursor: pointer;
`;

export const ChangeMonthIcon = styled(SvgContainer)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const SvgIncreaseMonthIcon = styled(SvgDecreaseMonthIcon)`
  transform: rotate(180deg);
`;

export const DateIconBox = styled(SvgContainer)`
  position: absolute;
  bottom: 16px;
  right: 12px;
  z-index: 1;
  pointer-events: none;
`;

export const SvgDateIcon = styled(FaChevronDown)<DatePickerProps>`
  color: #7b61ff;
  cursor: pointer;
  pointer-events: none;
  transition: transform 300ms;
  transform: ${({ isCalendarOpened }) =>
    isCalendarOpened ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const CustomDatePicker = styled.div<DatePickerProps>`
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
  cursor: pointer;
  transition: color 300ms;
  border-color: ${({ selectedDate }) => (selectedDate ? "#7b61ff" : "#aca7c3")};

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }
`;

export const TextInput = styled.p<DatePickerProps>`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: #fff;
  transition: color 300ms;
  color: ${({ isCalendarOpened, selectedDate }) =>
    selectedDate ? "#3f3f3f" : isCalendarOpened ? "#7b61ff" : "#aca7c3"};
`;

export const BtnsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const ChooseBtn = styled.button<DatePickerProps>`
  min-width: 110px;
  min-height: 32px;
  border: none;
  border-radius: 4px;
  background: #7b61ff;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  transition: background 300ms;

  &:hover {
    background: #6243ff;
  }
`;

export const CancelBtn = styled.button<DatePickerProps>`
  min-width: 75px;
  min-height: 32px;
  border-radius: 4px;
  border: 1px solid #7b61ff;
  background: #fff;
  cursor: pointer;
  color: #7b61ff;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  transition: border-color 300ms, color 300ms;

  &:hover {
    border-color: #6243ff;
    color: #6243ff;
  }
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

export const DateBox = styled.div`
  position: relative;
  width: 372px;

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }
`;

export const DatePickerWrapper = styled.div<DatePickerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 372px;
  padding: 20px;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.07);

  ${({ isCalendarOpened, selectedDate }) => {
    if (isCalendarOpened && !selectedDate) {
      return css`
        animation: ${openDatePicker} 300ms;
      `;
    }
  }}

  @media (width < 768px) {
    width: 240px;
  }
  @media (768px <= width < 1280px) {
    width: 309px;
  }

  .react-datepicker__month-container {
    width: 100%;
    margin-bottom: 16px;
  }

  .custom-header {
    display: flex;
    justify-content: space-between;

    margin-bottom: 16px;
    color: #3f3f3f;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  .react-datepicker__header {
    padding: 0;
    border: none;
    margin-bottom: 16px;
    background: white;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day-name {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 32px;
    width: 100%;
    margin: 0;
    padding: 8px 2px;

    color: #3f3f3f;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .react-datepicker__day-name:first-child,
  .react-datepicker__day-name:last-child {
    color: #ff2b77;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    flex: 1 0 0;

    color: #aca7c3;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .react-datepicker__day--today.react-datepicker__day--selected {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;

    color: ${({ selectedDate }) => (selectedDate ? "#fff" : "#7b61ff")};
  }

  .react-datepicker__day.react-datepicker__day--today {
    color: #7b61ff;
  }

  .react-datepicker__day.react-datepicker__day--today.react-datepicker__day--selected,
  .react-datepicker__day.react-datepicker__day--keyboard-selected {
    color: #fff;
  }

  .react-datepicker__day--keyboard-selected {
    border-radius: 0;
    background-color: #7b61ff;
    transition: background-color 300ms;
  }

  .react-datepicker__day--selected:hover {
    background-color: #6243ff;
    border-radius: 0;
  }

  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected:hover,
  .react-datepicker__year-text--keyboard-selected:hover {
    border-radius: 0;
    background-color: #6243ff;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: #3c3c3c80;
  }

  .react-datepicker__day--selected {
    border-radius: 0;
    background: #7b61ff;
    transition: background-color 300ms;
    color: #fff;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .react-datepicker__day,
  .react-datepicker__day--selected {
    height: 32px;
    width: 100%;
    padding: 8px;

    @media (width < 768px) {
      width: 28.57px;
    }
  }
`;
