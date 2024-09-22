"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { Title } from "./PasswordTitle.styled";

interface TitleProps {
  title: string;
}

export const PasswordTitle: FC<TitleProps> = ({ title }): JSX.Element => {
  const { t } = useTranslation();
  return <Title className={poppins.className}>{t(title.toString())}</Title>;
};
