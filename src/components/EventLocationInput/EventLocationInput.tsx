import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  LocationLabel,
  LocationInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventLocationInput.styled";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";
import { useTranslation } from "react-i18next";

interface LocationInputProps {
  setLocation: (location: string) => void;
  event: NewEvent;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "locationInputValue" &&
    prop !== "isLocationInputValid" &&
    prop !== "isLocationInputCompleted"
  );
};

export const EventLocationInput: FC<LocationInputProps> = ({
  setLocation,
  event,
}): JSX.Element => {
  const [locationInputValue, setLocationInputValue] = useState<string>("");
  const [isLocationInputValid, setIsLocationInputValid] =
    useState<boolean>(true);
  const [isLocationInputCompleted, setIsLocationInputCompleted] =
    useState<boolean>(false);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.location) {
      setLocation(event.location);
      setLocationInputValue(event.location);
    }
  }, [event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (locationInputRef.current !== e.target) {
      setIsLocationInputCompleted(true);
    } else {
      setIsLocationInputCompleted(false);
    }
  };

  const validateInput = (inputValue: string): boolean => {
    const hasComasAndDots = /[.,]/.test(inputValue);
    if (hasComasAndDots) {
      return false;
    } else {
      return true;
    }
  };

  const handleLocationInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const location = e.target.value;
    if (!validateInput(location)) {
      setIsLocationInputValid(false);
    } else {
      setIsLocationInputValid(true);
    }
    setLocationInputValue(location);
    setLocation(location);
  };

  const cleanLocationInput = (): void => {
    setLocationInputValue("");
    setLocation("");
    setIsLocationInputValid(true);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <LocationLabel>
        <InputName>{t("locationInput")}</InputName>
        <SvgDeleteIcon
          onClick={cleanLocationInput}
          isLocationInputValid={isLocationInputValid}
          locationInputValue={locationInputValue}
        >
          <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
        </SvgDeleteIcon>
        <LocationInput
          type="text"
          value={locationInputValue}
          ref={locationInputRef}
          isLocationInputCompleted={isLocationInputCompleted}
          isLocationInputValid={isLocationInputValid}
          onChange={handleLocationInputChange}
          locationInputValue={locationInputValue}
          placeholder={t("formInputPlaceholder")}
          required
        />
        {!isLocationInputValid && (
          <InvalidInputWarning>Invalid input</InvalidInputWarning>
        )}
      </LocationLabel>
    </StyleSheetManager>
  );
};
