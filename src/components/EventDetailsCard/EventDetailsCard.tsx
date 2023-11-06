import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { transformDate } from "../../services/dateTransform";
import { useTranslation } from "react-i18next";

const shouldForwardProp = (prop: string) => {
  return prop !== "priority" && prop !== "image";
};

export const EventDetailsCard: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { id } = useParams();
  const { t } = useTranslation();
  const KEY = process.env.REACT_APP_STORAGE_KEY!;

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
      {title && <Title>{title}</Title>}
      <EventCard key={id}>
        <BackgroundContainer image={image}></BackgroundContainer>

        {description && <Description>{description}</Description>}
        <InfoBox>
          {category && (
            <Category>{t(`categories.${category}`.toLowerCase())}</Category>
          )}
          {priority && (
            <Priority priority={priority}>
              {t(`priorities.${priority}`.toLowerCase())}
            </Priority>
          )}
          {location && <Location>{location}</Location>}{" "}
          {(date || time) && (
            <DateAndTime>
              {date && transformDate(date)} {time && t("at")} {time && time}
            </DateAndTime>
          )}
        </InfoBox>

        <EventButtonsBox>
          <EditEventBtn type="button" to={`/edit-event/${id}`}>
            {t("editEventBtn")}
          </EditEventBtn>
          <DeleteEventBtn
            type="button"
            onClick={() => id && eventsStore.deleteEvent(KEY, id)}
            to={`/`}
          >
            {t("deleteEventBtn")}
          </DeleteEventBtn>
        </EventButtonsBox>
      </EventCard>
    </StyleSheetManager>
  );
});
