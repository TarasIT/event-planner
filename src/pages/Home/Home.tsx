import React, { FC } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { Container } from "./Home.styled";
import { EventsList } from "../../components/EventsList/EventsList";

const Home: FC = (): JSX.Element => {
  return (
    <Container>
      <AppBar />
      <EventsList />
    </Container>
  );
};

export default Home;
