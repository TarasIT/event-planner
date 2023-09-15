import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import {
  parseEventsFromLS,
  saveEventToLS,
} from "../../services/LocalStorageService";
import { CreateEventForm } from "./NewEventForm.styled";
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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events, setEvents] = useState<NewEvent[]>([]);

  const STORAGE_KEY = "events";

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

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
      date: selectedDate,
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
      {/* <EventTitleInput /> */}

      {/* <EventDescriptionInput />
      <EventLocationInput />
      <EventCategoryInput />
      <EventPriorityInput />
      <EventImageInput /> */}
      <EventDateInput />
      <EventTimeInput />
    </CreateEventForm>
  );
};
