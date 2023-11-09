import React, { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
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
import { useTranslation } from "react-i18next";
import { useStore } from "../../hooks/useStore";

export const NewEventForm: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setFormValues, eventsStore } = useStore();
  const KEY = process.env.REACT_APP_STORAGE_KEY!;

  useEffect(() => setEvents(eventsStore.getEvents(KEY)), []);

  useEffect(() => {
    if (eventsStore.getEvents(KEY).length > events.length) return;
    eventsStore.saveEvents(KEY, events);
  }, [events]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

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
        id,
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

    form.reset();
    navigate("/");
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
      <AddEventButton>
        <span>{id ? t("saveEventBtn") : t("addEventBtn")}</span>
      </AddEventButton>
    </CreateEventForm>
  );
});
