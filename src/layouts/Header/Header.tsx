import React, { ChangeEvent, FC } from "react";
import _ from "lodash";
import {
  Container,
  AppHeader,
  HomeLink,
  SearchBox,
  SearchInput,
  SearchLabel,
  SvgSearchIcon,
} from "./Header.styled";
import Sprite from "../../assets/images/sprite.svg";
import { LanguagesSelector } from "../../components/LanguagesSelector/LanguagesSelector";
import { useTranslation } from "react-i18next";
import { useStore } from "../../hooks/useStore";

export const Header: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { eventsSearch } = useStore();

  const handleInputChange = _.debounce(
    (e: ChangeEvent<HTMLInputElement>): void => {
      eventsSearch.getUserQuery(e.target.value.trim().toLowerCase());
    },
    300
  );

  return (
    <AppHeader>
      <Container>
        <HomeLink to="/">{t("appTitle")}</HomeLink>

        <SearchBox>
          <SearchLabel>
            <SvgSearchIcon>
              <use xlinkHref={`${Sprite}#icon-search`}></use>
            </SvgSearchIcon>
            <SearchInput
              type="text"
              onChange={handleInputChange}
              placeholder={t("searchInputPlaceholdder")}
            />
          </SearchLabel>
        </SearchBox>

        <LanguagesSelector />
      </Container>
    </AppHeader>
  );
};
