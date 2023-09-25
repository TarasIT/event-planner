import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import {
  parseEventsFromLS,
  saveEventToLS,
} from "../../services/LocalStorageService";
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

export const NewEventForm: FC = (): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);

  const STORAGE_KEY = "events";

  useEffect(() => {
    setEvents(parseEventsFromLS(STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (parseEventsFromLS(STORAGE_KEY).length > events.length) return;
    saveEventToLS(STORAGE_KEY, events);
  }, [events]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const newEvent = {
      title: "title of event",
      decription: "some description of new event",
      date: "some date",
      time: "time-of-new-event",
      location: "some location",
      category: "some category",
      priority: "some priority",
    };

    setEvents([...events, newEvent]);

    form.reset();
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
      <AddEventButton>
        <span>Add event</span>
      </AddEventButton>
    </CreateEventForm>
  );
};
