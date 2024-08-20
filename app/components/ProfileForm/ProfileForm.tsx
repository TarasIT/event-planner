"use client";

import React, { FC } from "react";
import { ProfileUserForm } from "./ProfileForm.styled";

interface ProfileFormProps {
  children: React.ReactNode;
}

export const ProfileForm: FC<ProfileFormProps> = ({
  children,
}): JSX.Element => {
  return <ProfileUserForm>{children}</ProfileUserForm>;
};
