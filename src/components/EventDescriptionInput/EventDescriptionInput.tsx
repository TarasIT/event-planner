import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assest/images/sprite.svg";
import {
  InputName,
  DescriptionTextArea,
  DescriptionLabel,
  SvgDeleteIcon,
} from "./EventDescriptionInput.styled";

export const EventDescriptionInput: FC = (): JSX.Element => {
  const [descriptionInputValue, setDescriptionInputValue] =
    useState<string>("");
  const [isDescriptionInputCompleted, setIsDescriptionInputCompleted] =
    useState<boolean>(false);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    if (descriptionTextAreaRef.current !== e.target) {
      setIsDescriptionInputCompleted(true);
    } else {
      setIsDescriptionInputCompleted(false);
    }
  };

  const handleDescriptionInputChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescriptionInputValue(e.target.value.trim());
  };

  const cleanDescriptionInput = (): void => {
    setDescriptionInputValue("");
  };

  return (
    <DescriptionLabel>
      <InputName>Description</InputName>
      <SvgDeleteIcon
        onClick={cleanDescriptionInput}
        descriptionInputValue={descriptionInputValue}
      >
        <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
      </SvgDeleteIcon>
      <DescriptionTextArea
        value={descriptionInputValue}
        ref={descriptionTextAreaRef}
        isDescriptionInputCompleted={isDescriptionInputCompleted}
        onChange={handleDescriptionInputChange}
        descriptionInputValue={descriptionInputValue}
        rows={4}
        placeholder="input"
      />
    </DescriptionLabel>
  );
};
