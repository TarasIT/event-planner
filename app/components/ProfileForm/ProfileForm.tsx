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
  is_password_existed?: boolean | null | undefined;
  error?: string | null | undefined;
}

export const ProfileForm: FC<ProfileFormProps> = observer(
  ({ name, email, google_id, is_password_existed, error }): JSX.Element => {
    const { t } = useTranslation();
    const { authCredentials } = useStore();

    useEffect(() => {
      if (name) authCredentials.setName(name);
      if (email) authCredentials.setEmail(email);
      if (google_id) authCredentials.setGoogleId(google_id);
      authCredentials.setIsPasswordExisted(is_password_existed);
      if (error) toast.error(error);
      console.log({ name, email, google_id, is_password_existed, error });
    }, [name, email, google_id, is_password_existed, error]);

    return (
      <ProfileUserForm>
        <FormTitle className={poppins.className}>{t("yourData")}</FormTitle>
        <ProfileNameInput name={name} />
        <ProfileEmailInput email={email} />
      </ProfileUserForm>
    );
  }
);
