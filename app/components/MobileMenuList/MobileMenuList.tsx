"use client";

import React, { FC, useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import {
  MenuSelectorList,
  MenuItem,
  MenuBtn,
  LogoutIcon,
} from "./MobileMenuList.styled";
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
} from "@/app/styles/common.styled";

interface MobileMenuProps {
  closeMobileMenu: () => void;
}

const shouldForwardProp = (prop: string) =>
  prop !== "isMenuSelectorOpened" && prop !== "currentLang";

export const MobileMenuList: FC<MobileMenuProps> = ({
  closeMobileMenu,
}): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const { authStore, eventsStore } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/edit-event")) eventsStore.setEvent(null);
  }, [pathname]);

  const onMenuItemClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.id === "logout") {
      setIsModalOpened(true);
    } else {
      router.push(`/profile?lang=${i18n.language}`);
      closeMobileMenu();
    }
  };

  const logOut = async (): Promise<void> => {
    setIsModalOpened(false);
    closeMobileMenu();
    await authStore.logout();
    router.push(`/?lang=${i18n.language}`);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <MenuSelectorList
        className={poppins.className}
        currentLang={i18n.language}
      >
        {menuList.map((menu) => {
          return (
            <MenuItem key={menu}>
              {
                <MenuBtn
                  type="button"
                  id={menu}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    onMenuItemClick(e)
                  }
                >
                  {menu === "logout" ? <LogoutIcon /> : t(`common.${menu}`)}
                </MenuBtn>
              }
            </MenuItem>
          );
        })}
      </MenuSelectorList>

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
    </StyleSheetManager>
  );
};
