"use client";

import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { ComponentTitle } from "./Title.styled";
import { localizeResponses } from "@/app/services/localizeResponses";
import { useSearchParams } from "next/navigation";

interface TitleProps {
  title: string;
}

export const Title: FC<TitleProps> = ({ title }): JSX.Element => {
  const [componentTitle, setComponentTitle] = useState("");
  const { t } = useTranslation();
  const queryMessage = useSearchParams().get("message");

  useEffect(() => {
    if (queryMessage) setComponentTitle(t(localizeResponses(queryMessage)));
    if (title) setComponentTitle(t(title));
  }, [queryMessage, title, t]);

  return (
    <ComponentTitle className={poppins.className}>
      {componentTitle}
    </ComponentTitle>
  );
};
