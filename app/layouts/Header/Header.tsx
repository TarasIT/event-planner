"use client";

import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  Container,
  AppHeader,
  HomeBtn,
  SearchBox,
  SearchInput,
  SearchLabel,
  SearchIcon,
  DeleteIcon,
  OpenMobileMenuIcon,
} from "./Header.styled";
import { AuthSelector } from "../../components/AuthSelector/AuthSelector";
import { LanguagesSelector } from "../../components/LanguagesSelector/LanguagesSelector";
import { useStore } from "../../mobX/useStore";
import { alata, poppins } from "@/app/assets/fonts";
import { MenuSelector } from "@/app/components/MenuSelector/MenuSelector";
import { observer } from "mobx-react";
import { createQueryString } from "@/app/services/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MobileMenu } from "@/app/components/MobileMenu/MobileMenu";
import { MobileMenuList } from "@/app/components/MobileMenuList/MobileMenuList";
import { AuthMobileMenuList } from "@/app/components/AuthMobileMenuList/AuthMobileMenuList";

const shouldForwardProp = (prop: string) =>
  prop !== "isLoggedIn" && prop !== "query" && prop !== "pathname";

const Header: FC = observer((): JSX.Element => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { t, i18n } = useTranslation();
  const { authStore, eventsSearch, eventsStore } = useStore();
  const queryParams = useSearchParams();
  const searchQueryParam = queryParams.get("search");
  const router = useRouter();
  const pathname = usePathname();

  const handleResize = (): void => setIsMobileView(window.innerWidth < 768);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    switch (true) {
      case searchQueryParam && pathname === "/home":
        eventsSearch.setSearchQuery(searchQueryParam);
        setQuery(searchQueryParam);
        break;
      case !searchQueryParam && pathname !== "/home":
        eventsSearch.setSearchQuery(eventsSearch.searchQuery);
        setQuery(eventsSearch.searchQuery);
        break;
      default:
        eventsSearch.setSearchQuery("");
        setQuery("");
        break;
    }
  }, [searchQueryParam, pathname]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedEventsSearch = (): void => {
      eventsStore.setLoading(true);
      eventsSearch.setSearchQuery(query);
      router.push(createQueryString());
    };

    const delayedSearch = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(debouncedEventsSearch, 500);
    };

    if (query !== eventsSearch.searchQuery) delayedSearch();

    return () => clearTimeout(timeoutId);
  }, [query, eventsSearch.searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <AppHeader>
        <Container isLoggedIn={authStore.isLoggedIn} pathname={pathname}>
          <HomeBtn
            type="button"
            onClick={(): void => {
              authStore.isLoggedIn
                ? router.push(`/home${createQueryString()}`)
                : router.push(`/?lang=${i18n.language}`);
            }}
            className={alata.className}
          >
            {t("layouts.header.appTitle")}
          </HomeBtn>

          <OpenMobileMenuIcon onClick={() => setIsMobileMenuOpened(true)} />

          {authStore.isLoggedIn && pathname === "/home" && (
            <SearchBox>
              <SearchLabel>
                <SearchIcon />
                <SearchInput
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder={t("layouts.header.searchInputPlaceholder")}
                  className={poppins.className}
                />
                <DeleteIcon
                  onClick={() => {
                    eventsStore.setLoading(true);
                    setQuery("");
                  }}
                  query={query}
                />
              </SearchLabel>
            </SearchBox>
          )}

          {!isMobileView && <LanguagesSelector />}

          {authStore.isLoggedIn && !isMobileView ? (
            <MenuSelector />
          ) : (
            !authStore.isLoggedIn && !isMobileView && <AuthSelector />
          )}
        </Container>
      </AppHeader>

      <MobileMenu
        isOpened={isMobileMenuOpened}
        onClose={() => setIsMobileMenuOpened(false)}
      >
        <LanguagesSelector />
        {authStore.isLoggedIn ? (
          <MobileMenuList
            closeMobileMenu={() => setIsMobileMenuOpened(false)}
          />
        ) : (
          <AuthMobileMenuList
            closeMobileMenu={() => setIsMobileMenuOpened(false)}
          />
        )}
      </MobileMenu>
    </StyleSheetManager>
  );
});

export default Header;
