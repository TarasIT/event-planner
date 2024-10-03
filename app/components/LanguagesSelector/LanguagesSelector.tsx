"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheetManager } from "styled-components";
import i18n from "../../../i18n";
import {
  LangBox,
  OpenLangListIcon,
  LangList,
  LangItem,
} from "./LanguagesSelector.styled";
import { languages } from "../../data/languages";
import { poppins } from "@/app/assets/fonts";
import { SvgContainer } from "@/app/styles/common.styled";
import { observer } from "mobx-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/app/services/createQueryString";

const shouldForwardProp = (prop: string) =>
  prop !== "isLoggedIn" && prop !== "isLangListOpened";

export const LanguagesSelector: FC = observer((): JSX.Element => {
  const [isLangListOpened, setIsLangListOpened] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>(
    i18n.language.toUpperCase()
  );
  const langBoxRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const queryParams = useSearchParams();
  const langQueryParam = queryParams.get("lang");
  const pathname = usePathname();
  const params = new URLSearchParams(queryParams.toString());

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (langQueryParam) {
      setCurrentLang(langQueryParam.toUpperCase());
      i18n.changeLanguage(langQueryParam);
    } else {
      params.set("lang", currentLang.toLowerCase());
      router.push(`${pathname}?${params.toString()}`);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (langBoxRef.current && !langBoxRef.current.contains(e.target as Node)) {
      setIsLangListOpened(false);
    }
  };

  const handleLangChanging = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;
    setCurrentLang(target.id);
    i18n.changeLanguage(target.id.toLowerCase());

    params.set("lang", i18n.language);

    pathname === "/home"
      ? router.push(createQueryString())
      : router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <LangBox
        ref={langBoxRef}
        onClick={() => setIsLangListOpened(!isLangListOpened)}
        className={poppins.className}
      >
        <p>{currentLang}</p>

        <SvgContainer>
          <OpenLangListIcon
            isLangListOpened={isLangListOpened}
            size="0.825em"
          />
        </SvgContainer>

        {isLangListOpened && (
          <LangList isLangListOpened={isLangListOpened}>
            {languages.map((lang) => {
              return (
                <LangItem key={lang}>
                  <p id={lang} onClick={handleLangChanging}>
                    {lang}
                  </p>
                </LangItem>
              );
            })}
          </LangList>
        )}
      </LangBox>
    </StyleSheetManager>
  );
});
