"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { InputName, Label, Input } from "./ProfileEmailInput.styled";
import { poppins } from "@/app/assets/fonts";

interface InputProps {
  email: string | null | undefined;
}

export const ProfileEmailInput: FC<InputProps> = ({ email }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Label className={poppins.className}>
      <InputName>{t("email")}</InputName>
      <Input
        type="text"
        name="email"
        value={email ? email : ""}
        className={poppins.className}
        readOnly
      />
    </Label>
  );
};
