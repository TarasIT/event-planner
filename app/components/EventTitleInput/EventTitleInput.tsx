"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  InputName,
  TitleLabel,
  TitleInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EventTitleInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "titleInputValue" &&
    prop !== "isTitleInputValid" &&
    prop !== "isTitleInputCompleted"
  );
};

export const EventTitleInput: FC = (): JSX.Element => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [isTitleInputValid, setIsTitleInputValid] = useState<boolean>(true);
  const [isTitleInputCompleted, setIsTitleInputCompleted] =
    useState<boolean>(false);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { id } = useParams();
  const { setFormValues, eventsStore } = useStore();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id as string);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.title) {
      setTitleInputValue(event.title);
      setFormValues.setTitle(event.title);
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
    setFormValues.setTitle("");
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
    setFormValues.setTitle(title);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <TitleLabel className={poppins.className}>
        <InputName>{t("titleInput")}</InputName>
        <DeleteIconBox onClick={cleanTitleInput}>
          <SvgDeleteIcon
            isTitleInputValid={isTitleInputValid}
            titleInputValue={titleInputValue}
          />
        </DeleteIconBox>
        <TitleInput
          type="text"
          name="title"
          value={titleInputValue}
          ref={titleInputRef}
          isTitleInputCompleted={isTitleInputCompleted}
          isTitleInputValid={isTitleInputValid}
          onChange={handleTitleInputChange}
          titleInputValue={titleInputValue}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {!isTitleInputValid && (
          <InvalidInputWarning className={poppins.className}>
            Invalid input
          </InvalidInputWarning>
        )}
      </TitleLabel>
    </StyleSheetManager>
  );
};
