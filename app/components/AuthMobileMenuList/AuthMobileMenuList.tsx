"use client";

import React, { FC, useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import {
  AuthMobileList,
  AuthItem,
  AuthBtn,
  GoogleIcon,
} from "./AuthMobileMenuList.styled";
import { poppins } from "@/app/assets/fonts";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { authList } from "@/app/data/authList";
import { Spinner } from "@/app/styles/common.styled";

interface MobileMenuProps {
  closeMobileMenu: () => void;
}

const shouldForwardProp = (prop: string) =>
  prop !== "isMenuSelectorOpened" && prop !== "currentLang";

export const AuthMobileMenuList: FC<MobileMenuProps> = ({
  closeMobileMenu,
}): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pathname && setLoading(false);
  }, [pathname, setLoading]);

  const onMenuBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    switch (e.currentTarget.id) {
      case "signup":
        router.push("/signup");
        closeMobileMenu();
        break;
      case "login":
        router.push("/login");
        closeMobileMenu();
        break;
      default:
        setLoading(true);
        window.location.href =
          "https://event-planner-api.onrender.com/api/auth/google/redirect";
        break;
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <AuthMobileList className={poppins.className} currentLang={i18n.language}>
        {authList.map((auth) => {
          return (
            <AuthItem key={auth}>
              {
                <AuthBtn
                  type="button"
                  id={auth}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onMenuBtnClick(e);
                  }}
                >
                  {auth === "google" && !isLoading ? (
                    <GoogleIcon />
                  ) : auth === "google" && isLoading ? (
                    <Spinner />
                  ) : (
                    t(auth)
                  )}
                </AuthBtn>
              }
            </AuthItem>
          );
        })}
      </AuthMobileList>
    </StyleSheetManager>
  );
};
