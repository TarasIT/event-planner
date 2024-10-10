"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { BackLink } from "../components/BackLink/BackLink";
import { EventForm } from "../components/EventForm/EventForm";
import { Title } from "./page.styled";
import { poppins } from "../assets/fonts";

const CreateEvent: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <BackLink />
      <Title className={poppins.className}>
        {t("createEventPage.createEventTitle")}
      </Title>
      <EventForm eventForUpdate={null} error={null} />
    </>
  );
};

export default CreateEvent;
