"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { ComponentTitle } from "./Title.styled";

interface TitleProps {
  title: string;
}

export const Title: FC<TitleProps> = ({ title }): JSX.Element => {
  const { t } = useTranslation();
  return <ComponentTitle className={poppins.className}>{t(title.toString())}</ComponentTitle>;
};
