import React, { FC } from "react";
import { Container, Title, Menu, MenuItem } from "./AppBar.styled";
import { CategoriesSelector } from "../CategoriesSelector/CategoriesSelector";
import { EventsSorter } from "../EventsSorter/EventsSorter";
import { AddEventButton } from "../AddEventButton/AddEventButton";

export const AppBar: FC = (): JSX.Element => {
  return (
    <Container>
      <Title>My Events</Title>
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
