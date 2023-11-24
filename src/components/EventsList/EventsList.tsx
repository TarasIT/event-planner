import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
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
  NoEventsFoundTitle,
} from "./EventsList.styled";
import { useStore } from "../../hooks/useStore";
import { NewEvent } from "../../types/types";
import { transformDate } from "../../services/dateTransform";
import paginationStore from "../../mobX/stores/paginationStore";

const shouldForwardProp = (prop: string) => prop !== "priority";

export const EventsList: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const { t } = useTranslation();
  const { categoryFilter, eventsStore, eventsSorter, eventsSearch } =
    useStore();

  const allEvents = eventsStore.getEvents(process.env.REACT_APP_STORAGE_KEY!);

  const currentPage = paginationStore.currentPage;

  const currentCategory = categoryFilter.currentCategory;
  const eventsByCategory = categoryFilter.filterEventsByCategory();

  const userQuery = eventsSearch.searchQuery;

  const currentSorter = eventsSorter.currentSorter;
  const isSorterIncreased = eventsSorter.isSorterIncreased;

  const isCategory = (currentCategory && currentCategory !== "All") as boolean;

  const areCategoriesAll = (!currentCategory ||
    currentCategory === "All") as boolean;

  const displayEvents = (events: NewEvent[]): NewEvent[] => {
    return paginationStore.displayEventsPerPage(events);
  };

  const searchEvents = (events: NewEvent[]): NewEvent[] => {
    return eventsSearch.filterEventsByQuery(events);
  };

  const sortEvents = (events: NewEvent[]): NewEvent[] => {
    return eventsSorter.sortEvents(events);
  };

  useLayoutEffect(() => {
    if (areCategoriesAll && !userQuery) setEvents(displayEvents(allEvents));

    if (isCategory && !userQuery) setEvents(displayEvents(eventsByCategory));

    if (areCategoriesAll && userQuery)
      setEvents(displayEvents(searchEvents(allEvents)));

    if (isCategory && userQuery)
      setEvents(displayEvents(searchEvents(eventsByCategory)));

    if (currentSorter && isCategory && (!userQuery || userQuery))
      setEvents(displayEvents(sortEvents(searchEvents(eventsByCategory))));

    if (currentSorter && areCategoriesAll && (!userQuery || userQuery))
      setEvents(displayEvents(sortEvents(searchEvents(allEvents))));
  }, [
    currentCategory,
    userQuery,
    currentSorter,
    isSorterIncreased,
    currentPage,
  ]);

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
        <NoEventsFoundTitle>
          {currentCategory || userQuery ? t("noEventsFound") : t("firstEvent")}
        </NoEventsFoundTitle>
      )}
    </StyleSheetManager>
  );
});
