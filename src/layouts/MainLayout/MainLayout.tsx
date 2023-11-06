import React, { FC, ReactNode } from "react";
import { MainContainer } from "./MainLayout.styled";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }): JSX.Element => {
  return <MainContainer>{children}</MainContainer>;
};
