"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { BackLink } from "../components/BackLink/BackLink";
import { poppins } from "../assets/fonts";
import { Title } from "./page.styled";
import { LoginForm } from "../components/LoginForm/LoginForm";

const Signup: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <BackLink />
      <Title className={poppins.className}>{t("login")}</Title>
      <LoginForm />
    </>
  );
};

export default Signup;