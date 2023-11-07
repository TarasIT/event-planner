import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react";
import { StyleSheetManager } from "styled-components";
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
import { useStore } from "../../hooks/useStore";
import { NewEvent } from "../../types/types";
import { transformDate } from "../../services/dateTransform";
import { useTranslation } from "react-i18next";

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

  const { categoryFilter, eventsStore, eventsSorter, eventsSearch } =
    useStore();
  const { t } = useTranslation();

  const currentCategory = categoryFilter.currentCategory;
  const filteredEventsByCategory = categoryFilter.filterEventsByCategory();
  const isCategoryFilterOpened = categoryFilter.isOpened;

  const currentSorter = eventsSorter.currentSorter;
  const isSorterIncreased = eventsSorter.isSorterIncreased;

  const userQuery = eventsSearch.searchQuery;
  const filteredEventsByQuery = eventsSearch.filterEventsByQuery();

  useLayoutEffect(() => setEvents(eventsStore.getEvents(KEY)), []);

  useEffect(() => {
    currentCategory && !isCategoryFilterOpened
      ? setEvents(filteredEventsByCategory)
      : setEvents(eventsStore.getEvents(KEY));
    if (currentCategory === "All") setEvents(eventsStore.getEvents(KEY));

    if (userQuery) setEvents(filteredEventsByQuery);
  }, [currentCategory, isCategoryFilterOpened, eventsSearch.searchQuery]);

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
                      {category && (
                        <Category>
                          {t(`categories.${category}`.toLowerCase())}
                        </Category>
                      )}
                      {priority && (
                        <Priority priority={priority}>
                          {t(`priorities.${priority}`.toLowerCase())}
                        </Priority>
                      )}
                    </CategoryContainer>
                    <DateTimeLocationContainer>
                      {(date || time) && (
                        <DateAndTime>
                          {date && transformDate(date)} {time && t("at")}{" "}
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
                      {t("moreInfoBtn")}
                    </EventDetailsBtn>
                  </EventDetailsBox>
                </EventCard>
              );
            }
          )}
        </EventCardsList>
      ) : (
        <h2>{t("noEventsFound")} :(</h2>
      )}
    </StyleSheetManager>
  );
});
