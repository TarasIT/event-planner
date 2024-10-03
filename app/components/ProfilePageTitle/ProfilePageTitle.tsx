"use client";

import React, { FC } from "react";
import { poppins } from "@/app/assets/fonts";
import { useTranslation } from "react-i18next";
import { Title } from "./ProfilePageTitle.styled";

export const ProfilePageTitle: FC = (): JSX.Element => {
  const { t } = useTranslation();
  return <Title className={poppins.className}>{t("common.profile")}</Title>;
};
