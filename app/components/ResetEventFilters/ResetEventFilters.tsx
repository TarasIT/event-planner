"use client";

import React, { FC } from "react";
import { ResetBtn, SvgClearIcon } from "./ResetEventFilters.styled";
import { poppins } from "@/app/assets/fonts";
import { useStore } from "@/app/mobX/useStore";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/app/services/createQueryString";

export const ResetEventFilters: FC = observer((): JSX.Element => {
  const { filtersStore, eventsStore } = useStore();
  const router = useRouter();

  const handleFiltersReset = (): void => {
    eventsStore.setLoading(true);
    filtersStore.resetFilters();
    router.push(createQueryString());
  };

  return (
    <ResetBtn
      type="button"
      onClick={handleFiltersReset}
      className={poppins.className}
    >
      <SvgClearIcon />
    </ResetBtn>
  );
});
