"use client";

import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  InputPassword,
  PasswordLabel,
  PasswordInput,
  SvgDeleteIcon,
  InvalidInputWarning,
  SvgShowPasswordIcon,
  SvgHidePasswordIcon,
} from "./NewPasswordInput.styled";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { observer } from "mobx-react";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "password" &&
    prop !== "isPasswordLong" &&
    prop !== "isPasswordCompleted"
  );
};

export const NewPasswordInput: FC = observer((): JSX.Element => {
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
    if (password && !authCredentials.newPassword) {
      setPassword("");
    }
  }, [password, authCredentials.newPassword]);

  const handleClickOutside = (e: MouseEvent): void => {
    nameInputRef.current !== e.target
      ? setIsPasswordCompleted(true)
      : setIsPasswordCompleted(false);
  };

  const cleanPasswordInput = (): void => {
    setPassword("");
    authCredentials.setNewPassword("");
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
    authCredentials.setNewPassword(password);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PasswordLabel className={poppins.className}>
        <InputPassword>{t("newPassword")}</InputPassword>
        <DeleteIconBox onClick={cleanPasswordInput}>
          <SvgDeleteIcon isPasswordLong={isPasswordLong} password={password} />
        </DeleteIconBox>
        <PasswordInput
          type={isPasswordShown ? "text" : "password"}
          name="password"
          value={authCredentials.newPassword}
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
});
