import React, { FC, ReactNode } from "react";
import { SectionLayout } from "./Section.styled";

interface MainLayoutProps {
  children: ReactNode;
}

const Section: FC<MainLayoutProps> = ({ children }): JSX.Element => {
  return <SectionLayout>{children}</SectionLayout>;
};

export default Section;
