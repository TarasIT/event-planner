"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { ResetPasswordForm } from "../components/ResetPasswordForm/ResetPasswordForm";
import { Title } from "../components/Title/Title";

interface PageProps {
  searchParams: string;
}

const ResetPassword = async ({
  searchParams,
}: PageProps): Promise<JSX.Element> => {
  const resetPasswordToken = new URLSearchParams(searchParams).get("token");

  return (
    <Suspense fallback={<Loading />}>
      <Title title={"resetPassword"} />
      <ResetPasswordForm
        resetPasswordToken={resetPasswordToken && resetPasswordToken}
      />
    </Suspense>
  );
};

export default ResetPassword;
