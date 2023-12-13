"use client";

import React from "react";
import { BackLink } from "../../components/BackLink/BackLink";
import { EventDetailsCard } from "../../components/EventDetailsCard/EventDetailsCard";

const EventDetailsPage = (): JSX.Element => {
  return (
    <>
      <BackLink />
      <EventDetailsCard />
    </>
  );
};

export default EventDetailsPage;
