import { Suspense } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import EventsList from "../components/EventsList/EventsList";
import { Pagination } from "../components/Pagination/Pagination";
import Loading from "../loading";
import { getEvents } from "./actions";

interface PageProps {
  searchParams: string;
}

const Home = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const queryString = new URLSearchParams(searchParams).toString();

  const { eventsData, error } = await getEvents(queryString);

  return (
    <Suspense fallback={<Loading />}>
      <AppBar />
      <EventsList eventsData={eventsData && eventsData.data} error={error} />
      <Pagination meta={eventsData && eventsData.meta} error={error} />
    </Suspense>
  );
};

export default Home;
