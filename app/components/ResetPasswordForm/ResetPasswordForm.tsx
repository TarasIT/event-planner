"use client";

import React, { FC, useEffect, useState } from "react";
import {
  FormTitle,
  ProfileUserForm,
  ResetBtn,
} from "./ResetPasswordForm.styled";
import { ConfirmPasswordInput } from "../ConfirmPasswordInput/ConfirmPasswordInput";
import { ResetPasswordInput } from "../ResetPasswordInput/ResetPasswordInput";
import { poppins } from "@/app/assets/fonts";
import { useStore } from "@/app/mobX/useStore";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

export const ResetPasswordForm: FC = observer((): JSX.Element => {
  const [arePasswordsMatched, setArePasswordsMatched] =
    useState<boolean>(false);
  const { authCredentials } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    authCredentials.password &&
    authCredentials.confirmPassword &&
    authCredentials.password === authCredentials.confirmPassword
      ? setArePasswordsMatched(true)
      : setArePasswordsMatched(false);
  }, [authCredentials.password, authCredentials.confirmPassword]);

  return (
    <ProfileUserForm>
      <FormTitle className={poppins.className}>{t("resetPassword")}</FormTitle>
      <ResetPasswordInput />
      <ConfirmPasswordInput />
      {arePasswordsMatched && (
        <ResetBtn type="submit" className={poppins.className}>
          {t("resetPassword")}
        </ResetBtn>
      )}
    </ProfileUserForm>
  );
});
