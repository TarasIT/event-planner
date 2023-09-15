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

export const EventCategoryInput: FC = (): JSX.Element => {
  const [isCategoryListOpened, setIsCategoryListOpened] =
    useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>("Select");
  const categoryInputRef = useRef<HTMLDivElement | null>(null);
  const categoryOptions: string[] = [
    "Art",
    "Music",
    "Business",
    "Conference",
    "Workshop",
    "Party",
    "Sport",
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      categoryInputRef.current &&
      !categoryInputRef.current.contains(e.target as Node)
    ) {
      setIsCategoryListOpened(false);
    }
  };

  const handleCategoryChanging = (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    const target = e.target as HTMLParagraphElement;
    setCurrentCategory(target.id);
  };

  return (
    <CategoryBox>
      <InputName>Category</InputName>
      <CategoryInput
        ref={categoryInputRef}
        onClick={() => setIsCategoryListOpened(!isCategoryListOpened)}
        isCategoryListOpened={isCategoryListOpened}
      >
        <p>
          {currentCategory && !isCategoryListOpened
            ? currentCategory
            : "Select"}
        </p>
        <SvgCategoryIcon isCategoryListOpened={isCategoryListOpened}>
          <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
        </SvgCategoryIcon>
        {isCategoryListOpened && (
          <CategoryList isCategoryListOpened={isCategoryListOpened}>
            {categoryOptions.map((category) => {
              return (
                <CategoryItem key={category}>
                  <Category id={category} onClick={handleCategoryChanging}>
                    {category}
                  </Category>
                </CategoryItem>
              );
            })}
          </CategoryList>
        )}
      </CategoryInput>
    </CategoryBox>
  );
};
