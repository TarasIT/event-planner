"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  InputName,
  NameLabel,
  NameAuthInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./NameInput.styled";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "nameInputValue" &&
    prop !== "isNameInputValid" &&
    prop !== "isNameInputCompleted"
  );
};

export const NameInput: FC = (): JSX.Element => {
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const [isNameInputValid, setIsNameInputValid] = useState<boolean>(true);
  const [isNameInputCompleted, setIsNameInputCompleted] =
    useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { setAuthCredentials } = useStore();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (nameInputValue && !setAuthCredentials.name) {
      setNameInputValue("");
    }
  }, [nameInputValue, setAuthCredentials.name]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (nameInputRef.current !== e.target) {
      setIsNameInputCompleted(true);
    } else {
      setIsNameInputCompleted(false);
    }
  };

  const cleanNameInput = (): void => {
    setNameInputValue("");
    setAuthCredentials.setName("");
    setIsNameInputValid(true);
  };

  const validateInput = (inputValue: string): boolean => {
    if (inputValue.length > 255) {
      return false;
    } else {
      return true;
    }
  };

  const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value;

    if (!validateInput(name)) {
      setIsNameInputValid(false);
    } else {
      setIsNameInputValid(true);
    }
    setNameInputValue(name);
    setAuthCredentials.setName(name);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <NameLabel className={poppins.className}>
        <InputName>{t("name")}</InputName>
        <DeleteIconBox onClick={cleanNameInput}>
          <SvgDeleteIcon
            isNameInputValid={isNameInputValid}
            nameInputValue={nameInputValue}
          />
        </DeleteIconBox>
        <NameAuthInput
          type="text"
          name="name"
          value={nameInputValue}
          ref={nameInputRef}
          isNameInputCompleted={isNameInputCompleted}
          isNameInputValid={isNameInputValid}
          onChange={handleNameInputChange}
          nameInputValue={nameInputValue}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {!isNameInputValid && (
          <InvalidInputWarning className={poppins.className}>
            {t("longname")}
          </InvalidInputWarning>
        )}
      </NameLabel>
    </StyleSheetManager>
  );
};
