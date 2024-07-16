"use client";

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
  SearchIcon,
  DeleteIcon,
} from "./Header.styled";
import { AuthSelector } from "../../components/AuthSelector/AuthSelector";
import { LanguagesSelector } from "../../components/LanguagesSelector/LanguagesSelector";
import { useStore } from "../../mobX/useStore";
import { alata, poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => prop !== "query";

const Header: FC = (): JSX.Element => {
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
          {/* <HomeLink href="/" className={alata.className}>
            {t("appTitle")}
          </HomeLink>

          <SearchBox>
            <SearchLabel>
              <SearchIcon />
              <SearchInput
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={t("searchInputPlaceholdder")}
                className={poppins.className}
              />
              <DeleteIcon query={query} />
            </SearchLabel>
          </SearchBox> */}

          <LanguagesSelector />
          <AuthSelector />
        </Container>
      </AppHeader>
    </StyleSheetManager>
  );
};

export default Header;
