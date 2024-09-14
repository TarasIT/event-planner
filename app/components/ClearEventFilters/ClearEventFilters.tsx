"use client";

import React, { FC, useState } from "react";
import { ClearBtn, SvgClearIcon } from "./ClearEventFilters.styled";
import { poppins } from "@/app/assets/fonts";
import { Spinner } from "@/app/styles/common.styled";

export const ClearEventFilters: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  // const handleClick = (): void => {
  //   setIsLoading(true);
  //   router.push("/create-event");
  // };

  return (
    <ClearBtn className={poppins.className}>
      {isLoading ? <Spinner /> : <SvgClearIcon />}
    </ClearBtn>
  );
};
