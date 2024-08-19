"use client";

import React, { FC } from "react";
import { poppins } from "@/app/assets/fonts";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Title } from "./EditEventTitle.styled";

export const EditEventTitle: FC = observer((): JSX.Element => {
  const { t } = useTranslation();
  return <Title className={poppins.className}>{t("editEventTitle")}</Title>;
});
