import React, {
  FC,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
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
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useStore } from "../../hooks/useStore";
import { useParams } from "react-router-dom";

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
  if (id) event = eventsStore.getEventById(id);

  useEffect(() => {
    if (event && event.date) {
      setSelectedDate(new Date(event.date));
      setFormValues.setDate(event.date);
    }
  }, [event]);

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
      >
        {children}
        <BtnsBox>
          <CancelBtn type="button" onClick={handleDateCancel}>
            {t("cancelDateBtn")}
          </CancelBtn>
          <ChooseBtn type="button" onClick={handleDateChoose}>
            {t("chooseDateBtn")}
          </ChooseBtn>
        </BtnsBox>
      </DatePickerWrapper>
    );
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DateBox>
        <InputName>{t("dateInput")}</InputName>

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
              <SvgDecreaseMonthIcon
                onClick={decreaseMonth}
                className="custom-arrow"
              >
                <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
              </SvgDecreaseMonthIcon>
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
              <SvgIncreaseMonthIcon
                onClick={increaseMonth}
                className="custom-arrow"
              >
                <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
              </SvgIncreaseMonthIcon>
            </div>
          )}
        />
        <SvgDateIcon isCalendarOpened={isCalendarOpened}>
          <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
        </SvgDateIcon>
      </DateBox>
    </StyleSheetManager>
  );
};
