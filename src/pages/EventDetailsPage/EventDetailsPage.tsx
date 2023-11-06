import React, { FC } from "react";
import { BackLinkToHomePage } from "../../components/BackLinkToHomePage/BackLinkToHomePage";
import { EventDetailsCard } from "../../components/EventDetailsCard/EventDetailsCard";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";

const EventDetailsPage: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <BackLinkToHomePage />
      <EventDetailsCard />
    </MainLayout>
  );
};

export default EventDetailsPage;
