"use client";

import React, { FC } from "react";
import { Container, Title, Menu, MenuItem } from "./AppBar.styled";
import { CategoriesSelector } from "../CategoriesSelector/CategoriesSelector";
import { EventsSorter } from "../EventsSorter/EventsSorter";
import { AddEventButton } from "../AddEventButton/AddEventButton";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";

export const AppBar: FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title className={poppins.className}>{t("homePageTitle")}</Title>
      <Menu>
        <MenuItem>
          <CategoriesSelector />
        </MenuItem>
        <MenuItem>
          <EventsSorter />
        </MenuItem>
        <MenuItem>
          <AddEventButton />
        </MenuItem>
      </Menu>
    </Container>
  );
};
