import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  TitleLabel,
  TitleInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventTitleInput.styled";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";

interface TitleInputProps {
  setTitle: (title: string) => void;
  event: NewEvent;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "titleInputValue" &&
    prop !== "isTitleInputValid" &&
    prop !== "isTitleInputCompleted"
  );
};

export const EventTitleInput: FC<TitleInputProps> = ({
  setTitle,
  event,
}): JSX.Element => {
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

  useEffect(() => {
    if (event && event.title) {
      setTitleInputValue(event.title);
      setTitle(event.title);
    }
  }, [event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (titleInputRef.current !== e.target) {
      setIsTitleInputCompleted(true);
    } else {
      setIsTitleInputCompleted(false);
    }
  };

  const cleanTitleInput = (): void => {
    setTitleInputValue("");
    setTitle("");
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
    const title = e.target.value;

    if (!validateInput(title)) {
      setIsTitleInputValid(false);
    } else {
      setIsTitleInputValid(true);
    }
    setTitleInputValue(title);
    setTitle(title);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
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
          name="title"
          value={titleInputValue}
          ref={titleInputRef}
          isTitleInputCompleted={isTitleInputCompleted}
          isTitleInputValid={isTitleInputValid}
          onChange={handleTitleInputChange}
          titleInputValue={titleInputValue}
          placeholder="input"
          required
        />
        {!isTitleInputValid && (
          <InvalidInputWarning>Invalid input</InvalidInputWarning>
        )}
      </TitleLabel>
    </StyleSheetManager>
  );
};
