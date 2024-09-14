"use client";

import React, { FC, useEffect } from "react";
import { FormTitle, ProfileUserForm } from "./ProfileForm.styled";
import { poppins } from "@/app/assets/fonts";
import { ProfileNameInput } from "../ProfileNameInput/ProfileNameInput";
import { ProfileEmailInput } from "../ProfileEmailInput/ProfileEmailInput";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useStore } from "@/app/mobX/useStore";
import { observer } from "mobx-react";

interface ProfileFormProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  google_id?: string | null | undefined;
  password?: string | null | undefined;
  error?: string | null | undefined;
}

export const ProfileForm: FC<ProfileFormProps> = observer(
  ({ name, email, google_id, password, error }): JSX.Element => {
    const { t } = useTranslation();
    const { authCredentials } = useStore();

    useEffect(() => {
      if (name) authCredentials.setName(name);
      if (email) authCredentials.setEmail(email);
      if (google_id) authCredentials.setGoogleId(google_id);
      if (password) authCredentials.setPassword(password);
      if (error) toast.error(error);
      console.log({ name, email, google_id, password, error });
    }, [name, email, google_id, password, error]);

    return (
      <ProfileUserForm>
        <FormTitle className={poppins.className}>{t("yourData")}</FormTitle>
        <ProfileNameInput name={name} />
        <ProfileEmailInput email={email} />
      </ProfileUserForm>
    );
  }
);
