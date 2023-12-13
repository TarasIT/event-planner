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
import { NewEvent } from "../../types/types";
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
  const { setFormValues, eventsStore } = useStore();
  const { id } = useParams();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id as string);

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
      <DescriptionLabel className={poppins.className}>
        <InputName>{t("descriptionInput")}</InputName>
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
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
        />
      </DescriptionLabel>
    </StyleSheetManager>
  );
};
