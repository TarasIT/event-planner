"use client";

import React, { FC, FormEvent, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { NameInput } from "../NameInput/NameInput";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";

export const SignupForm: FC = observer((): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { authStore, setAuthCredentials } = useStore();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await authStore.signup();
    setIsLoading(false);
    resetFormInputs();
  };

  const resetFormInputs = (): void => {
    setAuthCredentials.setName("");
    setAuthCredentials.setEmail("");
    setAuthCredentials.setPassword("");
  };

  return (
    <AuthForm onSubmit={handleFormSubmit}>
      <NameInput />
      <EmailInput />
      <PasswordInput />
      <AuthBtn type="submit" className={poppins.className}>
        {isLoading ? <Spinner /> : t("signup")}
      </AuthBtn>
    </AuthForm>
  );
});
