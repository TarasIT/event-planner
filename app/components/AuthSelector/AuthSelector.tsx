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
import { useRouter } from "next/navigation";

const shouldForwardProp = (prop: string) =>
  prop !== "isAuthSelectorOpened" && prop !== "currentLang";

export const AuthSelector: FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [isAuthSelectorOpened, setIsAuthSelectorOpened] =
    useState<boolean>(false);
  const authRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent): void => {
    if (authRef.current && !authRef.current.contains(e.target as Node)) {
      setIsAuthSelectorOpened(false);
    }
  };

  const onAuthBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { id } = e.currentTarget;
    switch (id) {
      case "login":
        router.push("/login");
        break;
      case "signup":
        router.push("/signup");
        break;
      default:
        fetch(
          "https://event-planner-api.onrender.com/api/auth/google/redirect"
        );
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
        <OpenAuthSelectorIcon
          isAuthSelectorOpened={isAuthSelectorOpened}
          size="1.5em"
        />

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
                    {auth === "google" ? <GoogleIcon size="2em" /> : t(auth)}
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
