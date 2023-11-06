import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  DescriptionTextArea,
  DescriptionLabel,
  SvgDeleteIcon,
} from "./EventDescriptionInput.styled";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";
import { useTranslation } from "react-i18next";

interface DescriptionInputProps {
  setDescription: (description: string) => void;
  event: NewEvent;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "descriptionInputValue" && prop !== "isDescriptionInputCompleted"
  );
};

export const EventDescriptionInput: FC<DescriptionInputProps> = ({
  setDescription,
  event,
}): JSX.Element => {
  const [descriptionInputValue, setDescriptionInputValue] =
    useState<string>("");
  const [isDescriptionInputCompleted, setIsDescriptionInputCompleted] =
    useState<boolean>(false);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.description) {
      setDescription(event.description);
      setDescriptionInputValue(event.description);
    }
  }, [event]);

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
    setDescriptionInputValue(e.target.value);
    setDescription(e.target.value);
  };

  const cleanDescriptionInput = (): void => {
    setDescriptionInputValue("");
    setDescription("");
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DescriptionLabel>
        <InputName>{t("descriptionInput")}</InputName>
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
          placeholder={t("formInputPlaceholder")}
        />
      </DescriptionLabel>
    </StyleSheetManager>
  );
};
