import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
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
import { NewEvent } from "../../types/types";
import { StyleSheetManager } from "styled-components";
import { useStore } from "../../hooks/useStore";

const shouldForwardProp = (prop: string) => prop !== "priority";

export const EventsList: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const KEY = process.env.REACT_APP_STORAGE_KEY!;
  const { categoryFilter, eventsStore } = useStore();

  const currentCategory = categoryFilter.currentCategory;
  const isCategoryFilterOpened = categoryFilter.isOpened;

  useEffect(() => setEvents(eventsStore.getEvents(KEY)), []);

  useEffect(() => {
    if (currentCategory && !isCategoryFilterOpened) {
      const filteredEventsByCategory = events.filter(
        ({ category }) => category === currentCategory
      );
      setEvents(filteredEventsByCategory);
    } else {
      setEvents(eventsStore.getEvents(KEY));
    }
  }, [isCategoryFilterOpened, currentCategory]);

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
});
