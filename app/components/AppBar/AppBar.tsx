"use client";

import React, { FC, useEffect, useState } from "react";
import { Container, Title, Menu, MenuItem } from "./AppBar.styled";
import { CategoriesSelector } from "../CategoriesSelector/CategoriesSelector";
import { EventsSorter } from "../EventsSorter/EventsSorter";
import { AddEventButton } from "../AddEventButton/AddEventButton";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { ResetEventFilters } from "../ResetEventFilters/ResetEventFilters";
import { useStore } from "@/app/mobX/useStore";
import { StyleSheetManager } from "styled-components";
import { observer } from "mobx-react";

const shouldForwardProp = (prop: string) => prop !== "areFiltersEmpty";

export const AppBar: FC = observer((): JSX.Element => {
  const [areFiltersEmpty, setAreFiltersEmpty] = useState<boolean>(true);
  const { t } = useTranslation();
  const { filtersStore } = useStore();

  useEffect(() => {
    setAreFiltersEmpty(filtersStore.checkIfFiltersEmpty());
  }, [filtersStore.checkIfFiltersEmpty]);

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Container>
        <Title className={poppins.className}>
          {t("homePage.homePageTitle")}
        </Title>
        <Menu>
          {!areFiltersEmpty && (
            <MenuItem areFiltersEmpty={areFiltersEmpty}>
              <ResetEventFilters />
            </MenuItem>
          )}

          <MenuItem areFiltersEmpty={areFiltersEmpty}>
            <CategoriesSelector />
          </MenuItem>
          <MenuItem areFiltersEmpty={areFiltersEmpty}>
            <EventsSorter />
          </MenuItem>
          <MenuItem areFiltersEmpty={areFiltersEmpty}>
            <AddEventButton />
          </MenuItem>
        </Menu>
      </Container>
    </StyleSheetManager>
  );
});
