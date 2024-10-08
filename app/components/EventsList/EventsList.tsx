"use client";

import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import { useRouter } from "next/navigation";
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
  NoEventsTitle,
} from "./EventsList.styled";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { toast } from "react-toastify";
import Loading from "@/app/loading";
import { NewEvent } from "@/app/types/types";
import { transformDate } from "@/app/services/dateTransform";
import { Spinner } from "@/app/styles/common.styled";
import filtersStore from "@/app/mobX/stores/filtersStore";
import { localizeResponses } from "@/app/services/localizeResponses";

interface EventListProps {
  eventsList: NewEvent[] | null;
  error: string | null;
}

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "description" &&
    prop !== "image" &&
    prop !== "priority" &&
    prop !== "isPageIncreased" &&
    prop !== "isLoading"
  );
};

const EventsList: FC<EventListProps> = observer(
  ({ eventsList, error }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [eventId, setEventId] = useState<number>();
    const [events, setEvents] = useState<NewEvent[] | null>(null);
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { eventsStore, authStore, eventsSearch, categoryFilter } = useStore();

    useEffect(() => {
      eventsStore.setLoading(false);
    }, []);

    useEffect(() => {
      if (eventsList) {
        setEvents(eventsList);
        eventsStore.setEvents(eventsList);
      }

      if (error) {
        if (error === "Unauthenticated.") {
          authStore.deleteToken();
          authStore.setLoggedIn(false);
          router.push(`/?lang=${i18n.language}`);
          return;
        }
        if (error !== "No events found.") {
          toast.error(t(localizeResponses(error)));
          eventsStore.setError(error);
        }
      }

      if (filtersStore.areFiltersReseted) filtersStore.setFiltersReseted(false);
    }, [
      eventsList,
      error,
      authStore.deleteToken,
      router.push,
      toast.error,
      eventsStore.setError,
      filtersStore.areFiltersReseted,
    ]);

    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {events && (
          <EventCardsList isLoading={eventsStore.isLoading}>
            {events.map(
              ({
                id,
                title,
                description,
                date,
                time,
                location,
                category,
                picture,
                priority,
              }) => {
                return (
                  <EventCard key={id}>
                    <BackgroundContainer picture={picture as string}>
                      <CategoryContainer>
                        {category && (
                          <Category className={poppins.className}>
                            {t(`common.categories.${category}`.toLowerCase())}
                          </Category>
                        )}
                        {priority && (
                          <Priority
                            priority={priority}
                            className={poppins.className}
                          >
                            {t(
                              `common.eventForm.priorities.${priority.toLowerCase()}`
                            )}
                          </Priority>
                        )}
                      </CategoryContainer>
                      <DateTimeLocationContainer>
                        {(date || time) && (
                          <DateAndTime className={poppins.className}>
                            {transformDate(date)} {time && t("common.at")}{" "}
                            {time && time.toLowerCase()}
                          </DateAndTime>
                        )}
                        {location && (
                          <Location className={poppins.className}>
                            {location}
                          </Location>
                        )}
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
                    <EventDetailsBox description={description}>
                      <EventDetailsBtn
                        id={id}
                        type="button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          setEventId(Number(e.currentTarget.id));
                          setIsLoading(true);
                          router.push(
                            `/event-details/${id}?lang=${i18n.language}`
                          );
                        }}
                        className={poppins.className}
                      >
                        {isLoading && eventId === id ? (
                          <Spinner />
                        ) : (
                          t("homePage.moreInfoBtn")
                        )}
                      </EventDetailsBtn>
                    </EventDetailsBox>
                  </EventCard>
                );
              }
            )}
          </EventCardsList>
        )}
        {eventsStore.isLoading && <Loading />}

        {(!events || !events.length) && (
          <NoEventsTitle className={poppins.className}>
            {!eventsStore.isLoading &&
              (eventsSearch.searchQuery || categoryFilter.currentCategory) &&
              t("homePage.noEventsFoundByQuery")}
            {!eventsStore.isLoading &&
              !eventsSearch.searchQuery &&
              !categoryFilter.currentCategory &&
              (!eventsStore.events || !eventsStore.events.length) &&
              t("homePage.noEventCreated")}
          </NoEventsTitle>
        )}
      </StyleSheetManager>
    );
  }
);

export default EventsList;
