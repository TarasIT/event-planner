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
import { StyleSheetManager } from "styled-components";
import { useStore } from "../../hooks/useStore";
import { NewEvent } from "../../types/types";
import { transformDate } from "../../services/dateTransform";

interface PriorityLevel {
  Low: number;
  Medium: number;
  High: number;
  [key: string]: number;
}

const shouldForwardProp = (prop: string) => prop !== "priority";

export const EventsList: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const KEY = process.env.REACT_APP_STORAGE_KEY!;

  const { categoryFilter, eventsStore, eventsSorter } = useStore();

  const currentCategory = categoryFilter.currentCategory;
  const isCategoryFilterOpened = categoryFilter.isOpened;
  const currentSorter = eventsSorter.currentSorter;
  const isSorterIncreased = eventsSorter.isSorterIncreased;

  useEffect(() => setEvents(eventsStore.getEvents(KEY)), []);

  useEffect(() => {
    currentCategory && !isCategoryFilterOpened
      ? setEvents(events.filter(({ category }) => category === currentCategory))
      : currentCategory !== "All" && setEvents(eventsStore.getEvents(KEY));

    if (currentCategory === "All") setEvents(eventsStore.getEvents(KEY));
  }, [currentCategory, isCategoryFilterOpened]);

  (() => {
    const priorityLevel: PriorityLevel = { Low: 0, Medium: 1, High: 2 };

    switch (currentSorter) {
      case "A-Z":
        return events.sort((a, b) => b.title.localeCompare(a.title));
      case "Z-A":
        return events.sort((a, b) => a.title.localeCompare(b.title));

      case "date":
        return isSorterIncreased
          ? events.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          : events.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );

      case "priority":
        return isSorterIncreased
          ? events.sort(
              (a, b) => priorityLevel[b.priority] - priorityLevel[a.priority]
            )
          : events.sort(
              (a, b) => priorityLevel[a.priority] - priorityLevel[b.priority]
            );

      default:
        return events;
    }
  })();

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {events.length !== 0 ? (
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
      ) : (
        <h2>No events found :(</h2>
      )}
    </StyleSheetManager>
  );
});
