import React, { FC, useEffect, useState } from "react";
import {
  EventCardsList,
  BackgroundContainer,
  Category,
  CategoryContainer,
  DateAndTime,
  DateTimeLocationContainer,
  Description,
  EventCard,
  Location,
  Priority,
  Title,
  TitleDescriptionContainer,
  EventDetailsBtn,
  EventDetailsBox,
} from "./EventsList.styled";
import { parseEventsFromLS } from "../../services/LocalStorageService";
import { NewEvent } from "../../types/types";
import { StyleSheetManager } from "styled-components";

const shouldForwardProp = (prop: string) => prop !== "priority";

export const EventsList: FC = (): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const STORAGE_KEY = "events";

  useEffect(() => setEvents(parseEventsFromLS(STORAGE_KEY)), []);

  const transformDate = (date: string) => {
    const inputDate = new Date(date);
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {events.length !== 0 && (
        <EventCardsList>
          {events.map(
            ({
              id,
              title,
              description,
              date,
              time,
              location,
              category,
              image,
              priority,
            }) => {
              return (
                <EventCard key={id}>
                  <BackgroundContainer image={image}>
                    <CategoryContainer>
                      {category && <Category>{category}</Category>}
                      {priority && (
                        <Priority priority={priority}>{priority}</Priority>
                      )}
                    </CategoryContainer>
                    <DateTimeLocationContainer>
                      {(date || time) && (
                        <DateAndTime>
                          {date && transformDate(date)} {time && "at"}{" "}
                          {time && time}
                        </DateAndTime>
                      )}
                      {location && <Location>{location}</Location>}
                    </DateTimeLocationContainer>
                  </BackgroundContainer>
                  <TitleDescriptionContainer>
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                  </TitleDescriptionContainer>
                  <EventDetailsBox>
                    <EventDetailsBtn to={`/event-details/${id}`}>
                      More info
                    </EventDetailsBtn>
                  </EventDetailsBox>
                </EventCard>
              );
            }
          )}
        </EventCardsList>
      )}
    </StyleSheetManager>
  );
};
