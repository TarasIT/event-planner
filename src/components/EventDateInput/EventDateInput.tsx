import React, { FC, useRef, useState } from "react";
import {
  StyledDatePicker,
  DateBox,
  SvgDecreaseMonthIcon,
  SvgIncreaseMonthIcon,
  SvgDateIcon,
  DatePickerWrapper,
  InputName,
} from "./EventDateInput.styled";
import Sprite from "../../assest/images/sprite.svg";

export const EventDateInput: FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);

  const handleSvgClick = () => setIsCalendarOpened(!isCalendarOpened);

  return (
    <DateBox>
      <SvgDateIcon onClick={handleSvgClick} isCalendarOpened={isCalendarOpened}>
        <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
      </SvgDateIcon>
      <InputName>Date</InputName>
      <DatePickerWrapper>
        <StyledDatePicker
          selectedDate={selectedDate}
          isCalendarOpened={isCalendarOpened}
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          placeholderText={isCalendarOpened ? "Select Date" : "input"}
          onCalendarClose={() => setIsCalendarOpened(false)}
          onCalendarOpen={() => setIsCalendarOpened(true)}
          showPopperArrow={false}
          formatWeekDay={(day: string) => day.slice(0, 3)}
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }: {
            date: Date;
            decreaseMonth: () => void;
            increaseMonth: () => void;
            prevMonthButtonDisabled: boolean;
            nextMonthButtonDisabled: boolean;
          }) => (
            <div className="custom-header">
              <SvgDecreaseMonthIcon
                onClick={decreaseMonth}
                className="custom-arrow"
              >
                <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
              </SvgDecreaseMonthIcon>
              <span className="custom-month-year">
                {date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <SvgIncreaseMonthIcon
                onClick={increaseMonth}
                className="custom-arrow"
              >
                <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
              </SvgIncreaseMonthIcon>
            </div>
          )}
        />
      </DatePickerWrapper>
    </DateBox>
  );
};
