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
import { parse } from "date-fns";
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
import { useStore } from "../../mobX/useStore";
import { toast } from "react-toastify";
import { observer } from "mobx-react";

interface CalendarContainerProps {
  children: ReactNode;
}

interface DatePickerState {
  preSelection: Date;
}

interface CustomInputProps {
  onClick?: () => void;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "selectedDate" && prop !== "isCalendarOpened" && prop !== "value"
  );
};

export const EventDateInput: FC = observer((): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
  const datePickerRef = useRef<DatePicker | null>(null);
  const { t, i18n } = useTranslation();
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.date) {
      const date = parse(event.date, "dd/MM/yyyy", new Date());
      setSelectedDate(date);
    }
  }, [id, eventsStore.event]);

  const handleDateChoose = (): void => {
    if (datePickerRef.current) {
      const state = datePickerRef.current.state as DatePickerState;
      const choosenDate: Readonly<Date> = state.preSelection;

      const inputDate = new Date(choosenDate);

      const day = String(inputDate.getDate()).padStart(2, "0");
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");

      if (
        inputDate.getDate() === parseInt(day, 10) &&
        inputDate.getMonth() + 1 === parseInt(month, 10)
      ) {
        setSelectedDate(inputDate);
        datePickerRef.current.setOpen(false);
      } else {
        toast.error("Invalid day or month value");
      }
    } else {
      toast.error("DatePicker reference is not defined");
    }
  };

  const handleDateChange = (date: Date | null): void => {
    if (date) {
      setSelectedDate(date);
      eventDataStore.setDate(date.toISOString().split("T")[0]);
    }
  };

  const handleDateCancel = (): void => {
    setSelectedDate(null);
    datePickerRef.current && datePickerRef.current.setOpen(false);
  };

  const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
    ({ onClick }, ref): JSX.Element => {
      const [formattedDate, setFormattedDate] = useState<string>("");

      useEffect(() => {
        if (selectedDate && typeof selectedDate !== "string") {
          const day = String(selectedDate.getDate()).padStart(2, "0");
          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const year = String(selectedDate.getFullYear());

          const formatted = `${day}/${month}/${year}`;
          setFormattedDate(formatted);
          eventDataStore.setDate(formatted);
        } else if (typeof selectedDate === "string") {
          setFormattedDate(selectedDate);
          eventDataStore.setDate(selectedDate);
        }
      }, [selectedDate, eventDataStore]);

      return (
        <CustomDatePicker selectedDate={selectedDate} onClick={onClick}>
          <TextInput
            selectedDate={selectedDate}
            isCalendarOpened={isCalendarOpened}
            className={poppins.className}
          >
            {selectedDate
              ? formattedDate
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
          onChange={handleDateChange}
          selected={selectedDate as Date | null}
          formatWeekDay={(day: string): string => t(`weekDays.${day}`)}
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
              fn: (state: any): void => {
                if (state && state.styles && state.styles.popper) {
                  state.styles.popper.padding = "0";
                }
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
});
