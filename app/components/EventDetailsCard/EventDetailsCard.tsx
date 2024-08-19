"use client";

import React, { FC, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { transformDate } from "@/app/services/dateTransform";
import { toast } from "react-toastify";
import { useStore } from "@/app/mobX/useStore";

interface EventProps {
  event?: NewEvent | null | undefined;
  error?: string | null | undefined;
}

const shouldForwardProp = (prop: string) => {
  return prop !== "priority" && prop !== "picture";
};

export const EventDetailsCard: FC<EventProps> = observer(
  ({ event, error }): JSX.Element => {
    const { id } = useParams();
    const { t } = useTranslation();
    const router = useRouter();
    const { eventsStore } = useStore();

    useEffect(() => {
      toast.error(error);
    }, [error]);

    const deleteEvent = async (id: string) => {
      await eventsStore.deleteEvent(id as string);
      const { message, error } = eventsStore;
      if (error) toast.error(error);
      if (message) toast.success(message);
      router.push("/home");
    };

    const {
      title,
      description,
      date,
      time,
      location,
      category,
      picture,
      priority,
    } = event as NewEvent;

    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {title && <Title className={poppins.className}>{title}</Title>}
        <EventCard key={id as string}>
          <BackgroundContainer picture={picture} />

          {description && (
            <Description className={poppins.className}>
              {description}
            </Description>
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
                {transformDate(date)} {time && t("at")}{" "}
                {time && time.toLowerCase()}
              </DateAndTime>
            )}
          </InfoBox>

          <EventButtonsBox>
            <EditEventBtn
              type="button"
              onClick={() => router.push(`/edit-event/${id}`)}
              className={poppins.className}
            >
              {t("editEventBtn")}
            </EditEventBtn>
            <DeleteEventBtn
              type="button"
              onClick={() => deleteEvent(id as string)}
              className={poppins.className}
            >
              {t("deleteEventBtn")}
            </DeleteEventBtn>
          </EventButtonsBox>
        </EventCard>
      </StyleSheetManager>
    );
  }
);
