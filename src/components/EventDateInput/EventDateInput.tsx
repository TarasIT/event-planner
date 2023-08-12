import React, { FC, ReactNode, forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  DateBox,
  SvgDecreaseMonthIcon,
  SvgIncreaseMonthIcon,
  SvgDateIcon,
  DatePickerWrapper,
  InputName,
  CustomDatePicker,
  TextInput,
  ChooseBtn,
  CancelBtn,
  BtnsBox,
} from "./EventDateInput.styled";
import Sprite from "../../assest/images/sprite.svg";

interface CalendarContainerProps {
  children: ReactNode;
}

interface CustomInputProps {
  value: Date | null;
  onClick?: () => void;
}

interface PopperStateProps {
  state: { styles: { popper: { padding: string } } };
}

export const EventDateInput: FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
  const datePickerRef = useRef<typeof DatePicker>();

  const handleDateChoose = (): void => {
    const choosenDate = datePickerRef.current.state.preSelection;
    setSelectedDate(choosenDate);
    datePickerRef.current.setOpen(false);
  };

  const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ value, onClick }, ref) => {
      return (
        <CustomDatePicker
          selectedDate={selectedDate}
          onClick={onClick}
          ref={ref}
        >
          <TextInput
            selectedDate={selectedDate}
            isCalendarOpened={isCalendarOpened}
          >
            {value
              ? value.toString()
              : isCalendarOpened
              ? "Select Date"
              : "input"}
          </TextInput>
          <SvgDateIcon isCalendarOpened={isCalendarOpened}>
            <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
          </SvgDateIcon>
        </CustomDatePicker>
      );
    }
  );

  const CalendarContainer: FC<CalendarContainerProps> = ({
    children,
  }): JSX.Element => (
    <DatePickerWrapper>
      {children}
      <BtnsBox>
        <CancelBtn type="button" onClick={() => setSelectedDate(null)}>
          Cancel
        </CancelBtn>
        <ChooseBtn type="button" onClick={handleDateChoose}>
          Choose date
        </ChooseBtn>
      </BtnsBox>
    </DatePickerWrapper>
  );

  return (
    <DateBox>
      <InputName>Date</InputName>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        isCalendarOpened={isCalendarOpened}
        onCalendarClose={() => setIsCalendarOpened(false)}
        onCalendarOpen={() => setIsCalendarOpened(true)}
        showPopperArrow={false}
        useWeekdaysShort={true}
        shouldCloseOnSelect={false}
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "applyPadding",
            enabled: true,
            phase: "beforeWrite",
            fn: ({ state }: PopperStateProps) => {
              state.styles.popper.padding = "0";
            },
          },
        ]}
        calendarContainer={CalendarContainer}
        customInput={<CustomInput value={selectedDate} />}
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
    </DateBox>
  );
};
