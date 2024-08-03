"use client";

import React, { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { observer } from "mobx-react";
import {
  BackgroundContainer,
  Category,
  InfoBox,
  DateAndTime,
  Description,
  EventCard,
  Location,
  Priority,
  Title,
  DeleteEventBtn,
  EventButtonsBox,
  EditEventBtn,
} from "./EventDetailsCard.styled";
import { NewEvent } from "../../types/types";
import { StyleSheetManager } from "styled-components";
import eventsStore from "../../mobX/stores/eventsStore";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => {
  return prop !== "priority" && prop !== "image";
};

export const EventDetailsCard: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { id } = useParams();
  const { t } = useTranslation();
  const KEY = process.env.NEXT_PUBLIC_STORAGE_KEY!;

  useEffect(() => setEvents(eventsStore.getEvents(KEY)), []);

  const event: NewEvent = events.filter((event) => event.id === id)[0];

  if (!event) return <div>Event not found</div>;

  const {
    title,
    description,
    date,
    time,
    location,
    category,
    image,
    priority,
  } = event;

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {title && <Title className={poppins.className}>{title}</Title>}
      <EventCard key={id as string}>
        <BackgroundContainer image={image}></BackgroundContainer>

        {description && (
          <Description className={poppins.className}>{description}</Description>
        )}
        <InfoBox>
          {category && (
            <Category className={poppins.className}>
              {t(`categories.${category}`.toLowerCase())}
            </Category>
          )}
          {priority && (
            <Priority priority={priority} className={poppins.className}>
              {t(`priorities.${priority}`.toLowerCase())}
            </Priority>
          )}
          {location && <Location>{location}</Location>}{" "}
          {(date || time) && (
            <DateAndTime className={poppins.className}>
              {date} {time && t("at")} {time && time}
            </DateAndTime>
          )}
        </InfoBox>

        <EventButtonsBox>
          <EditEventBtn
            type="button"
            href={`/edit-event/${id}`}
            className={poppins.className}
          >
            {t("editEventBtn")}
          </EditEventBtn>
          <DeleteEventBtn
            type="button"
            onClick={() => id && eventsStore.deleteEvent(KEY, id as string)}
            href={"/"}
            className={poppins.className}
          >
            {t("deleteEventBtn")}
          </DeleteEventBtn>
        </EventButtonsBox>
      </EventCard>
    </StyleSheetManager>
  );
});
