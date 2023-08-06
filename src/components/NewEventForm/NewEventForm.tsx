import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assest/images/sprite.svg";
import {
  CreateEventForm,
  Title,
  TitleLabel,
  TitleInput,
  SvgDeleteIcon,
  InvalidInputTitle,
  SvgSelectIcon,
} from "./NewEventForm.styled";

export const NewEventForm: FC = (): JSX.Element => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [isTitleIputValid, setIsTitleIputValid] = useState<boolean>(true);
  const [isTitleIputCompleted, setIsIputCompleted] = useState<boolean>(false);
  const titleIputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideTitleInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTitleInput);
    };
  }, []);

  const handleClickOutsideTitleInput = (e: MouseEvent): void => {
    if (titleIputRef.current !== e.target) {
      setIsIputCompleted(true);
    } else {
      setIsIputCompleted(false);
    }
  };

  const cleanTitleInput = (): void => {
    setTitleInputValue("");
    setIsTitleIputValid(true);
  };

  const validateIput = (inputValue: string): boolean => {
    const hasComasAndDots = /[.,]/.test(inputValue);
    if (hasComasAndDots) {
      return false;
    } else {
      return true;
    }
  };

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!validateIput(e.target.value.trim())) {
      setIsTitleIputValid(false);
    } else {
      setIsTitleIputValid(true);
    }
    setTitleInputValue(e.target.value.trim());
  };

  return (
    <CreateEventForm>
      <TitleLabel>
        <Title>Title</Title>
        {/* <SvgSelectIcon>
          <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
        </SvgSelectIcon> */}
        <SvgDeleteIcon
          onClick={cleanTitleInput}
          isTitleIputValid={isTitleIputValid}
          titleInputValue={titleInputValue}
        >
          <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
        </SvgDeleteIcon>
        <TitleInput
          type="text"
          value={titleInputValue}
          ref={titleIputRef}
          isTitleIputCompleted={isTitleIputCompleted}
          isTitleIputValid={isTitleIputValid}
          onChange={handleTitleInputChange}
          titleInputValue={titleInputValue}
          placeholder="input"
        />
        {!isTitleIputValid && (
          <InvalidInputTitle>Invalid input</InvalidInputTitle>
        )}
      </TitleLabel>
    </CreateEventForm>
  );
};
