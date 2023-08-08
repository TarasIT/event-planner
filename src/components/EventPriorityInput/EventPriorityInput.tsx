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
import Sprite from "../../assest/images/sprite.svg";

export const EventPriorityInput: FC = (): JSX.Element => {
  const [isPriorityListOpened, setIsPriorityListOpened] =
    useState<boolean>(false);
  const [currentPriority, setCurrentPriority] = useState<string>("Select");
  const priorityInputRef = useRef<HTMLDivElement | null>(null);
  const priorityOptions: string[] = ["High", "Medium", "Low"];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      priorityInputRef.current &&
      !priorityInputRef.current.contains(e.target as Node)
    ) {
      setIsPriorityListOpened(false);
    }
  };

  const handlePriorityChanging = (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    const target = e.target as HTMLParagraphElement;
    setCurrentPriority(target.id);
  };

  return (
    <PriorityBox>
      <InputName>Priority</InputName>
      <PriorityInput
        ref={priorityInputRef}
        onClick={() => setIsPriorityListOpened(!isPriorityListOpened)}
        isPriorityListOpened={isPriorityListOpened}
      >
        <p>
          {currentPriority && !isPriorityListOpened
            ? currentPriority
            : "Select"}
        </p>
        <SvgPriorityIcon isPriorityListOpened={isPriorityListOpened}>
          <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
        </SvgPriorityIcon>
        {isPriorityListOpened && (
          <PriorityList isPriorityListOpened={isPriorityListOpened}>
            {priorityOptions.map((priority) => {
              return (
                <PriorityItem key={priority}>
                  <Priority id={priority} onClick={handlePriorityChanging}>
                    {priority}
                  </Priority>
                </PriorityItem>
              );
            })}
          </PriorityList>
        )}
      </PriorityInput>
    </PriorityBox>
  );
};
