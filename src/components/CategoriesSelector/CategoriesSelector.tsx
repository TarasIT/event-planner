import React, { FC, useEffect, useRef, useState } from "react";
import {
  CategoryBox,
  SvgCategoryIcon,
  CategoryList,
  CategoryItem,
  CurrentCategory,
  Category,
} from "./CategoriesSelector.styled";
import Sprite from "../../assets/images/sprite.svg";
import { StyleSheetManager } from "styled-components";
import { categories } from "../../data/categories";
import { observer } from "mobx-react";
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
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const categoryBoxRef = useRef<HTMLDivElement | null>(null);
  const { categoryFilter } = useStore();
  const defaultCategory = "Category";

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    categoryFilter.checkCategoriesFilterOpened(isCategoryListOpened);
  }, [isCategoryListOpened]);

  const handleWindowResize = (): void => {
    setViewportWidth(window.innerWidth);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      categoryBoxRef.current &&
      !categoryBoxRef.current.contains(e.target as Node)
    ) {
      setIsCategoryListOpened(false);
    }
  };

  const handleCategoryChanging = (e: React.MouseEvent<HTMLLIElement>): void => {
    const currentTarget = e.currentTarget as HTMLLIElement;
    setCurrentCategory(currentTarget.id);
  };

  const onCategoryMouseEnter = (e: React.MouseEvent<HTMLLIElement>): void => {
    if (viewportWidth <= 1279) return;
    const currentTarget = e.currentTarget as HTMLLIElement;
    setCurrentCategory(currentTarget.id);
  };

  const onCategoryMouseLeave = (): void => {
    if (viewportWidth <= 1279) return;
    setCurrentCategory(defaultCategory);
  };

  const onCategoryBoxClick = (): void => {
    setIsCategoryListOpened(!isCategoryListOpened);
    if (currentCategory) categoryFilter.getCurrentCategory(currentCategory);
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <CategoryBox
        ref={categoryBoxRef}
        isCategoryListOpened={isCategoryListOpened}
        onClick={onCategoryBoxClick}
      >
        <CurrentCategory isCategoryListOpened={isCategoryListOpened}>
          {currentCategory ? currentCategory : defaultCategory}
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
                  onMouseEnter={onCategoryMouseEnter}
                  onMouseLeave={onCategoryMouseLeave}
                  onClick={handleCategoryChanging}
                  isActive={category === currentCategory}
                >
                  <Category>{category}</Category>
                </CategoryItem>
              );
            })}
          </CategoryList>
        )}
      </CategoryBox>
    </StyleSheetManager>
  );
});
