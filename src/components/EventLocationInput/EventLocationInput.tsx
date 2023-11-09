import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  LocationLabel,
  LocationInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventLocationInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../hooks/useStore";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "locationInputValue" &&
    prop !== "isLocationInputValid" &&
    prop !== "isLocationInputCompleted"
  );
};

export const EventLocationInput: FC = (): JSX.Element => {
  const [locationInputValue, setLocationInputValue] = useState<string>("");
  const [isLocationInputValid, setIsLocationInputValid] =
    useState<boolean>(true);
  const [isLocationInputCompleted, setIsLocationInputCompleted] =
    useState<boolean>(false);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { setFormValues, eventsStore } = useStore();
  const { id } = useParams();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.location) {
      setFormValues.setLocation(event.location);
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
    setFormValues.setLocation(location);
  };

  const cleanLocationInput = (): void => {
    setLocationInputValue("");
    setFormValues.setLocation("");
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
