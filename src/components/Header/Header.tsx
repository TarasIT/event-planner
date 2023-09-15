import React, { FC } from "react";
import {
  Container,
  AppHeader,
  Title,
  SearchBox,
  SearchInput,
  SearchLabel,
  SvgSearchIcon,
} from "./Header.styled";
import Sprite from "../../assets/images/sprite.svg";
import { LanguagesSelector } from "../LanguagesSelector/LanguagesSelector";

export const Header: FC = (): JSX.Element => {
  return (
    <AppHeader>
      <Container>
        <Title>Event Planner</Title>

        <SearchBox>
          <SearchLabel>
            <SvgSearchIcon>
              <use xlinkHref={`${Sprite}#icon-search`}></use>
            </SvgSearchIcon>
            <SearchInput type="text" placeholder="Search by keywords" />
          </SearchLabel>
        </SearchBox>

        <LanguagesSelector />
      </Container>
    </AppHeader>
  );
};
