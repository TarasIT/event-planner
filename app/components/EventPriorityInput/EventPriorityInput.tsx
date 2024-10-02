"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  PriorityBox,
  PriorityInput,
  SvgPriorityIcon,
  PriorityList,
  PriorityItem,
  Priority,
  InputName,
} from "./EventPriorityInput.styled";
import { NewEvent } from "../../types/types";
import { priorities } from "../../data/priorities";
import { useStore } from "../../mobX/useStore";
import { SvgContainer } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => prop !== "isPriorityListOpened";

export const EventPriorityInput: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [isPriorityListOpened, setIsPriorityListOpened] =
    useState<boolean>(false);
  const [currentPriority, setCurrentPriority] = useState<string>("");
  const priorityInputRef = useRef<HTMLDivElement | null>(null);
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.priority) {
      eventDataStore.setPriority(event.priority);
      setCurrentPriority(event.priority);
    }
  }, [id, eventsStore.event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      priorityInputRef.current &&
      !priorityInputRef.current.contains(e.target as Node)
    ) {
      setIsPriorityListOpened(false);
    }
  };

  const handlePriorityChanging = (
    e: React.MouseEvent<HTMLParagraphElement>
  ): void => {
    const target = e.target as HTMLParagraphElement;
    setCurrentPriority(target.id);
    eventDataStore.setPriority(target.id);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PriorityBox>
        <InputName className={poppins.className}>
          {t("priorityInput")}
        </InputName>
        <PriorityInput
          ref={priorityInputRef}
          onClick={() => setIsPriorityListOpened(!isPriorityListOpened)}
          isPriorityListOpened={isPriorityListOpened}
          className={poppins.className}
        >
          <p>
            {currentPriority && !isPriorityListOpened
              ? t(`priorities.${currentPriority}`.toLowerCase())
              : t("select")}
          </p>
          <SvgContainer>
            <SvgPriorityIcon
              isPriorityListOpened={isPriorityListOpened}
              size="0.825em"
            />
          </SvgContainer>
          {isPriorityListOpened && (
            <PriorityList isPriorityListOpened={isPriorityListOpened}>
              {priorities.map((priority) => {
                return (
                  <PriorityItem key={priority}>
                    <Priority
                      id={priority}
                      onClick={handlePriorityChanging}
                      className={poppins.className}
                    >
                      {t(`priorities.${priority}`.toLowerCase())}
                    </Priority>
                  </PriorityItem>
                );
              })}
            </PriorityList>
          )}
        </PriorityInput>
      </PriorityBox>
    </StyleSheetManager>
  );
};
