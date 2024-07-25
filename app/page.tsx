import { Suspense } from "react";
import Loading from "./loading";

const StartPage = (): JSX.Element => {
  return <Suspense fallback={<Loading />} />;
};

export default StartPage;
