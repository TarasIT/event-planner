"use client";

import React, { FC, FormEvent } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { EmailInput } from "../EmailInput/EmailInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/app/services/createQueryString";

export const ForgotPasswordForm: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  const { authStore } = useStore();
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authStore.sendResetPasswordLink();
    router.push(`/home${createQueryString()}`);
  };

  return (
    <AuthForm onSubmit={handleFormSubmit}>
      <EmailInput />
      <AuthBtn type="submit" className={poppins.className}>
        {authStore.isLoading ? <Spinner /> : t("forgotPasswordPage.submit")}
      </AuthBtn>
    </AuthForm>
  );
});
