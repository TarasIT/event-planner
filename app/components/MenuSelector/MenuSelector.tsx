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
import { observer } from "mobx-react";

const shouldForwardProp = (prop: string) =>
  prop !== "isMenuSelectorOpened" && prop !== "currentLang";

export const MenuSelector: FC = observer((): JSX.Element => {
  const [isMenuSelectorOpened, setIsMenuSelectorOpened] =
    useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const authRef = useRef<HTMLDivElement | null>(null);
  const { authStore, eventsStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/home" && isLoading) setIsLoading(false);
    if (!pathname.includes("/edit-event")) eventsStore.setEvent(null);
    if (authStore.error) setIsLoading(false);
  }, [pathname, isLoading, authStore.error]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (authRef.current && !authRef.current.contains(e.target as Node)) {
      setIsMenuSelectorOpened(false);
    }
  };

  const onMenuItemClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const id = e.currentTarget.id;
    if (id === "logout") {
      setIsModalOpened(true);
    } else if (pathname !== "/profile") {
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
        <MenuTitle>
          {isLoading ? <Spinner /> : t("layouts.header.menu")}
        </MenuTitle>
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
                    {menu === "logout" ? (
                      <LogoutIcon size="2em" />
                    ) : (
                      t(`common.${menu}`)
                    )}
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
              {t("modalMessages.yes")}
            </ModalBtn>
            <ModalBtn
              type="button"
              className={poppins.className}
              onClick={() => setIsModalOpened(false)}
            >
              {t("modalMessages.no")}
            </ModalBtn>
          </ModalActions>
        </Modal>
      </MenuSelectorBox>
    </StyleSheetManager>
  );
});
