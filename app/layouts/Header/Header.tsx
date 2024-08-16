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
import { MenuSelector } from "@/app/components/MenuSelector/MenuSelector";
import { observer } from "mobx-react";
import { createQueryString } from "@/app/services/createQueryString";
import { useRouter, useSearchParams } from "next/navigation";

const shouldForwardProp = (prop: string) =>
  prop !== "isLoggedIn" && prop !== "query";

const Header: FC = observer((): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const { t } = useTranslation();
  const { authStore, eventsSearch, eventsStore } = useStore();
  const queryParams = useSearchParams();
  const searchQueryParam = queryParams.get("search");
  const router = useRouter();

  useEffect(() => {
    if (searchQueryParam) {
      eventsSearch.setSearchQuery(searchQueryParam);
      setQuery(searchQueryParam);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const debouncedEventsSearch = (): void => {
      eventsSearch.setSearchQuery(query);
      if (eventsSearch.searchQuery) eventsStore.setLoading(true);
      router.push(createQueryString());
    };

    const delayedSearch = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(debouncedEventsSearch, 500);
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
          <HomeLink
            href="/"
            isLoggedIn={authStore.isLoggedIn}
            className={alata.className}
          >
            {t("appTitle")}
          </HomeLink>

          {authStore.isLoggedIn && (
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
                <DeleteIcon onClick={() => setQuery("")} query={query} />
              </SearchLabel>
            </SearchBox>
          )}

          <LanguagesSelector />
          {authStore.isLoggedIn ? <MenuSelector /> : <AuthSelector />}
        </Container>
      </AppHeader>
    </StyleSheetManager>
  );
});

export default Header;
