import React, { FC, useEffect, useRef, useState } from "react";
import {
  CategoryInput,
  SvgCategoryIcon,
  CategoryList,
  CategoryItem,
  Category,
  CategoryBox,
  InputName,
} from "./EventCategoryInput.styled";
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";
import { NewEvent } from "../../types/types";
import { categories } from "../../data/categories";
import { useTranslation } from "react-i18next";

interface CategotyInputProps {
  setCategory: (category: string) => void;
  event: NewEvent;
}

const shouldForwardProp = (prop: string) => prop !== "isCategoryListOpened";

export const EventCategoryInput: FC<CategotyInputProps> = ({
  setCategory,
  event,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isCategoryListOpened, setIsCategoryListOpened] =
    useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const categoryInputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.category) {
      setCurrentCategory(event.category);
      setCategory(event.category);
    }
  }, [event]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      categoryInputRef.current &&
      !categoryInputRef.current.contains(e.target as Node)
    ) {
      setIsCategoryListOpened(false);
    }
  };

  const handleCategoryChanging = (
    e: React.MouseEvent<HTMLParagraphElement>
  ): void => {
    const target = e.target as HTMLParagraphElement;
    setCurrentCategory(target.id);
    setCategory(target.id);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <CategoryBox>
        <InputName>{t("categoryInput")}</InputName>
        <CategoryInput
          ref={categoryInputRef}
          onClick={() => setIsCategoryListOpened(!isCategoryListOpened)}
          isCategoryListOpened={isCategoryListOpened}
        >
          <p>
            {currentCategory && !isCategoryListOpened
              ? t(`categories.${currentCategory}`.toLowerCase())
              : t("select")}
          </p>
          <SvgCategoryIcon isCategoryListOpened={isCategoryListOpened}>
            <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
          </SvgCategoryIcon>
          {isCategoryListOpened && (
            <CategoryList isCategoryListOpened={isCategoryListOpened}>
              {categories
                .filter((category) => category !== "All")
                .map((category) => {
                  return (
                    <CategoryItem key={category}>
                      <Category id={category} onClick={handleCategoryChanging}>
                        {t(`categories.${category.toLowerCase()}`)}
                      </Category>
                    </CategoryItem>
                  );
                })}
            </CategoryList>
          )}
        </CategoryInput>
      </CategoryBox>
    </StyleSheetManager>
  );
};
