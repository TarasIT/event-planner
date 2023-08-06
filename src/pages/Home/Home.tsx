import React, { FC } from "react";
import { AppBar } from "../../components/AppBar/AppBar";
import { Container } from "./Home.styled";

const Home: FC = (): JSX.Element => (
  <Container>
    <AppBar />
  </Container>
);

export default Home;
