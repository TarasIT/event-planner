import React, { FC } from "react";
import {
  Container,
  Header,
  Link,
  SearchBox,
  SearchInput,
  SearchLabel,
  SvgSearchIcon,
} from "./AppBar.styled";
import Sprite from "../../assest/images/sprite.svg";
import { LanguagesBox } from "../LanguagesBox/LanguagesBox";

export const AppBar: FC = (): JSX.Element => {
  return (
    <Header>
      <Container>
        <Link>Event Planner</Link>

        <SearchBox>
          <SearchLabel>
            <SvgSearchIcon>
              <use xlinkHref={`${Sprite}#icon-search`}></use>
            </SvgSearchIcon>
            <SearchInput type="text" placeholder="Search by keywords" />
          </SearchLabel>
        </SearchBox>

        <LanguagesBox />
      </Container>
    </Header>
  );
};
