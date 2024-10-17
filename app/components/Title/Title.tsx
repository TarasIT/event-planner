"use client";

import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { ComponentTitle } from "./Title.styled";
import { localizeResponses } from "@/app/services/localizeResponses";

interface TitleProps {
  title: string;
}

export const Title: FC<TitleProps> = ({ title }): JSX.Element => {
  const [verificationTitle, setVerificationTitle] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (title) {
      setVerificationTitle(t(localizeResponses(title)));
    }
  }, [title, t]);

  return (
    <ComponentTitle className={poppins.className}>
      {verificationTitle}
    </ComponentTitle>
  );
};
