"use server";

import React from "react";
import { BackLink } from "../../components/BackLink/BackLink";
import { EventDetailsCard } from "../../components/EventDetailsCard/EventDetailsCard";
import { getEventById } from "@/app/actions/actions";

interface EventDetailsPageProps {
  params: { id: string };
}

const EventDetailsPage = async ({
  params,
}: EventDetailsPageProps): Promise<JSX.Element> => {
  const { id } = params;
  const { event, error } = await getEventById(id);

  return (
    <>
      <BackLink />
      <EventDetailsCard event={event} error={error} />
    </>
  );
};

export default EventDetailsPage;
