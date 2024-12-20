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
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.location) {
      eventDataStore.setLocation(event.location);
      setLocationInputValue(event.location);
    }
  }, [id, eventsStore.event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (locationInputRef.current !== e.target) {
      setIsLocationInputCompleted(true);
    } else {
      setIsLocationInputCompleted(false);
    }
  };

  const validateInput = (inputValue: string): boolean => {
    const hasComasAndDotsAtTheBeginning =
      inputValue[0] === "." || inputValue[0] === ",";
    return hasComasAndDotsAtTheBeginning ? false : true;
  };

  const handleLocationInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const location = e.target.value;

    if (!validateInput(location)) {
      setIsLocationInputValid(false);
      eventDataStore.setIsLocationValid(false);
    } else {
      setIsLocationInputValid(true);
      eventDataStore.setIsLocationValid(true);
    }

    setLocationInputValue(location);
    eventDataStore.setLocation(location.trim() || null);
  };

  const cleanLocationInput = (): void => {
    setLocationInputValue("");
    eventDataStore.setLocation(null);
    setIsLocationInputValid(true);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <LocationLabel className={poppins.className}>
        <InputName>{t("common.eventForm.locationInput")}</InputName>
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
          placeholder={t("common.eventForm.formInputPlaceholder")}
          className={poppins.className}
        />
        {!isLocationInputValid && (
          <InvalidInputWarning className={poppins.className}>
            {t("common.eventForm.invalidInput")}
          </InvalidInputWarning>
        )}
      </LocationLabel>
    </StyleSheetManager>
  );
};
