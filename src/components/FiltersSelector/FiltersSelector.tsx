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

export const FiltersSelector: FC = (): JSX.Element => {
  const [isFilterListOpened, setIsFilterListOpened] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [isCurrentIconUp, setIsCurrentIconUp] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false);
  const filterBoxRef = useRef<HTMLDivElement | null>(null);
  const filterOptions: string[] = ["name", "data", "priority"];

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("mousedown", handleClickOutside);
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

    if (currentTarget.id.includes("up")) setIsCurrentIconUp(true);
    if (!currentTarget.id.includes("up")) setIsCurrentIconUp(false);

    switch (currentTarget.id.split("/")[0]) {
      case filterOptions[0]:
        if (currentFilter === "A-Z") setCurrentFilter("Z-A");
        if (currentFilter !== "A-Z") setCurrentFilter("A-Z");
        return;

      default:
        return setCurrentFilter(currentTarget.id.split("/")[0]);
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
        <SvgFilterIcon isFilterListOpened={isFilterListOpened}>
          <use xlinkHref={`${Sprite}#icon-filters-2`}></use>
        </SvgFilterIcon>
      )}

      {isFilterListOpened && (
        <FilterList isFilterListOpened={isFilterListOpened}>
          {filterOptions.map((filter) => {
            return (
              <Fragment key={nanoid()}>
                <FilterItem id={filter + "/up"} onClick={handleFilterChanging}>
                  <Filter>by {filter}</Filter>
                  <SvgUpIcon>
                    <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                  </SvgUpIcon>
                </FilterItem>
                <FilterItem id={filter} onClick={handleFilterChanging}>
                  <Filter>by {filter}</Filter>
                  <SvgDownIcon>
                    <use xlinkHref={`${Sprite}#icon-arrow`}></use>
                  </SvgDownIcon>
                </FilterItem>
              </Fragment>
            );
          })}
        </FilterList>
      )}
    </FilterBox>
  );
};
