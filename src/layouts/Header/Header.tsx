import React, { FC } from "react";
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

export const Header: FC = (): JSX.Element => {
  const { t } = useTranslation();

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
              placeholder={t("searchInputPlaceholdder")}
            />
          </SearchLabel>
        </SearchBox>

        <LanguagesSelector />
      </Container>
    </AppHeader>
  );
};
