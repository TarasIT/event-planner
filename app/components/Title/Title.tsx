"use client";

import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { poppins } from "@/app/assets/fonts";
import { ComponentTitle } from "./Title.styled";
import { localizeResponses } from "@/app/services/localizeResponses";
import { useSearchParams } from "next/navigation";

export const Title: FC = (): JSX.Element => {
  const [verificationTitle, setVerificationTitle] = useState("");
  const { t } = useTranslation();
  const message = useSearchParams().get("message");

  useEffect(() => {
    if (message) {
      setVerificationTitle(t(localizeResponses(message)));
    }
  }, [message, t]);

  return (
    <ComponentTitle className={poppins.className}>
      {verificationTitle}
    </ComponentTitle>
  );
};
