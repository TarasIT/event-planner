import React, { FC, ReactNode } from "react";
import { MainLayout } from "./Main.styled";

interface MainLayoutProps {
  children: ReactNode;
}

const Main: FC<MainLayoutProps> = ({ children }): JSX.Element => {
  return <MainLayout>{children}</MainLayout>;
};

export default Main;
