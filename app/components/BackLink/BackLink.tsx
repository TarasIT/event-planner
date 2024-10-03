"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GoBackLink, SvgBackLinkIcon, Back } from "./BackLink.styled";
import { poppins } from "@/app/assets/fonts";

export const BackLink: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <GoBackLink onClick={() => router.back()} className={poppins.className}>
      <SvgBackLinkIcon />
      <Back>{t("common.backBtn")}</Back>
    </GoBackLink>
  );
};
