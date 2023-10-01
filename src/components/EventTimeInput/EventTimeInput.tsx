import React, { FC, useEffect, useRef, useState } from "react";
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
} from "../EventTimeInput/EventTimeInput.styled";
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";

interface TimeInputProps {
  setTime: (time: string) => void;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "selectedTime" &&
    prop !== "isTimePickerOpened" &&
    prop !== "isHourScrollUp" &&
    prop !== "isMinuteScrollUp" &&
    prop !== "isDayHalfScrollUp"
  );
};

export const EventTimeInput: FC<TimeInputProps> = ({
  setTime,
}): JSX.Element => {
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isTimePickerOpened, setIsTimePickerOpened] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedDayHalf, setSelectedDayHalf] = useState<string>("AM");
  const [isHourScrollUp, setIsHourScrollUp] = useState<boolean | string>(
    "pending"
  );
  const [isMinuteScrollUp, setIsMinuteScrollUp] = useState<boolean | string>(
    "pending"
  );
  const [isDayHalfScrollUp, setIsDayHalfScrollUp] = useState<boolean | string>(
    "pending"
  );
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [touchDeltaY, setTouchDeltaY] = useState<number>(0);

  const timeInputRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLParagraphElement | null>(null);
  const svgInputRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeydown);

    if (timeInputRef.current) {
      timeInputRef.current.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (timeInputRef.current) {
        timeInputRef.current.removeEventListener("wheel", handleScroll);
      }
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(
    () => {
      if (isHourScrollUp === true || !isHourScrollUp) {
        setTimeout(() => setIsHourScrollUp("pending"), 300);
      }
      if (isMinuteScrollUp === true || !isMinuteScrollUp) {
        setTimeout(() => setIsMinuteScrollUp("pending"), 300);
      }
      if (isDayHalfScrollUp === true || !isDayHalfScrollUp) {
        setTimeout(() => setIsDayHalfScrollUp("pending"), 300);
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
        setTime(
          `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
            .toString()
            .padStart(2, "0")} ${selectedDayHalf}`
        );
      }
    },
    [
      isTimePickerOpened,
      isHourScrollUp,
      isMinuteScrollUp,
      isDayHalfScrollUp,
      selectedHour,
      selectedMinute,
      selectedDayHalf,
    ] as const
  );

  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") setIsTimePickerOpened(false);
  };

  const handleClick = (e: MouseEvent): void => {
    if (
      e.target !== timeInputRef.current &&
      e.target !== textInputRef.current &&
      e.target !== svgInputRef.current
    ) {
      setIsTimePickerOpened(false);
    }
  };

  const handleScroll = (e: WheelEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (target.name === "hour") {
      setSelectedHour((value: number) => {
        if (e.deltaY > 0) {
          setIsHourScrollUp(false);
          return value < 12 ? value + 1 : 1;
        } else {
          setIsHourScrollUp(true);
          return value > 1 ? value - 1 : 12;
        }
      });
    }

    if (target.name === "minute") {
      setSelectedMinute((value: number) => {
        if (e.deltaY > 0) {
          setIsMinuteScrollUp(false);
          return value < 59 ? value + 1 : 0;
        } else {
          setIsMinuteScrollUp(true);
          return value > 0 ? value - 1 : 59;
        }
      });
    }

    if (target.name === "dayHalf") {
      setSelectedDayHalf((value: string) => {
        if (e.deltaY > 0) {
          setIsDayHalfScrollUp(false);
          return value === "AM" ? "PM" : "AM";
        } else {
          setIsDayHalfScrollUp(true);
          return value === "AM" ? "PM" : "AM";
        }
      });
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    const target = e.target as HTMLInputElement;

    if (touchStartY !== null) {
      const startСoordinate = Math.ceil(touchStartY);
      const movementСoordinate = Math.ceil(e.touches[0].clientY);
      const delta = startСoordinate - movementСoordinate;
      setTouchDeltaY(delta);
      const scrollSensitivity = 5;

      if (target.name === "hour") {
        if (delta > touchDeltaY) {
          setIsHourScrollUp(true);
          setSelectedHour((value: number) => {
            if (value < 12) {
              return touchDeltaY % scrollSensitivity === 0 ? value + 1 : value;
            } else {
              return 1;
            }
          });
        }
        if (delta < touchDeltaY) {
          setIsHourScrollUp(false);
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
          setIsMinuteScrollUp(true);
          setSelectedMinute((value: number) => {
            if (value < 59) {
              return touchDeltaY % scrollSensitivity === 0 ? value + 1 : value;
            } else {
              return 0;
            }
          });
        }
        if (delta < touchDeltaY) {
          setIsMinuteScrollUp(false);
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
          setIsDayHalfScrollUp(true);
          selectedDayHalf === "AM"
            ? setSelectedDayHalf("PM")
            : setSelectedDayHalf("AM");
        }
        if (delta < touchDeltaY && touchDeltaY % scrollSensitivity === 0) {
          setIsDayHalfScrollUp(false);
          selectedDayHalf === "AM"
            ? setSelectedDayHalf("PM")
            : setSelectedDayHalf("AM");
        }
      }
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <TimeBox>
        <InputName>Select time</InputName>
        <TimeInput
          ref={timeInputRef}
          onClick={() => setIsTimePickerOpened(!isTimePickerOpened)}
          selectedTime={selectedTime}
        >
          <TextInput
            ref={textInputRef}
            selectedTime={selectedTime}
            isTimePickerOpened={isTimePickerOpened}
          >
            {isTimePickerOpened
              ? "Select Time"
              : !selectedTime
              ? "input"
              : selectedTime}
          </TextInput>
          <SvgTimeIcon
            ref={svgInputRef}
            isTimePickerOpened={isTimePickerOpened}
          >
            <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
          </SvgTimeIcon>

          {isTimePickerOpened && (
            <TimePicker isTimePickerOpened={isTimePickerOpened}>
              <TimeItem>
                <UnchoosenTime>
                  <Hour>
                    {selectedMinute > 0 && selectedMinute <= 59
                      ? selectedHour.toString().padStart(2, "0")
                      : selectedHour === 1 && selectedMinute === 0
                      ? 12
                      : (selectedHour - 1).toString().padStart(2, "0")}
                  </Hour>
                  <Minute>
                    {selectedMinute === 0
                      ? 59
                      : (selectedMinute - 1).toString().padStart(2, "0")}
                  </Minute>
                </UnchoosenTime>
              </TimeItem>

              <TimeItem>
                <Selectors>
                  <HourSelector
                    type="text"
                    name="hour"
                    pattern="[1-12]*"
                    value={selectedHour.toString().padStart(2, "0")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedHour(Number(e.target.value));
                    }}
                    onScroll={handleScroll as React.EventHandler<any>}
                    onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                      setTouchStartY(e.touches[0].clientY)
                    }
                    onTouchMove={handleTouchMove as React.EventHandler<any>}
                    onTouchEnd={() => setTouchStartY(0)}
                    isHourScrollUp={isHourScrollUp}
                    readOnly
                  />

                  <Divider>:</Divider>

                  <MinuteSelector
                    type="text"
                    name="minute"
                    pattern="[0-59]*"
                    onScroll={handleScroll as React.EventHandler<any>}
                    value={selectedMinute.toString().padStart(2, "0")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedMinute(Number(e.target.value));
                    }}
                    onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                      setTouchStartY(e.touches[0].clientY)
                    }
                    onTouchMove={handleTouchMove as React.EventHandler<any>}
                    onTouchEnd={() => setTouchStartY(0)}
                    isMinuteScrollUp={isMinuteScrollUp}
                    readOnly
                  />
                </Selectors>
                <DayHalfSelector
                  type="text"
                  name="dayHalf"
                  onScroll={handleScroll as React.EventHandler<any>}
                  value={selectedDayHalf}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSelectedDayHalf(e.target.value);
                  }}
                  onTouchStart={(e: React.TouchEvent<HTMLInputElement>) =>
                    setTouchStartY(e.touches[0].clientY)
                  }
                  onTouchMove={handleTouchMove as React.EventHandler<any>}
                  onTouchEnd={() => setTouchStartY(0)}
                  isDayHalfScrollUp={isDayHalfScrollUp}
                  readOnly
                />
              </TimeItem>

              <TimeItem>
                <UnchoosenTime>
                  <Hour>
                    {selectedMinute === 59
                      ? selectedHour === 12
                        ? "01"
                        : (selectedHour + 1).toString().padStart(2, "0")
                      : selectedHour.toString().padStart(2, "0")}
                  </Hour>
                  <Minute>
                    {selectedMinute === 59
                      ? "00"
                      : (selectedMinute + 1).toString().padStart(2, "0")}
                  </Minute>
                </UnchoosenTime>
                <DayHalf>{selectedDayHalf === "AM" ? "PM" : "AM"}</DayHalf>
              </TimeItem>
            </TimePicker>
          )}
        </TimeInput>
      </TimeBox>
    </StyleSheetManager>
  );
};
