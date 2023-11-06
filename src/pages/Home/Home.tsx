import React, { FC } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { EventsList } from "../../components/EventsList/EventsList";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";

const Home: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <AppBar />
      <EventsList />
    </MainLayout>
  );
};

export default Home;
