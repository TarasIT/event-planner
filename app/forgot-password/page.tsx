"use client";

import { Suspense } from "react";
import Loading from "../loading";
import { BackLink } from "../components/BackLink/BackLink";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm/ForgotPasswordForm";
import { Title } from "../components/Title/Title";

const ForgotPassword = async (): Promise<JSX.Element> => {
  return (
    <Suspense fallback={<Loading />}>
      <BackLink />
      <Title title={"forgotPasswordTitle"} />
      <ForgotPasswordForm />
    </Suspense>
  );
};

export default ForgotPassword;
