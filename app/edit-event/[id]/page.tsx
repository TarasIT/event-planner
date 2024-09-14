"use server";

import React, { FC } from "react";
import { BackLink } from "../../components/BackLink/BackLink";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import { getEventById } from "./actions";
import { EditEventTitle } from "@/app/components/EditEventTitle/EditEventTitle";

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
      <NewEventForm eventForUpdate={event} error={error} />
    </>
  );
};

export default EditEvent;
