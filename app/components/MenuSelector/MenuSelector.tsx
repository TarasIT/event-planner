"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheetManager } from "styled-components";
import {
  MenuSelectorBox,
  MenuSelectorList,
  MenuItem,
  MenuLink,
  LogoutIcon,
  MenuTitle,
} from "./MenuSelector.styled";
import { menuList } from "../../data/menuList";
import { poppins } from "@/app/assets/fonts";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/mobX/useStore";
import { useRouter } from "next/navigation";

const shouldForwardProp = (prop: string) =>
  prop !== "isMenuSelectorOpened" && prop !== "currentLang";

export const MenuSelector: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [isMenuSelectorOpened, setIsMenuSelectorOpened] =
    useState<boolean>(false);
  const authRef = useRef<HTMLDivElement | null>(null);
  const { authStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    if (authRef.current && !authRef.current.contains(e.target as Node)) {
      setIsMenuSelectorOpened(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.id === "logout") {
      await authStore.logout();
      router.push("/");
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <MenuSelectorBox
        ref={authRef}
        currentLang={i18n.language}
        onClick={() => setIsMenuSelectorOpened(!isMenuSelectorOpened)}
        className={poppins.className}
      >
        <MenuTitle>{t("menu")}</MenuTitle>
        {isMenuSelectorOpened && (
          <MenuSelectorList
            currentLang={i18n.language}
            isMenuSelectorOpened={isMenuSelectorOpened}
          >
            {menuList.map((menu) => {
              return (
                <MenuItem key={menu}>
                  <MenuLink id={menu} href={menu} onClick={handleLogout}>
                    {menu === "logout" ? <LogoutIcon size="2em" /> : t(menu)}
                  </MenuLink>
                </MenuItem>
              );
            })}
          </MenuSelectorList>
        )}
      </MenuSelectorBox>
    </StyleSheetManager>
  );
};
