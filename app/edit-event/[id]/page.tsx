"use server";

import React, { FC } from "react";
import { BackLink } from "../../components/BackLink/BackLink";
import { EventForm } from "../../components/EventForm/EventForm";
import { EditEventTitle } from "@/app/components/EditEventTitle/EditEventTitle";
import { getEventById } from "@/app/actions/actions";

interface EditEventPageProps {
  params: { id: string };
}

const EditEvent: FC<EditEventPageProps> = async ({
  params,
}): Promise<JSX.Element> => {
  const { id } = params;
  const { event, error } = await getEventById(id);

  return (
    <>
      <BackLink />
      <EditEventTitle />
      <EventForm eventForUpdate={event} error={error} />
    </>
  );
};

export default EditEvent;
