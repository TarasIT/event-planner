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
import { ForgotPasswordLink } from "./LoginForm.styled";
import { ForgotSpinner } from "../ForgotPasswordForm/ForgotPasswordForm.styled";

export const LoginForm: FC = observer((): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { authStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login") setLoading(false);
  }, [pathname, isLoading]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authStore.login();
    router.push("/home");
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
        {isLoading ? <ForgotSpinner /> : t("forgotPasswordLink")}
      </ForgotPasswordLink>
    </AuthForm>
  );
});
