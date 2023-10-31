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
import eventsStore from "../../stores/eventsStore";

export const NewEventForm: FC = observer((): JSX.Element => {
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
  const { id } = useParams();
  const KEY = process.env.REACT_APP_STORAGE_KEY!;
  const event = events.filter((event) => event.id === id)[0];

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
    } else {
      await eventsStore.updateEvents(KEY, {
        id,
        title,
        description,
        date,
        time,
        location,
        category,
        image,
        priority,
      });
    }

    form.reset();
    navigate("/");
  };

  return (
    <CreateEventForm onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Container>
        <EventTitleInput event={event} setTitle={setTitle} />
        <EventDescriptionInput event={event} setDescription={setDescription} />
        <EventDateInput event={event} setDate={setDate} />
        <EventTimeInput event={event} setTime={setTime} />
        <EventLocationInput event={event} setLocation={setLocation} />
        <EventCategoryInput event={event} setCategory={setCategory} />
        <EventImageInput event={event} setImage={setImage} />
        <EventPriorityInput event={event} setPriority={setPriority} />
      </Container>
      <AddEventButton>
        <span>{id ? "Save" : "Add event"}</span>
      </AddEventButton>
    </CreateEventForm>
  );
});
