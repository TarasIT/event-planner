"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { FormTitle } from "./ProfileFormTitle.styled";

const ProfileFormTitle: FC = (): JSX.Element => {
  const { t } = useTranslation();
  return <FormTitle className={poppins.className}>{t("yourData")}</FormTitle>;
};

export default ProfileFormTitle;
