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
  const { eventDataStore, eventsStore } = useStore();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.title) {
      setTitleInputValue(event.title);
      eventDataStore.setTitle(event.title);
    }
  }, [id, eventsStore.event]);

  const handleClickOutside = (e: MouseEvent): void => {
    titleInputRef.current !== e.target
      ? setIsTitleInputCompleted(true)
      : setIsTitleInputCompleted(false);
  };

  const cleanTitleInput = (): void => {
    setTitleInputValue("");
    eventDataStore.setTitle("");
    setIsTitleInputValid(true);
  };

  const validateInput = (inputValue: string): boolean => {
    const hasComasAndDotsAtTheBeginning =
      inputValue[0] === "." || inputValue[0] === ",";
    return hasComasAndDotsAtTheBeginning ? false : true;
  };

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const title = e.target.value;

    if (!validateInput(title)) {
      setIsTitleInputValid(false);
      eventDataStore.setIsTitleValid(false);
    } else {
      setIsTitleInputValid(true);
      eventDataStore.setIsTitleValid(true);
    }

    setTitleInputValue(title);
    eventDataStore.setTitle(title);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <TitleLabel className={poppins.className}>
        <InputName>{t("common.eventForm.titleInput")}</InputName>
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
          placeholder={t("common.eventForm.formInputPlaceholder")}
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
