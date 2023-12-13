"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  InputName,
  LocationLabel,
  LocationInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventLocationInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../mobX/useStore";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";

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
  if (id) event = eventsStore.getEventById(id as string);

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
      <LocationLabel className={poppins.className}>
        <InputName>{t("locationInput")}</InputName>
        <DeleteIconBox onClick={cleanLocationInput}>
          <SvgDeleteIcon
            isLocationInputValid={isLocationInputValid}
            locationInputValue={locationInputValue}
          />
        </DeleteIconBox>
        <LocationInput
          type="text"
          value={locationInputValue}
          ref={locationInputRef}
          isLocationInputCompleted={isLocationInputCompleted}
          isLocationInputValid={isLocationInputValid}
          onChange={handleLocationInputChange}
          locationInputValue={locationInputValue}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {!isLocationInputValid && (
          <InvalidInputWarning className={poppins.className}>
            Invalid input
          </InvalidInputWarning>
        )}
      </LocationLabel>
    </StyleSheetManager>
  );
};
