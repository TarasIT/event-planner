import React, { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
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
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const navigate = useNavigate();

  const STORAGE_KEY = "events";

  useEffect(() => {
    setEvents(parseEventsFromLS(STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (parseEventsFromLS(STORAGE_KEY).length > events.length) return;
    saveEventToLS(STORAGE_KEY, events);
  }, [events]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    await setEvents([
      ...events,
      {
        id: nanoid(),
        title,
        description,
        date,
        time,
        location,
        category,
        image,
        priority,
      },
    ]);

    form.reset();
    navigate("/");
  };

  return (
    <CreateEventForm onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Container>
        <EventTitleInput setTitle={setTitle} />
        <EventDescriptionInput setDescription={setDescription} />
        <EventDateInput setDate={setDate} />
        <EventTimeInput setTime={setTime} />
        <EventLocationInput setLocation={setLocation} />
        <EventCategoryInput setCategory={setCategory} />
        <EventImageInput setImage={setImage} />
        <EventPriorityInput setPriority={setPriority} />
      </Container>
      <AddEventButton>
        <span>Add event</span>
      </AddEventButton>
    </CreateEventForm>
  );
};
