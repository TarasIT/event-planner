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
  EditSpinner,
} from "./EventDetailsCard.styled";
import { NewEvent } from "../../types/types";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { transformDate } from "@/app/services/dateTransform";
import { toast } from "react-toastify";
import { useStore } from "@/app/mobX/useStore";
import {
  ModalActions,
  ModalBtn,
  ModalDescription,
  Spinner,
} from "@/app/styles/common.styled";
import Modal from "../Modal/Modal";
import { createQueryString } from "@/app/services/createQueryString";

interface EventProps {
  event?: NewEvent | null | undefined;
  error?: string | null | undefined;
}

const shouldForwardProp = (prop: string) => {
  return prop !== "priority" && prop !== "picture";
};

export const EventDetailsCard: FC<EventProps> = observer(
  ({ event, error }): JSX.Element => {
    const [isEditionLoading, setIsEditionLoading] = useState<boolean>(false);
    const [isDeletionLoading, setIsDeletionLoading] = useState<boolean>(false);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { eventsStore } = useStore();

    useEffect(() => {
      toast.error(error);
    }, [error]);

    const deleteEvent = async (id: string): Promise<void> => {
      setIsDeletionLoading(true);
      setIsModalOpened(false);
      await eventsStore.deleteEvent(id as string);
      router.push(`/home${createQueryString()}`);
    };

    const editEvent = (id: string): void => {
      setIsEditionLoading(true);
      router.push(`/edit-event/${id}?lang=${i18n.language}`);
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
                {t(`common.categories.${category}`.toLowerCase())}
              </Category>
            )}
            {priority && (
              <Priority priority={priority} className={poppins.className}>
                {t(`common.eventForm.priorities.${priority.toLowerCase()}`)}
              </Priority>
            )}
            {location && (
              <Location className={poppins.className}>{location}</Location>
            )}
            {(date || time) && (
              <DateAndTime className={poppins.className}>
                {transformDate(date)} {time && t("common.at")}{" "}
                {time && time.toLowerCase()}
              </DateAndTime>
            )}
          </InfoBox>

          <EventButtonsBox>
            <EditEventBtn
              type="button"
              name="edit"
              onClick={() => editEvent(id as string)}
              className={poppins.className}
            >
              {isEditionLoading ? (
                <EditSpinner />
              ) : (
                t("eventDetailsPage.editEventBtn")
              )}
            </EditEventBtn>
            <DeleteEventBtn
              type="button"
              name="delete"
              onClick={() => setIsModalOpened(true)}
              className={poppins.className}
            >
              {isDeletionLoading ? (
                <Spinner />
              ) : (
                t("eventDetailsPage.deleteEventBtn")
              )}
            </DeleteEventBtn>
          </EventButtonsBox>

          <Modal
            isOpened={isModalOpened}
            onClose={() => setIsModalOpened(false)}
          >
            <ModalDescription className={poppins.className}>
              {t("modalMessages.deleteEvent")}
            </ModalDescription>
            <ModalActions>
              <ModalBtn
                type="button"
                className={poppins.className}
                onClick={() => deleteEvent(id as string)}
              >
                {t("modalMessages.yes")}
              </ModalBtn>
              <ModalBtn
                type="button"
                className={poppins.className}
                onClick={() => setIsModalOpened(false)}
              >
                {t("modalMessages.no")}
              </ModalBtn>
            </ModalActions>
          </Modal>
        </EventCard>
      </StyleSheetManager>
    );
  }
);
