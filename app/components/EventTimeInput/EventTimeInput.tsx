"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  TimeBox,
  TimeInput,
  TimePicker,
  SvgTimeIcon,
  TextInput,
  InputName,
  Selectors,
  HourSelector,
  DayHalfSelector,
  Minute,
  Hour,
  DayHalf,
  Divider,
  UnchoosenTime,
  TimeItem,
  MinuteSelector,
  TimeIconContainer,
} from "../EventTimeInput/EventTimeInput.styled";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import { morning, evening } from "../../data/dayHalf";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { localizeTimeOfDay } from "@/app/services/localizeTimeOfDay";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "selectedTime" &&
    prop !== "isTimePickerOpened" &&
    prop !== "isHourAscending" &&
    prop !== "isMinuteAscending" &&
    prop !== "isDayHalfAscending"
  );
};

export const EventTimeInput: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isTimePickerOpened, setIsTimePickerOpened] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedDayHalf, setSelectedDayHalf] = useState<string>(morning);
  const [localizedDayHalf, setLocalizedDayHalf] = useState<string>(morning);
  const [localizedUnchoosenDayHalf, setLocalizedUnchoosenDayHalf] =
    useState<string>();
  const [isHourAscending, setIsHourAscending] = useState<boolean | string>(
    "pending"
  );
  const [isMinuteAscending, setIsMinuteAscending] = useState<boolean | string>(
    "pending"
  );
  const [isDayHalfAscending, setIsDayHalfAscending] = useState<
    boolean | string
  >("pending");
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [touchDeltaY, setTouchDeltaY] = useState<number>(0);

  const timeBoxRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLParagraphElement | null>(null);

  const { id } = useParams();
  const { eventDataStore, eventsStore } = useStore();

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.time) {
      setSelectedTime(event.time);
      eventDataStore.setTime(event.time);
    }

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeydown);

    if (timeBoxRef.current) {
      timeBoxRef.current.addEventListener("wheel", selectTimeByScroll);
    }

    return () => {
      if (timeBoxRef.current) {
        timeBoxRef.current.removeEventListener("wheel", selectTimeByScroll);
      }
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (isHourAscending === true || !isHourAscending) {
      setTimeout(() => setIsHourAscending("pending"), 300);
    }
    if (isMinuteAscending === true || !isMinuteAscending) {
      setTimeout(() => setIsMinuteAscending("pending"), 300);
    }
    if (isDayHalfAscending === true || !isDayHalfAscending) {
      setTimeout(() => setIsDayHalfAscending("pending"), 300);
    }
    if (
      isTimePickerOpened &&
      (selectedHour ||
        selectedMinute ||
        selectedMinute === 0 ||
        selectedDayHalf)
    ) {
      setSelectedTime(
        `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
          .toString()
          .padStart(2, "0")} ${selectedDayHalf}`
      );
      eventDataStore.setTime(
        `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
          .toString()
          .padStart(2, "0")} ${selectedDayHalf}`
      );
    }

    setLocalizedDayHalf(
      t(
        localizeTimeOfDay(
          `${selectedHour}:${selectedMinute} ${selectedDayHalf}`
        )
      )
    );
    setLocalizedUnchoosenDayHalf(
      t(
        localizeTimeOfDay(
          `${selectedHour}:${selectedMinute} ${
            selectedDayHalf === morning ? evening : morning
          }`
        )
      )
    );
  }, [
    isTimePickerOpened,
    isHourAscending,
    isMinuteAscending,
    isDayHalfAscending,
    selectedHour,
    selectedMinute,
    selectedDayHalf,
    t,
  ]);

  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") setIsTimePickerOpened(false);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (timeBoxRef.current && !timeBoxRef.current.contains(e.target as Node)) {
      setIsTimePickerOpened(false);
    }
  };

  const selectTimeByScroll = (e: WheelEvent): void => {
    const target = e.target as HTMLInputElement;

    if (target.name === "hour") {
      e.preventDefault();
      setSelectedHour((value: number) => {
        if (e.deltaY > 0) {
          setIsHourAscending(false);
          return value < 12 ? value + 1 : 1;
        } else {
          setIsHourAscending(true);
          return value > 1 ? value - 1 : 12;
        }
      });
    }

    if (target.name === "minute") {
      e.preventDefault();
      setSelectedMinute((value: number) => {
        if (e.deltaY > 0) {
          setIsMinuteAscending(false);
          return value < 59 ? value + 1 : 0;
        } else {
          setIsMinuteAscending(true);
          return value > 0 ? value - 1 : 59;
        }
      });
    }

    if (target.name === "dayHalf") {
      e.preventDefault();
      setSelectedDayHalf((value: string) => {
        if (e.deltaY > 0) {
          setIsDayHalfAscending(false);
          return value === morning ? evening : morning;
        } else {
          setIsDayHalfAscending(true);
          return value === morning ? evening : morning;
        }
      });
    }
  };

  const selectTimeByClick = (
    e: React.MouseEvent<HTMLParagraphElement>
  ): void => {
    e.preventDefault();
    switch (e.currentTarget.id) {
      case "hour-descending":
        setSelectedHour((value: number) => {
          setIsHourAscending(false);
          return value > 1 ? value - 1 : 12;
        });
        break;
      case "hour-ascending":
        setSelectedHour((value: number) => {
          setIsHourAscending(true);
          return value < 12 ? value + 1 : 1;
        });
        break;
      case "minute-descending":
        setSelectedMinute((value: number) => {
          setIsMinuteAscending(false);
          return value > 0 ? value - 1 : 59;
        });
        break;
      case "minute-ascending":
        setSelectedMinute((value: number) => {
          setIsMinuteAscending(true);
          return value < 59 ? value + 1 : 0;
        });
        break;
    }
  };

  const selectDayHalfByClick = (
    e: React.MouseEvent<HTMLParagraphElement>
  ): void => {
    e.preventDefault();
    setSelectedDayHalf((value: string) => {
      setIsDayHalfAscending(!isDayHalfAscending);
      return value === morning ? evening : morning;
    });
  };

  const selectTimeByTouch = (e: TouchEvent): void => {
    const target = e.target as HTMLInputElement;

    if (touchStartY !== null) {
      const startСoordinate = Math.ceil(touchStartY);
      const movementСoordinate = Math.ceil(e.touches[0].clientY);
      const delta = startСoordinate - movementСoordinate;
      setTouchDeltaY(delta);
      const scrollSensitivity = 5;

      if (target.name === "hour") {
        if (delta > touchDeltaY) {
          setIsHourAscending(true);
          setSelectedHour((value: number) => {
            if (value < 12) {
              return touchDeltaY % scrollSensitivity === 0 ? value + 1 : value;
            } else {
              return 1;
            }
          });
        }
        if (delta < touchDeltaY) {
          setIsHourAscending(false);
          setSelectedHour((value: number) => {
            if (value > 1) {
              return touchDeltaY % scrollSensitivity === 0 ? value - 1 : value;
            } else {
              return 12;
            }
          });
        }
      }

      if (target.name === "minute") {
        if (delta > touchDeltaY) {
          setIsMinuteAscending(true);
          setSelectedMinute((value: number) => {
            if (value < 59) {
              return touchDeltaY % scrollSensitivity === 0 ? value + 1 : value;
            } else {
              return 0;
            }
          });
        }
        if (delta < touchDeltaY) {
          setIsMinuteAscending(false);
          setSelectedMinute((value: number) => {
            if (value > 0) {
              return touchDeltaY % scrollSensitivity === 0 ? value - 1 : value;
            } else {
              return 59;
            }
          });
        }
      }

      if (target.name === "dayHalf") {
        if (delta > touchDeltaY && touchDeltaY % scrollSensitivity === 0) {
          setIsDayHalfAscending(true);
          selectedDayHalf === morning
            ? setSelectedDayHalf(evening)
            : setSelectedDayHalf(morning);
        }
        if (delta < touchDeltaY && touchDeltaY % scrollSensitivity === 0) {
          setIsDayHalfAscending(false);
          selectedDayHalf === morning
            ? setSelectedDayHalf(evening)
            : setSelectedDayHalf(morning);
        }
      }
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <TimeBox ref={timeBoxRef}>
        <InputName className={poppins.className}>
          {t("common.eventForm.timeInput")}
        </InputName>
        <TimeInput
          onClick={() => setIsTimePickerOpened(true)}
          selectedTime={selectedTime}
        >
          <TextInput
            ref={textInputRef}
            selectedTime={selectedTime}
            isTimePickerOpened={isTimePickerOpened}
            className={poppins.className}
          >
            {isTimePickerOpened
              ? t("common.eventForm.selectTime")
              : !selectedTime
              ? t("common.eventForm.formInputPlaceholder")
              : `${selectedTime.slice(0, -3)} ${localizedDayHalf}`}
          </TextInput>
          <TimeIconContainer>
            <SvgTimeIcon
              isTimePickerOpened={isTimePickerOpened}
              size="0.825em"
            />
          </TimeIconContainer>
          {isTimePickerOpened && (
            <TimePicker isTimePickerOpened={isTimePickerOpened}>
              <TimeItem className={poppins.className}>
                <UnchoosenTime>
                  <Hour id="hour-descending" onClick={selectTimeByClick}>
                    {selectedMinute > 0 && selectedMinute <= 59
                      ? selectedHour.toString().padStart(2, "0")
                      : selectedHour === 1 && selectedMinute === 0
                      ? 12
                      : (selectedHour - 1).toString().padStart(2, "0")}
                  </Hour>
                  <Minute id="minute-descending" onClick={selectTimeByClick}>
                    {selectedMinute === 0
                      ? 59
                      : (selectedMinute - 1).toString().padStart(2, "0")}
                  </Minute>
                </UnchoosenTime>
              </TimeItem>

              <TimeItem className={poppins.className}>
                <Selectors>
                  <HourSelector
                    type="text"
                    name="hour"
                    pattern="[1-12]*"
                    value={selectedHour.toString().padStart(2, "0")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedHour(Number(e.target.value));
                    }}
                    onScroll={selectTimeByScroll as React.EventHandler<any>}
                    onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                      setTouchStartY(e.touches[0].clientY)
                    }
                    onTouchMove={selectTimeByTouch as React.EventHandler<any>}
                    onTouchEnd={() => setTouchStartY(0)}
                    isHourAscending={isHourAscending}
                    className={poppins.className}
                    readOnly
                  />

                  <Divider className={poppins.className}>:</Divider>

                  <MinuteSelector
                    type="text"
                    name="minute"
                    pattern="[0-59]*"
                    onScroll={selectTimeByScroll as React.EventHandler<any>}
                    value={selectedMinute.toString().padStart(2, "0")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedMinute(Number(e.target.value));
                    }}
                    onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                      setTouchStartY(e.touches[0].clientY)
                    }
                    onTouchMove={selectTimeByTouch as React.EventHandler<any>}
                    onTouchEnd={() => setTouchStartY(0)}
                    isMinuteAscending={isMinuteAscending}
                    className={poppins.className}
                    readOnly
                  />
                </Selectors>
                <DayHalfSelector
                  type="text"
                  name="dayHalf"
                  onScroll={selectTimeByScroll as React.EventHandler<any>}
                  value={localizedDayHalf}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSelectedDayHalf(e.target.value);
                  }}
                  onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                    setTouchStartY(e.touches[0].clientY)
                  }
                  onTouchMove={selectTimeByTouch as React.EventHandler<any>}
                  onTouchEnd={() => setTouchStartY(0)}
                  className={poppins.className}
                  isDayHalfAscending={isDayHalfAscending}
                  readOnly
                />
              </TimeItem>

              <TimeItem className={poppins.className}>
                <UnchoosenTime>
                  <Hour id="hour-ascending" onClick={selectTimeByClick}>
                    {selectedMinute === 59
                      ? selectedHour === 12
                        ? "01"
                        : (selectedHour + 1).toString().padStart(2, "0")
                      : selectedHour.toString().padStart(2, "0")}
                  </Hour>
                  <Minute id="minute-ascending" onClick={selectTimeByClick}>
                    {selectedMinute === 59
                      ? "00"
                      : (selectedMinute + 1).toString().padStart(2, "0")}
                  </Minute>
                </UnchoosenTime>
                <DayHalf id="dayHalf" onClick={selectDayHalfByClick}>
                  {localizedUnchoosenDayHalf}
                </DayHalf>
              </TimeItem>
            </TimePicker>
          )}
        </TimeInput>
      </TimeBox>
    </StyleSheetManager>
  );
};
