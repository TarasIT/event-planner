import React, { FC, useEffect, useRef, useState } from "react";
import {
  PriorityBox,
  PriorityInput,
  SvgPriorityIcon,
  PriorityList,
  PriorityItem,
  Priority,
  InputName,
} from "./EventPriorityInput.styled";
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";
import { priorities } from "../../data/priorities";
import { useTranslation } from "react-i18next";

interface PriorityInputProps {
  setPriority: (priority: string) => void;
  event: NewEvent;
}

const shouldForwardProp = (prop: string) => prop !== "isPriorityListOpened";

export const EventPriorityInput: FC<PriorityInputProps> = ({
  setPriority,
  event,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isPriorityListOpened, setIsPriorityListOpened] =
    useState<boolean>(false);
  const [currentPriority, setCurrentPriority] = useState<string>("");
  const priorityInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.priority) {
      setPriority(event.priority);
      setCurrentPriority(event.priority);
    }
  }, [event]);

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
    setPriority(target.id);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <PriorityBox>
        <InputName>{t("priorityInput")}</InputName>
        <PriorityInput
          ref={priorityInputRef}
          onClick={() => setIsPriorityListOpened(!isPriorityListOpened)}
          isPriorityListOpened={isPriorityListOpened}
        >
          <p>
            {currentPriority && !isPriorityListOpened
              ? t(`priorities.${currentPriority}`.toLowerCase())
              : t("select")}
          </p>
          <SvgPriorityIcon isPriorityListOpened={isPriorityListOpened}>
            <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
          </SvgPriorityIcon>
          {isPriorityListOpened && (
            <PriorityList isPriorityListOpened={isPriorityListOpened}>
              {priorities.map((priority) => {
                return (
                  <PriorityItem key={priority}>
                    <Priority id={priority} onClick={handlePriorityChanging}>
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
