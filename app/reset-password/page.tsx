"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { ResetPasswordForm } from "../components/ResetPasswordForm/ResetPasswordForm";
import { PasswordTitle } from "../components/PasswordTitle/PasswordTitle";

interface PageProps {
  searchParams: string;
}

const ResetPassword = async ({
  searchParams,
}: PageProps): Promise<JSX.Element> => {
  const resetPasswordToken = new URLSearchParams(searchParams).get("token");

  return (
    <Suspense fallback={<Loading />}>
      <PasswordTitle title={"resetPassword"} />
      <ResetPasswordForm
        resetPasswordToken={resetPasswordToken && resetPasswordToken}
      />
    </Suspense>
  );
};

export default ResetPassword;
