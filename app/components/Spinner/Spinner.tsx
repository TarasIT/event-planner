"use client";

import { FC } from "react";
import { Spinner } from "./Spinner.styled";

export const Loading: FC = (): JSX.Element => {
  return <Spinner />;
};
