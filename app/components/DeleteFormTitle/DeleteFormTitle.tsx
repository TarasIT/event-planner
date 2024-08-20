"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { FormTitle } from "./DeleteFormTitle.styled";

const DeleteFormTitle: FC = (): JSX.Element => {
  const { t } = useTranslation();
  return <FormTitle className={poppins.className}>{t("deleteData")}</FormTitle>;
};

export default DeleteFormTitle;
