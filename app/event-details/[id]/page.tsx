"use server";

import React from "react";
import { BackLink } from "../../components/BackLink/BackLink";
import { EventDetailsCard } from "../../components/EventDetailsCard/EventDetailsCard";
import { getEventById } from "@/app/actions/actions";
import AuthErrorHandler from "@/app/components/AuthErrorHandler/AuthErrorHandler";
import EventsErrorHandler from "@/app/components/EventsErrorHandler/EventsErrorHandler";

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
      <AuthErrorHandler error={error} />
      <EventsErrorHandler error={error} />
      <BackLink />
      <EventDetailsCard event={event} error={error} />
    </>
  );
};

export default EventDetailsPage;
