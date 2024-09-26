"use client";

import React, { FC, FormEvent } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { NameInput } from "../NameInput/NameInput";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";

export const SignupForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const { authStore, authCredentials } = useStore();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authCredentials.password && authCredentials.password.length < 8) return;
    await authStore.signup();
  };

  return (
    <AuthForm onSubmit={handleFormSubmit}>
      <NameInput />
      <EmailInput />
      <PasswordInput />
      <AuthBtn type="submit" className={poppins.className}>
        {authStore.isLoading ? <Spinner /> : t("signup")}
      </AuthBtn>
    </AuthForm>
  );
});
