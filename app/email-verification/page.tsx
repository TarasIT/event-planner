"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { Title } from "../components/Title/Title";
import { localizeResponses } from "../services/localizeResponses";

interface PageProps {
  searchParams: string;
}

const EmailVerification = async ({
  searchParams,
}: PageProps): Promise<JSX.Element> => {
  const queryParams = new URLSearchParams(searchParams);
  const message = queryParams.get("message") || "something went wrong :(";

  return (
    <Suspense fallback={<Loading />}>
      <Title title={localizeResponses(message)} />
    </Suspense>
  );
};

export default EmailVerification;
