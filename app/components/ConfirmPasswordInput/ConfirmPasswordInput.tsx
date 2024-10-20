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
  ValidInputNotification,
} from "./ConfirmPasswordInput.styled";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { DeleteIconBox } from "@/app/styles/common.styled";
import { observer } from "mobx-react";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "password" &&
    prop !== "isPasswordLong" &&
    prop !== "isPasswordMatched"
  );
};

export const ConfirmPasswordInput: FC = observer((): JSX.Element => {
  const [password, setPassword] = useState<string>("");
  const [isPasswordLong, setIsPasswordLong] = useState<boolean>();
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { authCredentials } = useStore();

  useEffect(() => {
    password &&
    authCredentials.newPassword &&
    password === authCredentials.newPassword
      ? setIsPasswordMatched(true)
      : setIsPasswordMatched(false);

    if (password && !authCredentials.confirmPassword) {
      setPassword("");
    }
  }, [password, authCredentials.newPassword, authCredentials.confirmPassword]);

  const cleanPasswordInput = (): void => {
    setPassword("");
    authCredentials.setConfirmPassword("");
    setIsPasswordLong(true);
  };

  const checkPasswordLength = (password: string): boolean => {
    return password.length < 8 ? false : true;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const password = e.target.value;

    !checkPasswordLength(password)
      ? setIsPasswordLong(false)
      : setIsPasswordLong(true);

    setPassword(password);
    authCredentials.setConfirmPassword(password);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PasswordLabel
        className={poppins.className}
        isPasswordMatched={isPasswordMatched}
      >
        <InputPassword>{t("profilePage.confirmPassword")}</InputPassword>
        <DeleteIconBox onClick={cleanPasswordInput}>
          <SvgDeleteIcon
            isPasswordMatched={isPasswordMatched}
            isPasswordLong={isPasswordLong}
            password={password}
          />
        </DeleteIconBox>
        <PasswordInput
          type={isPasswordShown ? "text" : "password"}
          name="password"
          value={authCredentials.confirmPassword}
          ref={nameInputRef}
          isPasswordMatched={isPasswordMatched}
          isPasswordLong={isPasswordLong}
          onChange={handlePasswordChange}
          password={password}
          placeholder={t("common.eventForm.formInputPlaceholder")}
          className={poppins.className}
          required
        />
        {password ? (
          <div onClick={() => setIsPasswordShown(!isPasswordShown)}>
            {isPasswordShown ? (
              <SvgHidePasswordIcon size="1.5em" />
            ) : (
              <SvgShowPasswordIcon size="1.5em" />
            )}
          </div>
        ) : null}
        {password && (
          <div>
            {isPasswordLong && isPasswordMatched ? (
              <ValidInputNotification className={poppins.className}>
                {t("profilePage.confirmedPassword")}
              </ValidInputNotification>
            ) : (
              <InvalidInputWarning className={poppins.className}>
                {!isPasswordLong
                  ? t("common.shortPassword")
                  : !isPasswordMatched
                  ? t("profilePage.notMatchedPassword")
                  : null}
              </InvalidInputWarning>
            )}
          </div>
        )}
      </PasswordLabel>
    </StyleSheetManager>
  );
});
