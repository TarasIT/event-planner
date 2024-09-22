"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  FormTitle,
  PasswordsForm,
  ResetBtn,
} from "./ChangePasswordForm.styled";
import { ConfirmPasswordInput } from "../ConfirmPasswordInput/ConfirmPasswordInput";
import { NewPasswordInput } from "../NewPasswordInput/NewPasswordInput";
import { poppins } from "@/app/assets/fonts";
import { useStore } from "@/app/mobX/useStore";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Spinner } from "@/app/styles/common.styled";

export const ChangePasswordForm: FC = observer((): JSX.Element => {
  const [arePasswordsMatched, setArePasswordsMatched] =
    useState<boolean>(false);
  const [isPasswordProvided, setIsPasswordProvided] = useState<boolean>(false);
  const { authCredentials, authStore } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    const { is_password_existed } = authCredentials;
    is_password_existed
      ? setIsPasswordProvided(true)
      : setIsPasswordProvided(false);
  }, []);

  useEffect(() => {
    const { newPassword, confirmPassword } = authCredentials;
    newPassword && confirmPassword && newPassword === confirmPassword
      ? setArePasswordsMatched(true)
      : setArePasswordsMatched(false);
  }, [authCredentials.newPassword, authCredentials.confirmPassword]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { googleId, password, newPassword, confirmPassword } =
      authCredentials;

    switch (true) {
      case !!password && !!newPassword && !!confirmPassword:
        authStore.changePassword({
          current_password: password,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        });
        break;
      case googleId && !password && !!newPassword && !!confirmPassword:
        authStore.changePassword({
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        });
        break;
      case newPassword !== confirmPassword:
        toast.error("Passwords are not matched");
        break;
      default:
        toast.error("Passwords are not provided");
        break;
    }
  };

  return (
    <PasswordsForm onSubmit={handleSubmit}>
      <FormTitle className={poppins.className}>
        {t("changePasswordTitle")}
      </FormTitle>
      {isPasswordProvided && <PasswordInput />}
      <NewPasswordInput />
      <ConfirmPasswordInput />
      {arePasswordsMatched && (
        <ResetBtn type="submit" className={poppins.className}>
          {authStore.isLoading ? <Spinner /> : t("changePassword")}
        </ResetBtn>
      )}
    </PasswordsForm>
  );
});
