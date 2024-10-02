"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  AddEventButton,
  CreateEventForm,
  Container,
} from "./NewEventForm.styled";
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

interface UpdateEventProps {
  eventForUpdate: NewEvent | null | undefined;
  error: string | null | undefined;
}

export const NewEventForm: FC<UpdateEventProps> = observer(
  ({ eventForUpdate, error }): JSX.Element => {
    const [event, setEvent] = useState<NewEvent | null>(null);
    const { t } = useTranslation();
    const { id } = useParams();
    const router = useRouter();
    const { eventDataStore, eventsStore } = useStore();

    useEffect(() => {
      eventsStore.setEvent(eventForUpdate);
      toast.error(error);
      eventsStore.setLoading(false);
    }, [eventForUpdate, error]);

    useEffect(() => {
      setEvent({
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

      const eventWithoutId = {
        ...eventsStore.event,
      };
      delete eventWithoutId.id;

      if (JSON.stringify(event) === JSON.stringify(eventWithoutId)) {
        eventDataStore.resetEventFormInputs();
        return router.push(`/home${createQueryString()}`);
      }

      if (event) {
        const resultEvent = removeEmptyFields(event, !!id);
        id
          ? await eventsStore.updateEvent(id as string, resultEvent as NewEvent)
          : await eventsStore.createEvent(resultEvent as FormData);
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
                t("saveEventBtn")
              )
            ) : eventsStore.isLoading ? (
              <Spinner />
            ) : (
              t("addEventBtn")
            )}
          </span>
        </AddEventButton>
      </CreateEventForm>
    );
  }
);
