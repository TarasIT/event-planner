import React, { FC } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { EventsList } from "../../components/EventsList/EventsList";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { Pagination } from "../../components/Pagination/Pagination";

const Home: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <AppBar />
      <EventsList />
      <Pagination />
    </MainLayout>
  );
};

export default Home;
