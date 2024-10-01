"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheetManager } from "styled-components";
import {
  MenuSelectorBox,
  MenuSelectorList,
  MenuItem,
  MenuBtn,
  LogoutIcon,
  MenuTitle,
} from "./MenuSelector.styled";
import { menuList } from "../../data/menuList";
import { poppins } from "@/app/assets/fonts";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/mobX/useStore";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../Modal/Modal";
import {
  ModalActions,
  ModalBtn,
  ModalDescription,
  Spinner,
} from "@/app/styles/common.styled";
import { createQueryString } from "@/app/services/createQueryString";

const shouldForwardProp = (prop: string) =>
  prop !== "isMenuSelectorOpened" && prop !== "currentLang";

export const MenuSelector: FC = (): JSX.Element => {
  const [isMenuSelectorOpened, setIsMenuSelectorOpened] =
    useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const authRef = useRef<HTMLDivElement | null>(null);
  const { authStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    pathname !== "/home" && setIsLoading(false);
  }, [pathname, setIsLoading]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (authRef.current && !authRef.current.contains(e.target as Node)) {
      setIsMenuSelectorOpened(false);
    }
  };

  const onMenuItemClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.id === "logout") {
      setIsModalOpened(true);
    } else {
      setIsLoading(true);
      router.push(`/profile?lang=${i18n.language}`);
    }
  };

  const logOut = async (): Promise<void> => {
    setIsLoading(true);
    setIsModalOpened(false);
    await authStore.logout();
    router.push(`/?lang=${i18n.language}`);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <MenuSelectorBox
        ref={authRef}
        currentLang={i18n.language}
        onClick={() => setIsMenuSelectorOpened(!isMenuSelectorOpened)}
        className={poppins.className}
      >
        <MenuTitle>{isLoading ? <Spinner /> : t("menu")}</MenuTitle>
        {isMenuSelectorOpened && (
          <MenuSelectorList
            currentLang={i18n.language}
            isMenuSelectorOpened={isMenuSelectorOpened}
          >
            {menuList.map((menu) => {
              return (
                <MenuItem key={menu}>
                  <MenuBtn
                    type="button"
                    id={menu}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      onMenuItemClick(e)
                    }
                  >
                    {menu === "logout" ? <LogoutIcon size="2em" /> : t(menu)}
                  </MenuBtn>
                </MenuItem>
              );
            })}
          </MenuSelectorList>
        )}

        <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
          <ModalDescription className={poppins.className}>
            {t("modalMessages.logOut")}
          </ModalDescription>
          <ModalActions>
            <ModalBtn
              type="button"
              className={poppins.className}
              onClick={logOut}
            >
              {t("yes")}
            </ModalBtn>
            <ModalBtn
              type="button"
              className={poppins.className}
              onClick={() => setIsModalOpened(false)}
            >
              {t("no")}
            </ModalBtn>
          </ModalActions>
        </Modal>
      </MenuSelectorBox>
    </StyleSheetManager>
  );
};
