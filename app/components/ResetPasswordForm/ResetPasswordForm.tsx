"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { EmailInput } from "../EmailInput/EmailInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";
import { useRouter } from "next/navigation";
import { NewPasswordInput } from "../NewPasswordInput/NewPasswordInput";
import { ConfirmPasswordInput } from "../ConfirmPasswordInput/ConfirmPasswordInput";
import { createQueryString } from "@/app/services/createQueryString";

interface ResetPasswordFormProps {
  resetPasswordToken: string | null;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = observer(
  ({ resetPasswordToken }): JSX.Element => {
    const [arePasswordsMatched, setArePasswordsMatched] =
      useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const { authStore, authCredentials } = useStore();
    const router = useRouter();

    useEffect(() => {
      const { newPassword, confirmPassword } = authCredentials;
      newPassword && confirmPassword && newPassword === confirmPassword
        ? setArePasswordsMatched(true)
        : setArePasswordsMatched(false);
    }, [authCredentials.newPassword, authCredentials.confirmPassword]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (resetPasswordToken) await authStore.resetPassword(resetPasswordToken);
      router.push(`/login?lang=${i18n.language}`);
    };

    return (
      <AuthForm onSubmit={handleFormSubmit}>
        <EmailInput />
        <NewPasswordInput />
        <ConfirmPasswordInput />
        {arePasswordsMatched && (
          <AuthBtn type="submit" className={poppins.className}>
            {authStore.isLoading ? <Spinner /> : t("resetPassword")}
          </AuthBtn>
        )}
      </AuthForm>
    );
  }
);
