import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  LocationLabel,
  LocationInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventLocationInput.styled";

export const EventLocationInput: FC = (): JSX.Element => {
  const [locationInputValue, setLocationInputValue] = useState<string>("");
  const [isLocationInputValid, setIsLocationInputValid] =
    useState<boolean>(true);
  const [isLocationInputCompleted, setIsLocationInputCompleted] =
    useState<boolean>(false);
  const locationInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    if (!validateInput(e.target.value.trim())) {
      setIsLocationInputValid(false);
    } else {
      setIsLocationInputValid(true);
    }
    setLocationInputValue(e.target.value.trim());
  };

  const cleanLocationInput = (): void => {
    setLocationInputValue("");
    setIsLocationInputValid(true);
  };

  return (
    <LocationLabel>
      <InputName>Location</InputName>
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
        placeholder="input"
      />
      {!isLocationInputValid && (
        <InvalidInputWarning>Invalid input</InvalidInputWarning>
      )}
    </LocationLabel>
  );
};
