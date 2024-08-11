"use client";

import React, { FC, useState } from "react";
import { AddEventBtn, SvgButtonIcon } from "./AddEventButton.styled";
import { useTranslation } from "react-i18next";
import { useStore } from "../../mobX/useStore";
import { poppins } from "@/app/assets/fonts";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export const AddEventButton: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { categoryFilter } = useStore();
  const router = useRouter();

  const handleClick = (): void => {
    setIsLoading(true);
    categoryFilter.setCurrentCategory("");
    router.push("/create-event");
    setIsLoading(false);
  };

  return (
    <AddEventBtn onClick={handleClick} className={poppins.className}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SvgButtonIcon />
          <span>{t("addNewEventBtn")}</span>
        </>
      )}
    </AddEventBtn>
  );
};
