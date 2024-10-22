"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheetManager } from "styled-components";
import {
  AuthSelectorBox,
  OpenAuthSelectorIcon,
  AuthSelectorList,
  AuthItem,
  AuthBtn,
  GoogleIcon,
} from "./AuthSelector.styled";
import { authList } from "../../data/authList";
import { poppins } from "@/app/assets/fonts";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@/app/styles/common.styled";
import { createQueryString } from "@/app/services/createQueryString";

const shouldForwardProp = (prop: string) =>
  prop !== "isAuthSelectorOpened" && prop !== "currentLang";

export const AuthSelector: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [isAuthSelectorOpened, setIsAuthSelectorOpened] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    pathname !== "/" && setIsLoading(false);
  }, [pathname, setIsLoading]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (authRef.current && !authRef.current.contains(e.target as Node)) {
      setIsAuthSelectorOpened(false);
    }
  };

  const onAuthBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const id = e.currentTarget.id;

    switch (id) {
      case "login":
        if (pathname !== "/login") {
          setIsLoading(true);
          router.push(`/login?lang=${i18n.language}`);
        }
        break;
      case "signup":
        if (pathname !== "/signup") {
          setIsLoading(true);
          router.push(`/signup?lang=${i18n.language}`);
        }
        break;
      default:
        setIsLoading(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/redirect`;
        break;
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <AuthSelectorBox
        ref={authRef}
        currentLang={i18n.language}
        onClick={() => setIsAuthSelectorOpened(!isAuthSelectorOpened)}
        className={poppins.className}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <OpenAuthSelectorIcon
            isAuthSelectorOpened={isAuthSelectorOpened}
            size="1.5em"
          />
        )}

        {isAuthSelectorOpened && (
          <AuthSelectorList
            currentLang={i18n.language}
            isAuthSelectorOpened={isAuthSelectorOpened}
          >
            {authList.map((auth) => {
              return (
                <AuthItem key={auth}>
                  <AuthBtn
                    type="button"
                    id={auth}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      onAuthBtnClick(e)
                    }
                  >
                    {auth === "google" ? (
                      <GoogleIcon size="2em" />
                    ) : (
                      t(`common.${auth}`)
                    )}
                  </AuthBtn>
                </AuthItem>
              );
            })}
          </AuthSelectorList>
        )}
      </AuthSelectorBox>
    </StyleSheetManager>
  );
};
