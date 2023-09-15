import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  TitleLabel,
  TitleInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventTitleInput.styled";

export const EventTitleInput: FC = (): JSX.Element => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [isTitleInputValid, setIsTitleInputValid] = useState<boolean>(true);
  const [isTitleInputCompleted, setIsTitleInputCompleted] =
    useState<boolean>(false);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    if (titleInputRef.current !== e.target) {
      setIsTitleInputCompleted(true);
    } else {
      setIsTitleInputCompleted(false);
    }
  };

  const cleanTitleInput = (): void => {
    setTitleInputValue("");
    setIsTitleInputValid(true);
  };

  const validateInput = (inputValue: string): boolean => {
    const hasComasAndDots = /[.,]/.test(inputValue);
    if (hasComasAndDots) {
      return false;
    } else {
      return true;
    }
  };

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!validateInput(e.target.value.trim())) {
      setIsTitleInputValid(false);
    } else {
      setIsTitleInputValid(true);
    }
    setTitleInputValue(e.target.value.trim());
  };

  return (
    <TitleLabel>
      <InputName>Title</InputName>
      <SvgDeleteIcon
        onClick={cleanTitleInput}
        isTitleInputValid={isTitleInputValid}
        titleInputValue={titleInputValue}
      >
        <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
      </SvgDeleteIcon>
      <TitleInput
        type="text"
        value={titleInputValue}
        ref={titleInputRef}
        isTitleInputCompleted={isTitleInputCompleted}
        isTitleInputValid={isTitleInputValid}
        onChange={handleTitleInputChange}
        titleInputValue={titleInputValue}
        placeholder="input"
      />
      {!isTitleInputValid && (
        <InvalidInputWarning>Invalid input</InvalidInputWarning>
      )}
    </TitleLabel>
  );
};
