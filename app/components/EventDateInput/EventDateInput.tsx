"use client";

import React, {
  FC,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import {
  DateBox,
  SvgDecreaseMonthIcon,
  SvgIncreaseMonthIcon,
  SvgDateIcon,
  DateIconBox,
  DatePickerWrapper,
  InputName,
  CustomDatePicker,
  TextInput,
  ChooseBtn,
  CancelBtn,
  BtnsBox,
  ChangeMonthIcon,
} from "./EventDateInput.styled";
import { poppins } from "@/app/assets/fonts";
import { NewEvent } from "../../types/types";
import { useStore } from "../../mobX/useStore";

interface CalendarContainerProps {
  children: ReactNode;
}

interface CustomInputProps {
  onClick?: () => void;
}

interface PopperStateProps {
  state: { styles: { popper: { padding: string } } };
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "selectedDate" && prop !== "isCalendarOpened" && prop !== "value"
  );
};

export const EventDateInput: FC = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
  const datePickerRef = useRef<typeof DatePicker>();
  const { t, i18n } = useTranslation();
  const { setFormValues, eventsStore } = useStore();
  const { id } = useParams();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id as string);

  useEffect(() => {
    if (event && event.date) {
      setSelectedDate(new Date(event.date));
      setFormValues.setDate(event.date);
    }
  }, [event && event.date]);

  const handleDateChoose = (): void => {
    const choosenDate = datePickerRef.current.state.preSelection;
    const inputDate = new Date(choosenDate);

    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");

    if (
      inputDate.getDate() === parseInt(day, 10) &&
      inputDate.getMonth() + 1 === parseInt(month, 10)
    ) {
      setSelectedDate(inputDate);
      setFormValues.setDate(inputDate.toString());
      datePickerRef.current.setOpen(false);
    } else {
      console.error("Invalid day or month value");
    }
  };

  const handleDateCancel = (): void => {
    setSelectedDate(null);
    datePickerRef.current.setOpen(false);
  };

  const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ onClick }, ref): JSX.Element => {
      let formattedDate = "";

      if (selectedDate) {
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const year = String(selectedDate.getFullYear());

        formattedDate = `${day}/${month}/${year}`;
      }

      return (
        <CustomDatePicker selectedDate={selectedDate} onClick={onClick}>
          <TextInput
            selectedDate={selectedDate}
            isCalendarOpened={isCalendarOpened}
            className={poppins.className}
          >
            {selectedDate
              ? `${formattedDate}`
              : isCalendarOpened
              ? t("selectDate")
              : t("formInputPlaceholder")}
          </TextInput>
        </CustomDatePicker>
      );
    }
  );

  const CalendarContainer: FC<CalendarContainerProps> = ({
    children,
  }): JSX.Element => {
    return (
      <DatePickerWrapper
        isCalendarOpened={isCalendarOpened}
        selectedDate={selectedDate}
        className={poppins.className}
      >
        {children}
        <BtnsBox>
          <CancelBtn
            type="button"
            onClick={handleDateCancel}
            className={poppins.className}
          >
            {t("cancelDateBtn")}
          </CancelBtn>
          <ChooseBtn
            type="button"
            onClick={handleDateChoose}
            className={poppins.className}
          >
            {t("chooseDateBtn")}
          </ChooseBtn>
        </BtnsBox>
      </DatePickerWrapper>
    );
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DateBox>
        <InputName className={poppins.className}>{t("dateInput")}</InputName>

        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          formatWeekDay={(day: string): string => t(`weekDays.${day}`)}
          isCalendarOpened={isCalendarOpened}
          onCalendarClose={() => setIsCalendarOpened(false)}
          onCalendarOpen={() => {
            setIsCalendarOpened(true);
            setSelectedDate(null);
          }}
          showPopperArrow={false}
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
          customInput={<CustomInput />}
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
              <ChangeMonthIcon onClick={decreaseMonth}>
                <SvgDecreaseMonthIcon className="custom-arrow" size="0.825em" />
              </ChangeMonthIcon>

              <span className="custom-month-year">
                {i18n.language === "en"
                  ? date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : date.toLocaleDateString("uk-UA", {
                      month: "long",
                      year: "numeric",
                    })}
              </span>

              <ChangeMonthIcon onClick={increaseMonth}>
                <SvgIncreaseMonthIcon className="custom-arrow" size="0.825em" />
              </ChangeMonthIcon>
            </div>
          )}
        />
        <DateIconBox>
          <SvgDateIcon isCalendarOpened={isCalendarOpened} size="0.825em" />
        </DateIconBox>
      </DateBox>
    </StyleSheetManager>
  );
};
