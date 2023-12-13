"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { BackLink } from "../../components/BackLink/BackLink";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import { Title } from "./page.styled";
import { poppins } from "@/app/assets/fonts";

const EditEvent: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <BackLink />
      <Title className={poppins.className}>{t("editEventTitle")}</Title>
      <NewEventForm />
    </>
  );
};

export default EditEvent;
