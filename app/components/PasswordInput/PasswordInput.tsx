"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "password" &&
    prop !== "isPasswordLong" &&
    prop !== "isPasswordCompleted"
  );
};

export const PasswordInput: FC = (): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [isPasswordLong, setIsPasswordLong] = useState<boolean>(true);
  const [isPasswordCompleted, setIsPasswordCompleted] =
    useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { authCredentials } = useStore();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (password && !authCredentials.password) {
      setPassword("");
    }
  }, [password, authCredentials.password]);

  const handleClickOutside = (e: MouseEvent): void => {
    nameInputRef.current !== e.target
      ? setIsPasswordCompleted(true)
      : setIsPasswordCompleted(false);
  };

  const cleanPasswordInput = (): void => {
    setPassword("");
    authCredentials.setPassword("");
    setIsPasswordLong(true);
  };

  const checkPasswordLength = (password: string): boolean =>
    password.length < 8 ? false : true;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const password = e.target.value;

    !checkPasswordLength(password)
      ? setIsPasswordLong(false)
      : setIsPasswordLong(true);

    setPassword(password);
    authCredentials.setPassword(password);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PasswordLabel className={poppins.className}>
        <InputPassword>{t("password")}</InputPassword>
        <DeleteIconBox onClick={cleanPasswordInput}>
          <SvgDeleteIcon isPasswordLong={isPasswordLong} password={password} />
        </DeleteIconBox>
        <PasswordAuthInput
          type={isPasswordShown ? "text" : "password"}
          name="password"
          value={password}
          ref={nameInputRef}
          isPasswordCompleted={isPasswordCompleted}
          isPasswordLong={isPasswordLong}
          onChange={handlePasswordChange}
          password={password}
          placeholder={t("formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {password.length ? (
          <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
            {isPasswordShown ? (
              <SvgHidePasswordIcon size="1.5em" />
            ) : (
              <SvgShowPasswordIcon size="1.5em" />
            )}
          </div>
        ) : null}
        {!isPasswordLong && (
          <InvalidInputWarning className={poppins.className}>
            {t("shortPassword")}
          </InvalidInputWarning>
        )}
      </PasswordLabel>
    </StyleSheetManager>
  );
};
