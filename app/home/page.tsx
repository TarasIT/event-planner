import { Suspense } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import EventsList from "../components/EventsList/EventsList";
import { Pagination } from "../components/Pagination/Pagination";
import Loading from "../loading";

const Home = async (): Promise<JSX.Element> => {
  return (
    <Suspense fallback={<Loading />}>
      <AppBar />
      <EventsList />
      <Pagination />
    </Suspense>
  );
};

export default Home;
