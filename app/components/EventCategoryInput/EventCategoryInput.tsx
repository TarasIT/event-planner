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
import { NewEvent } from "../../types/types";
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
  const { setFormValues, eventsStore } = useStore();
  const { id } = useParams();

  let event: NewEvent | null = null;
  if (id) event = eventsStore.getEventById(id as string);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (event && event.category) {
      setCurrentCategory(event.category);
      setFormValues.setCategory(event.category);
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
    setFormValues.setCategory(target.id);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <CategoryBox>
        <InputName className={poppins.className}>
          {t("categoryInput")}
        </InputName>
        <CategoryInput
          ref={categoryInputRef}
          onClick={() => setIsCategoryListOpened(!isCategoryListOpened)}
          isCategoryListOpened={isCategoryListOpened}
          className={poppins.className}
        >
          <p>
            {currentCategory && !isCategoryListOpened
              ? t(`categories.${currentCategory}`.toLowerCase())
              : t("select")}
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
