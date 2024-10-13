"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { AddEventButton, CreateEventForm, Container } from "./EventForm.styled";
import { NewEvent } from "../../types/types";
import { EventTitleInput } from "../EventTitleInput/EventTitleInput";
import { EventLocationInput } from "../EventLocationInput/EventLocationInput";
import { EventDescriptionInput } from "../EventDescriptionInput/EventDescriptionInput";
import { EventCategoryInput } from "../EventCategoryInput/EventCategoryInput";
import { EventPriorityInput } from "../EventPriorityInput/EventPriorityInput";
import { EventImageInput } from "../EventImageInput/EventImageInput";
import { EventDateInput } from "../EventDateInput/EventDateInput";
import { EventTimeInput } from "../EventTimeInput/EventTimeInput";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { toast } from "react-toastify";
import { removeEmptyFields } from "@/app/services/removeEmptyFields";
import { Spinner } from "@/app/styles/common.styled";
import { createQueryString } from "@/app/services/createQueryString";
import { localizeResponses } from "@/app/services/localizeResponses";

interface UpdateEventProps {
  eventForUpdate: NewEvent | null | undefined;
  error: string | null | undefined;
}

export const EventForm: FC<UpdateEventProps> = observer(
  ({ eventForUpdate, error }): JSX.Element => {
    const [newEvent, setNewEvent] = useState<NewEvent | null>(null);
    const { t } = useTranslation();
    const { id } = useParams();
    const router = useRouter();
    const { eventDataStore, eventsStore } = useStore();

    useEffect(() => {
      if (eventForUpdate) eventsStore.setEvent(eventForUpdate);
      if (error) toast.error(t(localizeResponses(error)));
      eventsStore.setLoading(false);
    }, [eventForUpdate, error]);

    useEffect(() => {
      setNewEvent({
        title: eventDataStore.title,
        description: eventDataStore.description,
        date: eventDataStore.date as string,
        time: eventDataStore.time,
        location: eventDataStore.location,
        category: eventDataStore.category,
        picture: eventDataStore.picture,
        priority: eventDataStore.priority,
      });
    }, [
      eventDataStore.title,
      eventDataStore.description,
      eventDataStore.date,
      eventDataStore.time,
      eventDataStore.location,
      eventDataStore.category,
      eventDataStore.picture,
      eventDataStore.priority,
    ]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const currentEvent = {
        ...eventsStore.event,
      };
      delete currentEvent.id;

      if (JSON.stringify(newEvent) === JSON.stringify(currentEvent)) {
        eventDataStore.resetEventFormInputs();
        return router.push(`/home${createQueryString()}`);
      }

      if (newEvent) {
        console.log(newEvent);

        const eventForCreate = removeEmptyFields(newEvent);
        id
          ? await eventsStore.updateEvent(id as string, newEvent)
          : await eventsStore.createEvent(eventForCreate as FormData);
        if (eventsStore.error) return;
        eventDataStore.resetEventFormInputs();
        router.push(`/home${createQueryString()}`);
      }
    };

    return (
      <CreateEventForm onSubmit={handleFormSubmit}>
        <Container>
          <EventTitleInput />
          <EventDescriptionInput />
          <EventDateInput />
          <EventTimeInput />
          <EventLocationInput />
          <EventCategoryInput />
          <EventImageInput />
          <EventPriorityInput />
        </Container>
        <AddEventButton className={poppins.className}>
          <span>
            {id ? (
              eventsStore.isLoading ? (
                <Spinner />
              ) : (
                t("editEventPage.saveEventBtn")
              )
            ) : eventsStore.isLoading ? (
              <Spinner />
            ) : (
              t("createEventPage.addEventBtn")
            )}
          </span>
        </AddEventButton>
      </CreateEventForm>
    );
  }
);
