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
    const { setFormValues, eventsStore } = useStore();

    useEffect(() => {
      eventsStore.setEvent(eventForUpdate);
      toast.error(error);
      eventsStore.setLoading(false);
    }, [eventForUpdate, error]);

    useEffect(() => {
      setEvent({
        title: setFormValues.title,
        description: setFormValues.description,
        date: setFormValues.date as string,
        time: setFormValues.time,
        location: setFormValues.location,
        category: setFormValues.category,
        picture: setFormValues.picture,
        priority: setFormValues.priority,
      });
    }, [
      setFormValues.title,
      setFormValues.description,
      setFormValues.date,
      setFormValues.time,
      setFormValues.location,
      setFormValues.category,
      setFormValues.picture,
      setFormValues.priority,
    ]);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (event) {
        const resultEvent = removeEmptyFields(event, !!id);
        id
          ? await eventsStore.updateEvent(id as string, resultEvent as NewEvent)
          : await eventsStore.createEvent(resultEvent as FormData);
        if (eventsStore.error) return;
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
