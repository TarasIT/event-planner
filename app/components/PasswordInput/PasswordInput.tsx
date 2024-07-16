"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  InputPassword,
  PasswordLabel,
  PasswordAuthInput,
  SvgDeleteIcon,
  InvalidInputWarning,
  SvgShowPasswordIcon,
  SvgHidePasswordIcon,
} from "./PasswordInput.styled";
import { NewEvent } from "../../types/types";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "passwordInputValue" &&
    prop !== "isPasswordInputValid" &&
    prop !== "isPasswordInputCompleted"
  );
};

export const PasswordInput: FC = (): JSX.Element => {
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");
  const [isPasswordInputValid, setIsPasswordInputValid] =
    useState<boolean>(true);
  const [isPasswordInputCompleted, setIsPasswordInputCompleted] =
    useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
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
      setPasswordInputValue(event.title);
      setFormValues.setTitle(event.title);
    }
  }, [event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (nameInputRef.current !== e.target) {
      setIsPasswordInputCompleted(true);
    } else {
      setIsPasswordInputCompleted(false);
    }
  };

  const cleanPasswordInput = (): void => {
    setPasswordInputValue("");
    setFormValues.setTitle("");
    setIsPasswordInputValid(true);
  };

  const validateInput = (inputValue: string): boolean => {
    if (inputValue.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const handlePasswordInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const password = e.target.value;

    if (!validateInput(password)) {
      setIsPasswordInputValid(false);
    } else {
      setIsPasswordInputValid(true);
    }
    setPasswordInputValue(password);
    setFormValues.setTitle(password);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PasswordLabel className={poppins.className}>
        <InputPassword>{t("password")}</InputPassword>
        <DeleteIconBox onClick={cleanPasswordInput}>
          <SvgDeleteIcon
            isPasswordInputValid={isPasswordInputValid}
            passwordInputValue={passwordInputValue}
          />
        </DeleteIconBox>
        <PasswordAuthInput
          type={isPasswordShown ? "text" : "password"}
          name="password"
          value={passwordInputValue}
          ref={nameInputRef}
          isPasswordInputCompleted={isPasswordInputCompleted}
          isPasswordInputValid={isPasswordInputValid}
          onChange={handlePasswordInputChange}
          passwordInputValue={passwordInputValue}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {passwordInputValue.length ? (
          <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
            {isPasswordShown ? (
              <SvgHidePasswordIcon size="1.5em" />
            ) : (
              <SvgShowPasswordIcon size="1.5em" />
            )}
          </div>
        ) : null}
        {!isPasswordInputValid && (
          <InvalidInputWarning className={poppins.className}>
            {t("shortPassword")}
          </InvalidInputWarning>
        )}
      </PasswordLabel>
    </StyleSheetManager>
  );
};
