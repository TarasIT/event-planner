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
import Sprite from "../../assets/images/sprite.svg";
import { useStore } from "../../hooks/useStore";
import { sorters } from "../../data/sorters";

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
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const sorterBoxRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  const { eventsSorter } = useStore();

  const doubledSorters: string[] = [];
  sorters.forEach((el) => doubledSorters.push(el, el));

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    eventsSorter.checkIsSorterIncreased(isSorterIncreased);
    eventsSorter.getCurrentSorter(currentSorter);
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
        return;
      case 1:
        setCurrentSorter("Z-A");
        return;
      default:
        return setCurrentSorter(doubledSorters[Number(currentTarget.id)]);
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

  const changeCurrentIcon = (): JSX.Element => {
    return isSorterIncreased ? (
      <SvgUpIcon>
        <use xlinkHref={`${Sprite}#icon-arrow`}></use>
      </SvgUpIcon>
    ) : (
      <SvgDownIcon>
        <use xlinkHref={`${Sprite}#icon-arrow`}></use>
      </SvgDownIcon>
    );
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
        <CurrentSorter isSorterOpened={isSorterOpened}>
          {t("sorters.sortBy")} {isOptionVisible && switchSorter()}
        </CurrentSorter>

        {viewportWidth >= 768 && !currentSorter ? (
          <SvgSorterIcon isSorterOpened={isSorterOpened}>
            <use xlinkHref={`${Sprite}#icon-sorters-2`}></use>
          </SvgSorterIcon>
        ) : (
          viewportWidth >= 768 && changeCurrentIcon()
        )}

        {viewportWidth <= 767 && (
          <SvgSorterIcon
            isSorterOpened={isSorterOpened}
            currentSorter={currentSorter}
          >
            <use xlinkHref={`${Sprite}#icon-sorters-2`}></use>
          </SvgSorterIcon>
        )}

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
                >
                  <Sorter>
                    {t("sorters.by")} {t(`sorters.${sorter}`)}
                  </Sorter>
                  {index % 2 === 0 ? (
                    <SvgUpIcon isActive={sorterIndex === index}>
                      <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                    </SvgUpIcon>
                  ) : (
                    <SvgDownIcon isActive={sorterIndex === index}>
                      <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                    </SvgDownIcon>
                  )}
                </SorterItem>
              );
            })}
          </SorterList>
        )}
      </SorterBox>
    </StyleSheetManager>
  );
};
