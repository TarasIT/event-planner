import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  LangBox,
  SvgLangIcon,
  LangList,
  LangItem,
} from "./LanguagesSelector.styled";
import Sprite from "../../assets/images/sprite.svg";
import { languages } from "../../data/languages";

const shouldForwardProp = (prop: string) => prop !== "isLangListOpened";

export const LanguagesSelector: FC = (): JSX.Element => {
  const [isLangListOpened, setIsLangListOpened] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>("EN");
  const langBoxRef = useRef<HTMLDivElement | null>(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    currentLang === "EN"
      ? i18n.changeLanguage("en")
      : i18n.changeLanguage(currentLang.toLowerCase());
  }, [currentLang]);

  const handleClickOutside = (e: MouseEvent) => {
    if (langBoxRef.current && !langBoxRef.current.contains(e.target as Node)) {
      setIsLangListOpened(false);
    }
  };

  const handleLangChanging = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLParagraphElement;
    setCurrentLang(target.id);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <LangBox
        ref={langBoxRef}
        onClick={() => setIsLangListOpened(!isLangListOpened)}
      >
        <p>{currentLang}</p>
        <SvgLangIcon isLangListOpened={isLangListOpened}>
          <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
        </SvgLangIcon>
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
};
