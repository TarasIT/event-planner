"use client";

import React, { FC, useEffect } from "react";
import { FormTitle, ProfileUserForm } from "./ProfileForm.styled";
import { poppins } from "@/app/assets/fonts";
import { ProfileNameInput } from "../ProfileNameInput/ProfileNameInput";
import { ProfileEmailInput } from "../ProfileEmailInput/ProfileEmailInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface ProfileFormProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  error?: string | null | undefined;
}

export const ProfileForm: FC<ProfileFormProps> = ({
  name,
  email,
  error,
}): JSX.Element => {
  const { t } = useTranslation();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <ProfileUserForm>
      <FormTitle className={poppins.className}>{t("yourData")}</FormTitle>
      <ProfileNameInput name={name} />
      <ProfileEmailInput email={email} />
    </ProfileUserForm>
  );
};
