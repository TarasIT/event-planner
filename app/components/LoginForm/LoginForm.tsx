"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { EmailInput } from "../EmailInput/EmailInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { AuthBtn, AuthForm, Spinner } from "@/app/styles/common.styled";
import { usePathname, useRouter } from "next/navigation";
import {
  ForgotPasswordLink,
  AccidentSpinner,
  ResendVerificationEmailLink,
} from "./LoginForm.styled";

export const LoginForm: FC = observer((): JSX.Element => {
  const { authStore, authCredentials } = useStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [isVerificationLinkResending, setIsVerificationLinkResending] =
    useState<boolean | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login") setLoading(false);

    if (authStore.error === "Email is not verified.") {
      setIsEmailVerified(false);
    }
    if (authStore.message === "Verification link resent! Check your email.") {
      setIsVerificationLinkResending(false);
    }
    if (!isEmailVerified || !isVerificationLinkResending) {
      setLoading(false);
    }
  }, [
    pathname,
    isLoading,
    authStore.error,
    authStore.message,
    isEmailVerified,
    isVerificationLinkResending,
    setIsEmailVerified,
    setIsVerificationLinkResending,
  ]);

  console.log("isEmailVerified", isEmailVerified);

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    reset();
    if (authCredentials.password && authCredentials.password.length < 8) return;
    await authStore.login();
    if (authStore.error !== "Email is not verified.") {
      router.push("/home");
    }
  };

  const reset = (): void => {
    setIsEmailVerified(null);
    setIsVerificationLinkResending(null);
    authStore.setError(null);
    authStore.setMessage(null);
  };

  const resendVerificationLink = async (): Promise<void> => {
    if (isEmailVerified) return;
    setIsVerificationLinkResending(true);
    await authStore.resendVerificationLink();
  };

  return (
    <AuthForm onSubmit={handleFormSubmit}>
      <EmailInput />
      <PasswordInput />
      <AuthBtn type="submit" className={poppins.className}>
        {authStore.isLoading ? <Spinner /> : t("login")}
      </AuthBtn>

      <ForgotPasswordLink
        onClick={(): void => setLoading(true)}
        href={"/forgot-password"}
        className={poppins.className}
      >
        {isLoading ? <AccidentSpinner /> : t("forgotPasswordLink")}
      </ForgotPasswordLink>

      {isEmailVerified === false && isVerificationLinkResending !== false && (
        <ResendVerificationEmailLink
          onClick={resendVerificationLink}
          className={poppins.className}
        >
          {isVerificationLinkResending ? (
            <AccidentSpinner />
          ) : (
            "Resend verification link to your email?"
          )}
        </ResendVerificationEmailLink>
      )}
    </AuthForm>
  );
});
