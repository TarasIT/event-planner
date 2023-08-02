import React, { FC } from "react";
import { Main, Container } from "./App.styled";
import { AppBar } from "../components/AppBar/AppBar";

const App: FC = (): JSX.Element => {
  return (
    <>
      <AppBar />
      <Main>
        <Container></Container>
      </Main>
    </>
  );
};

export default App;
