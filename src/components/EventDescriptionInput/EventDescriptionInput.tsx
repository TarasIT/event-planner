import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import Sprite from "../../assets/images/sprite.svg";
import {
  InputName,
  DescriptionTextArea,
  DescriptionLabel,
  SvgDeleteIcon,
} from "./EventDescriptionInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../hooks/useStore";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "descriptionInputValue" && prop !== "isDescriptionInputCompleted"
  );
};

export const EventDescriptionInput: FC = (): JSX.Element => {
  const [descriptionInputValue, setDescriptionInputValue] =
    useState<string>("");
  const [isDescriptionInputCompleted, setIsDescriptionInputCompleted] =
    useState<boolean>(false);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
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
    if (event && event.description) {
      setFormValues.setDescription(event.description);
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
    setFormValues.setDescription(e.target.value);
  };

  const cleanDescriptionInput = (): void => {
    setDescriptionInputValue("");
    setFormValues.setDescription("");
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
