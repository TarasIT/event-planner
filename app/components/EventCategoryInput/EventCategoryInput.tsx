"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StyleSheetManager } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  CategoryInput,
  SvgCategoryIcon,
  CategoryList,
  CategoryItem,
  Category,
  CategoryBox,
  InputName,
} from "./EventCategoryInput.styled";
import { categories } from "../../data/categories";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { SvgContainer } from "@/app/styles/common.styled";

const shouldForwardProp = (prop: string) => prop !== "isCategoryListOpened";

export const EventCategoryInput: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [isCategoryListOpened, setIsCategoryListOpened] =
    useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const categoryInputRef = useRef<HTMLDivElement | null>(null);
  const { eventDataStore, eventsStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const { event } = eventsStore;
    if (id && event && event.category) {
      eventDataStore.setCategory(event.category);
      setCurrentCategory(event.category);
    }
  }, [id, eventsStore.event]);

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
    const category = e.currentTarget.id;
    setCurrentCategory(category);
    eventDataStore.setCategory(category || null);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <CategoryBox>
        <InputName className={poppins.className}>
          {t("common.eventForm.categoryInput")}
        </InputName>
        <CategoryInput
          ref={categoryInputRef}
          onClick={() => setIsCategoryListOpened(!isCategoryListOpened)}
          isCategoryListOpened={isCategoryListOpened}
          className={poppins.className}
        >
          <p>
            {currentCategory && !isCategoryListOpened
              ? t(`common.categories.${currentCategory}`.toLowerCase())
              : t("common.eventForm.select")}
          </p>
          <SvgContainer>
            <SvgCategoryIcon
              isCategoryListOpened={isCategoryListOpened}
              size="0.825em"
            />
          </SvgContainer>
          {isCategoryListOpened && (
            <CategoryList isCategoryListOpened={isCategoryListOpened}>
              {categories
                .filter((category) => category !== "All")
                .map((category) => {
                  return (
                    <CategoryItem key={category}>
                      <Category
                        id={category}
                        onClick={handleCategoryChanging}
                        className={poppins.className}
                      >
                        {t(`common.categories.${category.toLowerCase()}`)}
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
