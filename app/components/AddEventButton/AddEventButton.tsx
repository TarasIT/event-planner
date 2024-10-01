"use client";

import React, { FC, useState } from "react";
import { AddEventBtn, SvgButtonIcon } from "./AddEventButton.styled";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { poppins } from "@/app/assets/fonts";
import { Spinner } from "@/app/styles/common.styled";

export const AddEventButton: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleClick = (): void => {
    setIsLoading(true);
    router.push(`/create-event?lang=${i18n.language}`);
  };

  return (
    <AddEventBtn onClick={handleClick} className={poppins.className}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SvgButtonIcon />
          <span>{t("addNewEventBtn")}</span>
        </>
      )}
    </AddEventBtn>
  );
};
