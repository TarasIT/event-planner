"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { getUserData } from "./actions";
import { BackLink } from "../components/BackLink/BackLink";
import { ProfilePageTitle } from "../components/ProfilePageTitle/ProfilePageTitle";
import { ProfileForm } from "../components/ProfileForm/ProfileForm";
import { DeleteForm } from "../components/DeleteForm/DeleteForm";
import { ResetPasswordForm } from "../components/ResetPasswordForm/ResetPasswordForm";

const Profile = async (): Promise<JSX.Element> => {
  const { name, email, error } = await getUserData();

  return (
    <Suspense fallback={<Loading />}>
      <BackLink />
      <ProfilePageTitle />
      <ProfileForm name={name} email={email} error={error} />
      <ResetPasswordForm />
      <DeleteForm />
    </Suspense>
  );
};

export default Profile;
