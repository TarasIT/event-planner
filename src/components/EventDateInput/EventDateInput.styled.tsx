import { css, styled } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CreateEventFormProps {
  selectedDate?: Date | null;
  isCalendarOpened?: boolean;
}

export const SvgDecreaseMonthIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: #3f3f3f;
  cursor: pointer;
`;

export const SvgIncreaseMonthIcon = styled(SvgDecreaseMonthIcon)`
  transform: rotate(180deg);
`;

export const StyledDatePicker = styled(DatePicker)<CreateEventFormProps>`
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
  color: ${({ selectedDate }) => (selectedDate ? "#3f3f3f" : "#aca7c3")};
  border-color: ${({ selectedDate }) => (selectedDate ? "#7b61ff" : "#aca7c3")};
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: #fff;
  transition: color 300ms;

  &::placeholder {
    color: ${({ isCalendarOpened }) =>
      isCalendarOpened ? "#7b61ff" : "#aca7c3"};
  }

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;

export const InputName = styled.p`
  display: block;
  margin-bottom: 8px;

  color: #7b61ff;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4px;
`;

export const DateBox = styled.div`
  position: relative;
  width: 372px;
`;

export const DateInput = styled.div<CreateEventFormProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 16px 12px;
  border: 1px solid;
  border-radius: 8px;
  border-color: #aca7c3;
  cursor: pointer;
  transition: color 300ms;
  color: ${({ selectedDate }) => (selectedDate ? "#7b61ff" : "#3f3f3f")};
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: #fff;

  ${css`
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 308px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  `}
`;

export const SvgDateIcon = styled.svg<CreateEventFormProps>`
  position: absolute;
  bottom: 16px;
  right: 12px;
  z-index: 1;
  width: 24px;
  height: 24px;
  fill: #7b61ff;
  transition: transform 300ms;
  transform: ${({ isCalendarOpened }) =>
    isCalendarOpened ? "rotate(90deg)" : "rotate(-90deg)"};
`;

export const DatePickerWrapper = styled.div<CreateEventFormProps>`
  .react-datepicker {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 372px;
    height: 348px;
    padding: 20px;
    border-radius: 11px;
    background: #fff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.07);

    ${css`
      @media screen and (max-width: 767px) {
      }
      @media screen and (min-width: 768px) and (max-width: 1279px) {
      }
    `}
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .custom-header {
    display: flex;
    justify-content: space-between;

    margin-bottom: 16px;
    color: #3f3f3f;
    font-family: Poppins;
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
    width: 47px;
    margin: 0;
    padding: 8px 2px;

    color: #3f3f3f;
    text-align: center;
    font-family: Poppins;
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
    padding: 8px;
    gap: 8px;
    flex: 1 0 0;

    color: #aca7c3;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .react-datepicker__day.react-datepicker__day--today {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #7b61ff;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    background-color: white;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 32px;
    width: 47px;
    margin: 0;
    color: #3c3c3c80;
  }

  .react-datepicker__day--selected {
    height: 32px;
    width: 47px;
    padding: 8px;
    border-radius: 0;
    background: #7b61ff;

    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
`;
