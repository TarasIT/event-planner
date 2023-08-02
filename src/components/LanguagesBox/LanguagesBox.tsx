import React, { FC, useEffect, useRef, useState } from "react";
import {
  LangBox,
  SvgLangIcon,
  LangList,
  LangItem,
} from "./LanguagesBox.styled";
import Sprite from "../../assest/images/sprite.svg";

export const LanguagesBox: FC = (): JSX.Element => {
  const [isLangListOpened, setIsLangListOpened] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>("UA");
  const langBoxRef = useRef<HTMLDivElement | null>(null);
  const langOptions: string[] = ["UA", "EN"];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (langBoxRef.current && !langBoxRef.current.contains(e.target as Node)) {
      setIsLangListOpened(false);
    }
  };

  return (
    <LangBox
      ref={langBoxRef}
      onClick={() => setIsLangListOpened(!isLangListOpened)}
    >
      <p>{currentLang}</p>
      <SvgLangIcon>
        <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
      </SvgLangIcon>
      {isLangListOpened && (
        <LangList>
          {langOptions.map((lang) => {
            return (
              <LangItem key={lang}>
                <p
                  id={lang}
                  onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
                    const target = e.target as HTMLParagraphElement;
                    setCurrentLang(target.id);
                  }}
                >
                  {lang}
                </p>
              </LangItem>
            );
          })}
        </LangList>
      )}
    </LangBox>
  );
};
