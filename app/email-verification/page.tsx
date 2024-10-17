"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { Title } from "../components/Title/Title";

const EmailVerification = async (): Promise<JSX.Element> => {
  return (
    <Suspense fallback={<Loading />}>
      <Title />
    </Suspense>
  );
};

export default EmailVerification;
