"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { InputName, Label, Input } from "./ProfileNameInput.styled";
import { poppins } from "@/app/assets/fonts";

interface InputProps {
  name: string | null | undefined;
}

export const ProfileNameInput: FC<InputProps> = ({ name }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Label className={poppins.className}>
      <InputName>{t("name")}</InputName>
      <Input
        type="text"
        name="name"
        value={name ? name : ""}
        className={poppins.className}
        readOnly
      />
    </Label>
  );
};
