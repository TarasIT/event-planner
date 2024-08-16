"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  SorterBox,
  SvgSorterIcon,
  SorterList,
  SorterItem,
  CurrentSorter,
  Sorter,
  SvgUpIcon,
  SvgDownIcon,
} from "./EventsSorter.styled";
import { useStore } from "../../mobX/useStore";
import { sorters } from "../../data/sorters";
import { poppins } from "@/app/assets/fonts";
import { SvgContainer } from "@/app/styles/common.styled";
import { createQueryString } from "@/app/services/createQueryString";
import { useRouter, useSearchParams } from "next/navigation";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "isSorterOpened" &&
    prop !== "currentSorter" &&
    prop !== "isActive" &&
    prop !== "currentLang"
  );
};

export const EventsSorter: FC = (): JSX.Element => {
  const [isSorterOpened, setIsSorterOpened] = useState<boolean>(false);
  const [currentSorter, setCurrentSorter] = useState<string>("");
  const [sorterIndex, setSorterIndex] = useState<number>();
  const [isSorterIncreased, setIsSorterIncreased] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>();
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const sorterBoxRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  const { eventsSorter, eventsStore } = useStore();
  const router = useRouter();
  const queryParams = useSearchParams();
  const sortQueryParam = queryParams.get("sort");
  const ascendingQueryParam = queryParams.get("ascending");

  const doubledSorters: string[] = [];
  sorters.forEach((el) => doubledSorters.push(el, el));

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleClickOutside);
    setViewportWidth(window.innerWidth);

    if (sortQueryParam && ascendingQueryParam) {
      const isAscending = ascendingQueryParam === "true";
      eventsSorter.setIsSorterIncreased(isAscending);
      eventsSorter.setCurrentSorter(sortQueryParam as string);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    eventsSorter.setIsSorterIncreased(isSorterIncreased);
    eventsSorter.setCurrentSorter(currentSorter);
    router.push(createQueryString());
    eventsStore.setLoading(true);
  }, [isSorterIncreased, currentSorter]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      sorterBoxRef.current &&
      !sorterBoxRef.current.contains(e.target as Node)
    ) {
      setIsSorterOpened(false);
    }
  };

  const handleWindowResize = (): void => setViewportWidth(window.innerWidth);

  const handleSorterChanging = (e: React.MouseEvent<HTMLLIElement>): void => {
    const currentTarget = e.currentTarget as HTMLLIElement;
    setSorterIndex(Number(currentTarget.id));

    Number(currentTarget.id) % 2 === 0
      ? setIsSorterIncreased(true)
      : setIsSorterIncreased(false);

    switch (Number(currentTarget.id)) {
      case 0:
        setCurrentSorter("A-Z");
        break;
      case 1:
        setCurrentSorter("Z-A");
        break;
      default:
        setCurrentSorter(doubledSorters[Number(currentTarget.id)]);
    }
  };

  const handleTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>
  ): void => {
    if (
      (!isSorterOpened && e.propertyName === "padding-right") ||
      (!isSorterOpened && e.propertyName === "padding-left")
    ) {
      setIsOptionVisible(true);
    }
  };

  const onSorterBoxClick = (): void => {
    setIsOptionVisible(false);
    setIsSorterOpened(!isSorterOpened);
  };

  const switchSorter = (): string => {
    switch (currentSorter) {
      case "":
        return "";
      case "A-Z":
        return t("sorters.correctAlphabetOrder");
      case "Z-A":
        return t("sorters.reverseAlphabetOrder");
      default:
        return t(`sorters.${currentSorter}`);
    }
  };

  const returnDefaultIcon = (): JSX.Element => {
    return (
      <SvgSorterIcon
        isSorterOpened={isSorterOpened}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5M14 5H20M10 5L4 5M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM16 12H4M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19ZM8 19H20"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </SvgSorterIcon>
    );
  };

  const returnUpOrDownIcon = (index?: number): JSX.Element => {
    if (
      (index !== undefined && index % 2 === 0 && isSorterIncreased) ||
      (index !== undefined && index % 2 === 0 && !isSorterIncreased) ||
      (index === undefined && isSorterIncreased)
    ) {
      return (
        <SvgContainer>
          <SvgUpIcon
            isSorterOpened={isSorterOpened}
            isActive={index === sorterIndex}
          />
        </SvgContainer>
      );
    } else {
      return (
        <SvgContainer>
          <SvgDownIcon
            isSorterOpened={isSorterOpened}
            isActive={index === sorterIndex}
          />
        </SvgContainer>
      );
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <SorterBox
        ref={sorterBoxRef}
        onTransitionEnd={handleTransitionEnd}
        isSorterOpened={isSorterOpened}
        currentSorter={currentSorter}
        currentLang={i18n.language}
        onClick={onSorterBoxClick}
      >
        <CurrentSorter
          isSorterOpened={isSorterOpened}
          className={poppins.className}
        >
          {t("sorters.sortBy")} {isOptionVisible && switchSorter()}
        </CurrentSorter>

        {isSorterOpened ||
        !currentSorter ||
        (viewportWidth && viewportWidth <= 767)
          ? returnDefaultIcon()
          : returnUpOrDownIcon()}

        {isSorterOpened && (
          <SorterList isSorterOpened={isSorterOpened}>
            {doubledSorters.map((sorter, index) => {
              return (
                <SorterItem
                  key={nanoid()}
                  id={index.toString()}
                  onClick={handleSorterChanging}
                  currentSorter={currentSorter}
                  isActive={sorterIndex === index}
                  isSorterOpened={isSorterOpened}
                  className={poppins.className}
                >
                  <Sorter>
                    {t("sorters.by")} {t(`sorters.${sorter}`)}
                  </Sorter>
                  {returnUpOrDownIcon(index)}
                </SorterItem>
              );
            })}
          </SorterList>
        )}
      </SorterBox>
    </StyleSheetManager>
  );
};
