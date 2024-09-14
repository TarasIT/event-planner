"use server";

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

  const { eventsList, error } = await getEvents(queryString);

  return (
    <Suspense fallback={<Loading />}>
      <AppBar />
      <EventsList eventsList={eventsList && eventsList.data} error={error} />
      <Pagination meta={eventsList && eventsList.meta} error={error} />
    </Suspense>
  );
};

export default Home;
