"use client";

import React, { FC, useLayoutEffect, useRef, useState } from "react";
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
import { useStore } from "../../mobX/useStore";
import { NewEvent } from "../../types/types";
import { transformDate } from "../../services/dateTransform";
import { poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => {
  return prop !== "image" && prop !== "priority" && prop !== "isPageIncreased";
};

const EventsList: FC = observer((): JSX.Element => {
  const [events, setEvents] = useState<NewEvent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isPageIncreased, setIsPageIncreased] = useState<boolean | string>(
    "pending"
  );
  const { t } = useTranslation();
  const {
    categoryFilter,
    eventsStore,
    eventsSorter,
    eventsSearch,
    paginationStore,
  } = useStore();
  const prevPage = useRef<number>();

  const allEvents = eventsStore.getEvents(process.env.NEXT_PUBLIC_STORAGE_KEY!);
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

    setPage(currentPage);
    prevPage.current = page;

    if (prevPage.current < currentPage) setIsPageIncreased(true);
    if (prevPage.current > currentPage) setIsPageIncreased(false);

    if (isPageIncreased === true || !isPageIncreased) {
      setTimeout(() => setIsPageIncreased("pending"), 300);
    }
  }, [
    areCategoriesAll,
    isCategory,
    currentCategory,
    userQuery,
    currentSorter,
    isSorterIncreased,
    currentPage,
    isPageIncreased,
  ]);

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {events.length !== 0 ? (
        <EventCardsList isPageIncreased={isPageIncreased}>
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
                        <Category className={poppins.className}>
                          {t(`categories.${category}`.toLowerCase())}
                        </Category>
                      )}
                      {priority && (
                        <Priority
                          priority={priority}
                          className={poppins.className}
                        >
                          {t(`priorities.${priority}`.toLowerCase())}
                        </Priority>
                      )}
                    </CategoryContainer>
                    <DateTimeLocationContainer>
                      {(date || time) && (
                        <DateAndTime className={poppins.className}>
                          {date && transformDate(date)} {time && t("at")}{" "}
                          {time && time}
                        </DateAndTime>
                      )}
                      {location && <Location>{location}</Location>}
                    </DateTimeLocationContainer>
                  </BackgroundContainer>
                  <TitleDescriptionContainer>
                    {title && (
                      <Title className={poppins.className}>{title}</Title>
                    )}
                    {description && (
                      <Description className={poppins.className}>
                        {description}
                      </Description>
                    )}
                  </TitleDescriptionContainer>
                  <EventDetailsBox>
                    <EventDetailsBtn
                      href={`/event-details/${id}`}
                      className={poppins.className}
                    >
                      {t("moreInfoBtn")}
                    </EventDetailsBtn>
                  </EventDetailsBox>
                </EventCard>
              );
            }
          )}
        </EventCardsList>
      ) : (
        <NoEventsFoundTitle className={poppins.className}>
          {currentCategory || userQuery ? t("noEventsFound") : t("firstEvent")}
        </NoEventsFoundTitle>
      )}
    </StyleSheetManager>
  );
});

export default EventsList;
