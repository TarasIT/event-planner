"use client";

import React, { FC, FormEvent } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";

export const LoginForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const { authStore } = useStore();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authStore.login();
  };

  return (
    <AuthForm onSubmit={handleFormSubmit}>
      <EmailInput />
      <PasswordInput />
      <AuthBtn type="submit" className={poppins.className}>
        {authStore.isLoading ? <Spinner /> : t("login")}
      </AuthBtn>
    </AuthForm>
  );
});
