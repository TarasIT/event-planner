"use client";

import React, { FC, useEffect, useState } from "react";
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
import { poppins } from "@/app/assets/fonts";
import { toast } from "react-toastify";
import Loading from "@/app/loading";
import { NewEvent } from "@/app/types/types";
import { transformDate } from "@/app/services/dateTransform";

interface EventListProps {
  eventsData: NewEvent[] | null;
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
  ({ eventsData, error }): JSX.Element => {
    const { eventsStore } = useStore();
    const [events, setEvents] = useState<NewEvent[] | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
      if (eventsData) {
        setEvents(eventsData);
        eventsStore.setEvents(eventsData);
      }
      if (error) {
        toast.error(error);
        eventsStore.setError(error);
      }
      eventsStore.setLoading(false);
    }, [eventsData, error]);

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
                            {transformDate(date)} {time && t("at")}{" "}
                            {time && time.toLowerCase()}
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
                    <EventDetailsBox description={description}>
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
        )}
        {eventsStore.isLoading && <Loading />}
        {events && !events.length && !eventsStore.isLoading && (
          <NoEventsFoundTitle className={poppins.className}>
            {!events.length ? t("noEventsFound") : t("firstEvent")}
          </NoEventsFoundTitle>
        )}
      </StyleSheetManager>
    );
  }
);

export default EventsList;
