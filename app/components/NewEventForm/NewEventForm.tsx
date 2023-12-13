"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
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

export const NewEventForm: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const { setFormValues, eventsStore } = useStore();
  const KEY = process.env.NEXT_PUBLIC_STORAGE_KEY!;
  const parsedEvents = eventsStore.getEvents(KEY);

  useEffect(() => setEvents(parsedEvents), []);

  useEffect(() => {
    if (parsedEvents.length > events.length) return;
    eventsStore.saveEvents(KEY, events);
  }, [events, parsedEvents]);

  const resetFormInputs = (): void => {
    setFormValues.setTitle("");
    setFormValues.setDescription("");
    setFormValues.setDate("");
    setFormValues.setTime("");
    setFormValues.setLocation("");
    setFormValues.setCategory("");
    setFormValues.setImage("");
    setFormValues.setPriority("");
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      await setEvents([
        ...events,
        {
          id: nanoid(),
          title: setFormValues.title,
          description: setFormValues.description,
          date: setFormValues.date,
          time: setFormValues.time,
          location: setFormValues.location,
          category: setFormValues.category,
          image: setFormValues.image,
          priority: setFormValues.priority,
        },
      ]);
    } else {
      await eventsStore.updateEvents(KEY, {
        id: id as string,
        title: setFormValues.title,
        description: setFormValues.description,
        date: setFormValues.date,
        time: setFormValues.time,
        location: setFormValues.location,
        category: setFormValues.category,
        image: setFormValues.image,
        priority: setFormValues.priority,
      });
    }

    resetFormInputs();
    router.push("/");
  };

  return (
    <CreateEventForm onSubmit={handleFormSubmit} encType="multipart/form-data">
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
        <span>{id ? t("saveEventBtn") : t("addEventBtn")}</span>
      </AddEventButton>
    </CreateEventForm>
  );
});
