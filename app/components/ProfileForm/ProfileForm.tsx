"use client";

import React, { FC, useEffect } from "react";
import { FormTitle, ProfileUserForm } from "./ProfileForm.styled";
import { poppins } from "@/app/assets/fonts";
import { ProfileNameInput } from "../ProfileNameInput/ProfileNameInput";
import { ProfileEmailInput } from "../ProfileEmailInput/ProfileEmailInput";
import { useTranslation } from "react-i18next";
import { useStore } from "@/app/mobX/useStore";
import { observer } from "mobx-react";

interface ProfileFormProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  google_id?: string | null | undefined;
  is_password_existed?: boolean | null | undefined;
}

export const ProfileForm: FC<ProfileFormProps> = observer(
  ({ name, email, google_id, is_password_existed }): JSX.Element => {
    const { t } = useTranslation();
    const { authCredentials } = useStore();

    useEffect(() => {
      if (name) authCredentials.setName(name);
      if (email) authCredentials.setEmail(email);
      if (google_id) authCredentials.setGoogleId(google_id);
      authCredentials.setIsPasswordExisted(is_password_existed);
    }, [name, email, google_id, is_password_existed]);

    return (
      <ProfileUserForm>
        <FormTitle className={poppins.className}>
          {t("profilePage.yourData")}
        </FormTitle>
        <ProfileNameInput name={name} />
        <ProfileEmailInput email={email} />
      </ProfileUserForm>
    );
  }
);
