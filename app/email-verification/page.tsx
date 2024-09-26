"use server";

import { Suspense } from "react";
import Loading from "../loading";
import { Title } from "../components/Title/Title";

interface PageProps {
  searchParams: string;
}

export const handleQueryMessageForlocale = (message: string): string => {
  switch (message) {
    case "Invalid URL provided.":
      return "emailVerification.invalidUrl";

    case "Email verified successfully.":
      return "emailVerification.successfulVerification";

    case "User is not found.":
      return "userNotFound";

    case "Failed to verify email. Please try later.":
      return "internalServerError";

    default:
      return "";
  }
};

const EmailVerification = async ({
  searchParams,
}: PageProps): Promise<JSX.Element> => {
  const queryParams = new URLSearchParams(searchParams);
  const message = queryParams.get("message") || "something went wrong :(";

  return (
    <Suspense fallback={<Loading />}>
      <Title title={handleQueryMessageForlocale(message)} />
    </Suspense>
  );
};

export default EmailVerification;
