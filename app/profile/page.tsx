"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { getUserData } from "./actions";
import { BackLink } from "../components/BackLink/BackLink";
import { ProfilePageTitle } from "../components/ProfilePageTitle/ProfilePageTitle";
import { ProfileForm } from "../components/ProfileForm/ProfileForm";
import { DeleteForm } from "../components/DeleteForm/DeleteForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm/ChangePasswordForm";
import AuthErrorHandler from "../components/AuthErrorHandler/AuthErrorHandler";

const Profile = async (): Promise<JSX.Element> => {
  const { name, email, error, google_id, is_password_existed } =
    await getUserData();

  return (
    <Suspense fallback={<Loading />}>
      <AuthErrorHandler error={error} />
      <BackLink />
      <ProfilePageTitle />
      <ProfileForm
        name={name}
        email={email}
        google_id={google_id}
        is_password_existed={is_password_existed}
      />
      <ChangePasswordForm />
      <DeleteForm />
    </Suspense>
  );
};

export default Profile;
