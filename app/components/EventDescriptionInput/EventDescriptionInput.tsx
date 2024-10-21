"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  InputName,
  DescriptionTextArea,
  DescriptionLabel,
  SvgDeleteIcon,
} from "./EventDescriptionInput.styled";
import { useStore } from "../../mobX/useStore";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";

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
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();
  const { event } = eventsStore;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (id && event && event.description) {
      eventDataStore.setDescription(event.description);
      setDescriptionInputValue(event.description);
    }
  }, [id, eventsStore.event]);

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
    const description = e.target.value;
    setDescriptionInputValue(description);
    eventDataStore.setDescription(description.trim() || null);
  };

  const cleanDescriptionInput = (): void => {
    setDescriptionInputValue("");
    eventDataStore.setDescription(null);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DescriptionLabel className={poppins.className}>
        <InputName>{t("common.eventForm.descriptionInput")}</InputName>
        <DeleteIconBox onClick={cleanDescriptionInput}>
          <SvgDeleteIcon descriptionInputValue={descriptionInputValue} />
        </DeleteIconBox>
        <DescriptionTextArea
          value={descriptionInputValue}
          ref={descriptionTextAreaRef}
          isDescriptionInputCompleted={isDescriptionInputCompleted}
          onChange={handleDescriptionInputChange}
          descriptionInputValue={descriptionInputValue}
          rows={4}
          placeholder={t("common.eventForm.formInputPlaceholder")}
          className={poppins.className}
        />
      </DescriptionLabel>
    </StyleSheetManager>
  );
};
