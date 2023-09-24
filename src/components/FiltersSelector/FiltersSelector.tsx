import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  FilterBox,
  SvgFilterIcon,
  FilterList,
  FilterItem,
  CurrentFilter,
  Filter,
  SvgUpIcon,
  SvgDownIcon,
} from "./FiltersSelector.styled";
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "isFilterListOpened" &&
    prop !== "currentFilter" &&
    prop !== "isActive"
  );
};

export const FiltersSelector: FC = (): JSX.Element => {
  const [isFilterListOpened, setIsFilterListOpened] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [filterIndex, setFilterIndex] = useState<number>();
  const [isCurrentIconUp, setIsCurrentIconUp] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const filterBoxRef = useRef<HTMLDivElement | null>(null);
  const filterOptions: string[] = [
    "name",
    "name",
    "data",
    "data",
    "priority",
    "priority",
  ];

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      filterBoxRef.current &&
      !filterBoxRef.current.contains(e.target as Node)
    ) {
      setIsFilterListOpened(false);
    }
  };

  const handleWindowResize = (): void => {
    setViewportWidth(window.innerWidth);
  };

  const handleFilterChanging = (e: React.MouseEvent<HTMLLIElement>): void => {
    const currentTarget = e.currentTarget as HTMLLIElement;
    setFilterIndex(Number(currentTarget.id));

    if (Number(currentTarget.id) % 2 === 0) {
      setIsCurrentIconUp(true);
    } else {
      setIsCurrentIconUp(false);
    }

    switch (Number(currentTarget.id)) {
      case 0:
        setCurrentFilter("A-Z");
        return;
      case 1:
        setCurrentFilter("Z-A");
        return;
      default:
        return setCurrentFilter(filterOptions[Number(currentTarget.id)]);
    }
  };

  const handleTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>
  ): void => {
    if (
      (!isFilterListOpened && e.propertyName === "padding-right") ||
      (!isFilterListOpened && e.propertyName === "padding-left")
    ) {
      setIsOptionVisible(true);
    }
  };

  const onFilterBoxClick = (): void => {
    setIsOptionVisible(false);
    setIsFilterListOpened(!isFilterListOpened);
  };

  const changeCurrentIcon = (): JSX.Element => {
    return isCurrentIconUp ? (
      <SvgUpIcon>
        <use xlinkHref={`${Sprite}#icon-arrow`}></use>
      </SvgUpIcon>
    ) : (
      <SvgDownIcon>
        <use xlinkHref={`${Sprite}#icon-arrow`}></use>
      </SvgDownIcon>
    );
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <FilterBox
        ref={filterBoxRef}
        onTransitionEnd={handleTransitionEnd}
        isFilterListOpened={isFilterListOpened}
        currentFilter={currentFilter}
        onClick={onFilterBoxClick}
      >
        <CurrentFilter isFilterListOpened={isFilterListOpened}>
          Sort by {isOptionVisible && currentFilter}
        </CurrentFilter>

        {viewportWidth >= 768 && !currentFilter ? (
          <SvgFilterIcon isFilterListOpened={isFilterListOpened}>
            <use xlinkHref={`${Sprite}#icon-filters-2`}></use>
          </SvgFilterIcon>
        ) : (
          viewportWidth >= 768 && changeCurrentIcon()
        )}

        {viewportWidth <= 767 && (
          <SvgFilterIcon
            isFilterListOpened={isFilterListOpened}
            currentFilter={currentFilter}
          >
            <use xlinkHref={`${Sprite}#icon-filters-2`}></use>
          </SvgFilterIcon>
        )}

        {isFilterListOpened && (
          <FilterList isFilterListOpened={isFilterListOpened}>
            {filterOptions.map((filter, index) => {
              return (
                <FilterItem
                  key={nanoid()}
                  id={index.toString()}
                  onClick={handleFilterChanging}
                  currentFilter={currentFilter}
                  isActive={filterIndex === index}
                  isFilterListOpened={isFilterListOpened}
                >
                  <Filter>by {filter}</Filter>
                  {index % 2 === 0 ? (
                    <SvgUpIcon isActive={filterIndex === index}>
                      <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                    </SvgUpIcon>
                  ) : (
                    <SvgDownIcon isActive={filterIndex === index}>
                      <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                    </SvgDownIcon>
                  )}
                </FilterItem>
              );
            })}
          </FilterList>
        )}
      </FilterBox>
    </StyleSheetManager>
  );
};
