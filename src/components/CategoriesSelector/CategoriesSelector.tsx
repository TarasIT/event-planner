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
import Sprite from "../../assets/images/sprite.svg";
import { categories } from "../../data/categories";
import { useStore } from "../../hooks/useStore";

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
  const [currentCategory, setCurrentCategory] = useState<string>();
  const categoryBoxRef = useRef<HTMLDivElement | null>(null);
  const { categoryFilter } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    categoryFilter.checkCategoriesFilterOpened(isCategoryListOpened);
  }, [isCategoryListOpened]);

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
      const currentTarget = e.currentTarget as HTMLLIElement;
      setCurrentCategory(currentTarget.id);
    }
    if (e.type === "mouseleave") {
      categoryFilter.currentCategory !== currentCategory &&
        setCurrentCategory(categoryFilter.currentCategory);
    }
  };

  const onCategoryClick = (
    e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
  ): void => {
    const currentTarget = e.currentTarget as HTMLLIElement;

    if (currentTarget && currentTarget.id) {
      setCurrentCategory(currentTarget.id);
      categoryFilter.getCurrentCategory(currentTarget.id);
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
        <CurrentCategory isCategoryListOpened={isCategoryListOpened}>
          {currentCategory
            ? t(`categories.${currentCategory.toLowerCase()}`)
            : t("categories.defaultCategory")}
        </CurrentCategory>
        <SvgCategoryIcon
          isCategoryListOpened={isCategoryListOpened}
          currentCategory={currentCategory}
        >
          <use xlinkHref={`${Sprite}#icon-filters-3`}></use>
        </SvgCategoryIcon>
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
