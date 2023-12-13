"use client";

import React, { FC } from "react";
import { AddEventLink, SvgButtonIcon } from "./AddEventButton.styled";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";

export const AddEventButton: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { categoryFilter } = useStore();

  return (
    <AddEventLink
      href="/create-event"
      onClick={() => categoryFilter.getCurrentCategory("")}
      className={poppins.className}
    >
      <SvgButtonIcon />
      <span>{t("addNewEventBtn")}</span>
    </AddEventLink>
  );
};
