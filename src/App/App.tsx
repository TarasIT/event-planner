import React, { lazy, Suspense, FC, LazyExoticComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./App.styled";
import { Header } from "../components/Header/Header";
import Home from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const HomePage: LazyExoticComponent<FC> = lazy(
  () => import("../pages/Home/Home")
);
const CreateEventPage: LazyExoticComponent<FC> = lazy(
  () => import("../pages/CreateEventPage/CreateEventPage")
);

const App: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Main>
    </>
  );
};

export default App;
