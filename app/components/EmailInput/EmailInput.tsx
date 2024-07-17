"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  InputEmail,
  EmailLabel,
  EmailAuthInput,
  SvgDeleteIcon,
  InvalidInputWarning,
} from "./EmailInput.styled";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "emailInputValue" &&
    prop !== "isEmailInputValid" &&
    prop !== "isEmailInputCompleted"
  );
};

export const EmailInput: FC = (): JSX.Element => {
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [isEmailInputValid, setIsEmailInputValid] = useState<boolean>(true);
  const [isEmailInputCompleted, setIsEmailInputCompleted] =
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
    if (emailInputValue && !setAuthCredentials.email) {
      setEmailInputValue("");
    }
  }, [emailInputValue, setAuthCredentials.email]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (nameInputRef.current !== e.target) {
      setIsEmailInputCompleted(true);
    } else {
      setIsEmailInputCompleted(false);
    }
  };

  const cleanEmailInput = (): void => {
    setEmailInputValue("");
    setAuthCredentials.setEmail("");
    setIsEmailInputValid(true);
  };

  const validateInput = (inputValue: string): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(inputValue);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const email = e.target.value;

    if (!validateInput(email)) {
      setIsEmailInputValid(false);
    } else {
      setIsEmailInputValid(true);
    }
    setEmailInputValue(email);
    setAuthCredentials.setEmail(email);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <EmailLabel className={poppins.className}>
        <InputEmail>{t("email")}</InputEmail>
        <DeleteIconBox onClick={cleanEmailInput}>
          <SvgDeleteIcon
            isEmailInputValid={isEmailInputValid}
            emailInputValue={emailInputValue}
          />
        </DeleteIconBox>
        <EmailAuthInput
          type="email"
          name="email"
          value={emailInputValue}
          ref={nameInputRef}
          isEmailInputCompleted={isEmailInputCompleted}
          isEmailInputValid={isEmailInputValid}
          onChange={handleEmailInputChange}
          emailInputValue={emailInputValue}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {!isEmailInputValid && (
          <InvalidInputWarning className={poppins.className}>
            {t("invalidEmail")}
          </InvalidInputWarning>
        )}
      </EmailLabel>
    </StyleSheetManager>
  );
};
