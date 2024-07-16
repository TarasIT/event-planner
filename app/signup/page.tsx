"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { BackLink } from "../components/BackLink/BackLink";
import { poppins } from "../assets/fonts";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { Title } from "./page.styled";

const Signup: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <BackLink />
      <Title className={poppins.className}>{t("signup")}</Title>
      <SignupForm />
    </>
  );
};

export default Signup;
