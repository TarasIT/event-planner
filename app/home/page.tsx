"use server";

import { Suspense } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import EventsList from "../components/EventsList/EventsList";
import { Pagination } from "../components/Pagination/Pagination";
import Loading from "../loading";
import { getEvents } from "./actions";
import UpdateURLWithQueryParams from "../components/UpdateURLWithQueryParams/UpdateURLWithQueryParams";
import ErrorHandler from "../components/ErrorHandler/ErrorHandler";

interface PageProps {
  searchParams: string;
}

const Home = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const queryString = new URLSearchParams(searchParams).toString();
  const { eventsList, error } = await getEvents(queryString);

  return (
    <Suspense fallback={<Loading />}>
      <ErrorHandler error={error} />
      <UpdateURLWithQueryParams />
      <AppBar />
      <EventsList eventsList={eventsList && eventsList.data} />
      <Pagination meta={eventsList && eventsList.meta} />
    </Suspense>
  );
};

export default Home;
