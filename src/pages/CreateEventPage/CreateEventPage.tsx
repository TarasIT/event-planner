import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { BackLinkToHomePage } from "../../components/BackLinkToHomePage/BackLinkToHomePage";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import { Title } from "./CreateEventPage.styled";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { useTranslation } from "react-i18next";

const CreateEvent: FC = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <MainLayout>
      <BackLinkToHomePage />
      <Title>{id ? t("editEventTitle") : t("createEventTitle")}</Title>
      <NewEventForm />
    </MainLayout>
  );
};

export default CreateEvent;
