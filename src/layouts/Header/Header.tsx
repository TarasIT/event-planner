import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  Container,
  AppHeader,
  HomeLink,
  SearchBox,
  SearchInput,
  SearchLabel,
  SvgSearchIcon,
  SvgDeleteIcon,
} from "./Header.styled";
import Sprite from "../../assets/images/sprite.svg";
import { LanguagesSelector } from "../../components/LanguagesSelector/LanguagesSelector";
import { useStore } from "../../hooks/useStore";

const shouldForwardProp = (prop: string) => prop !== "query";

export const Header: FC = (): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const { t } = useTranslation();
  const { eventsSearch } = useStore();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const debouncedEventsSearch = (): void => eventsSearch.getUserQuery(query);

    const delayedSearch = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(debouncedEventsSearch, 300);
    };
    delayedSearch();

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
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
                value={query}
                onChange={handleInputChange}
                placeholder={t("searchInputPlaceholdder")}
              />
              <SvgDeleteIcon onClick={() => setQuery("")} query={query}>
                <use xlinkHref={`${Sprite}#icon-cross-small`}></use>
              </SvgDeleteIcon>
            </SearchLabel>
          </SearchBox>

          <LanguagesSelector />
        </Container>
      </AppHeader>
    </StyleSheetManager>
  );
};
