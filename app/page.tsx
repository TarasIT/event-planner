"use server";

import { Suspense } from "react";
import Loading from "./loading";
import { StartPageContainer } from "./components/StartPageContainer/StartPageContainer";

const StartPage = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <StartPageContainer />
    </Suspense>
  );
};

export default StartPage;
