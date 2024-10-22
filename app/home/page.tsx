"use server";

import { Suspense } from "react";
import { cookies } from "next/headers";
import { AppBar } from "../components/AppBar/AppBar";
import EventsList from "../components/EventsList/EventsList";
import { Pagination } from "../components/Pagination/Pagination";
import Loading from "../loading";
import { getEvents } from "./actions";
import UpdateURLWithQueryParams from "../components/UpdateURLWithQueryParams/UpdateURLWithQueryParams";
import LoggedIn from "../components/LoggedIn/LoggedIn";

interface PageProps {
  searchParams: string;
}

const Home = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const queryString = new URLSearchParams(searchParams).toString();
  const token = cookies().get("token")?.value;
  const { eventsList, error } = await getEvents(queryString);

  return (
    <Suspense fallback={<Loading />}>
      <LoggedIn token={token} error={error} />
      <UpdateURLWithQueryParams />
      <AppBar />
      <EventsList eventsList={eventsList && eventsList.data} error={error} />
      <Pagination meta={eventsList && eventsList.meta} />
    </Suspense>
  );
};

export default Home;
