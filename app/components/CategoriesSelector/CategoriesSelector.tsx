"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { StyleSheetManager } from "styled-components";
import {
  CategoryBox,
  SvgCategoryIcon,
  CategoryList,
  CategoryItem,
  CurrentCategory,
  Category,
} from "./CategoriesSelector.styled";
import { categories } from "../../data/categories";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { createQueryString } from "@/app/services/createQueryString";
import { useRouter, useSearchParams } from "next/navigation";

const shouldForwardProp = (prop: string) => {
  return (
    prop !== "isCategoryListOpened" &&
    prop !== "currentCategory" &&
    prop !== "isActive"
  );
};

export const CategoriesSelector: FC = observer((): JSX.Element => {
  const [isCategoryListOpened, setIsCategoryListOpened] =
    useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const categoryBoxRef = useRef<HTMLDivElement | null>(null);
  const { categoryFilter, eventsStore, filtersStore } = useStore();
  const { t } = useTranslation();
  const router = useRouter();
  const queryParams = useSearchParams();
  const categoryQueryParam = queryParams.get("category");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (categoryQueryParam) {
      setCurrentCategory(categoryQueryParam);
      categoryFilter.setCurrentCategory(categoryQueryParam);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filtersStore.areFiltersReseted && !eventsStore.isLoading) {
      setCurrentCategory("");
      setIsCategoryListOpened(false);
    }
    categoryFilter.checkCategoriesFilterOpened(isCategoryListOpened);
  }, [
    isCategoryListOpened,
    filtersStore.areFiltersReseted,
    eventsStore.isLoading,
  ]);

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      categoryBoxRef.current &&
      !categoryBoxRef.current.contains(e.target as Node)
    ) {
      setIsCategoryListOpened(false);
      categoryFilter.currentCategory !== currentCategory &&
        setCurrentCategory(categoryFilter.currentCategory);
    }
  };

  const handleCategoryChanging = (e: React.MouseEvent<HTMLLIElement>): void => {
    if (e.type === "mouseenter") {
      setCurrentCategory(e.currentTarget.id);
    }
    if (e.type === "mouseleave") {
      categoryFilter.currentCategory !== currentCategory &&
        setCurrentCategory(categoryFilter.currentCategory);
    }
  };

  const onCategoryClick = (
    e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
  ): void => {
    const id = e.currentTarget.id;

    if (id) {
      setCurrentCategory(id);
      categoryFilter.setCurrentCategory(id);
      router.push(createQueryString());
      eventsStore.setLoading(true);
    }
    setIsCategoryListOpened(!isCategoryListOpened);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <CategoryBox
        ref={categoryBoxRef}
        isCategoryListOpened={isCategoryListOpened}
        onClick={onCategoryClick}
      >
        <CurrentCategory
          isCategoryListOpened={isCategoryListOpened}
          className={poppins.className}
        >
          {currentCategory
            ? t(`categories.${currentCategory.toLowerCase()}`)
            : t("categories.defaultCategory")}
        </CurrentCategory>

        <SvgCategoryIcon
          currentCategory={currentCategory}
          isCategoryListOpened={isCategoryListOpened}
        />

        {isCategoryListOpened && (
          <CategoryList isCategoryListOpened={isCategoryListOpened}>
            {categories.map((category) => {
              return (
                <CategoryItem
                  key={category}
                  id={category}
                  onMouseEnter={handleCategoryChanging}
                  onMouseLeave={handleCategoryChanging}
                  onClick={onCategoryClick}
                  isActive={category === currentCategory}
                  className={poppins.className}
                >
                  <Category>
                    {t(`categories.${category.toLowerCase()}`)}
                  </Category>
                </CategoryItem>
              );
            })}
          </CategoryList>
        )}
      </CategoryBox>
    </StyleSheetManager>
  );
});
