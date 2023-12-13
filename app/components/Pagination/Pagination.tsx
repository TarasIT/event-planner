"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import { StyleSheetManager } from "styled-components";
import { useStore } from "../../mobX/useStore";
import {
  PagesList,
  PageItem,
  Page,
  Ellipsis,
  SvgIncreasePage,
  SvgDecreasePage,
} from "./Pagination.styled";
import { SvgContainer } from "@/app/styles/common.styled";
import { poppins } from "@/app/assets/fonts";

const shouldForwardProp = (prop: string) => prop !== "isActive";

export const Pagination: FC = observer((): JSX.Element => {
  const [pagination, setPagination] = useState<(number | string)[]>();
  const searchParams = useSearchParams();
  const { paginationStore } = useStore();

  const router = useRouter();
  const pageFromURL = searchParams.get("page");

  // console.log(pageFromURL);

  const currentPage = paginationStore.currentPage;
  const totalPages = paginationStore.totalPages;
  const eventsPerPage = paginationStore.eventsPerPage;
  const currentEventsAmount = totalPages * eventsPerPage;

  useEffect(() => {
    // if (pageFromURL && Number(pageFromURL) !== 1 && currentPage === 1) {
    //   router.push(`?page=${pageFromURL}`);
    //   paginationStore.updateCurrentPage(Number(pageFromURL));
    // } else {
    //   currentPage && currentEventsAmount > eventsPerPage
    //     ? router.push(`?page=${currentPage}`)
    //     : router.push("");
    // }
    setPagination(paginationStore.pagination);
  }, [
    // pageFromURL,
    // currentPage,
    // currentEventsAmount,
    // eventsPerPage,
    paginationStore.pagination,
  ]);

  const onPageClick = (page: string | number): void => {
    if (typeof page === "number" && currentPage !== page) {
      paginationStore.updateCurrentPage(page);
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {currentEventsAmount > eventsPerPage ? (
        <PagesList>
          <PageItem
            isActive={false}
            onClick={() => {
              if (currentPage === 1) return;
              paginationStore.updateCurrentPage(currentPage - 1);
            }}
            className={poppins.className}
          >
            <SvgContainer>
              <SvgDecreasePage isActive={currentPage > 1} />
            </SvgContainer>
          </PageItem>
          {pagination &&
            pagination.map((page) => {
              return (
                <PageItem
                  key={nanoid()}
                  onClick={() => onPageClick(page)}
                  isActive={page === currentPage}
                >
                  {typeof page === "number" ? (
                    <Page>{page}</Page>
                  ) : (
                    <Ellipsis>{page}</Ellipsis>
                  )}
                </PageItem>
              );
            })}
          <PageItem
            isActive={false}
            onClick={() => {
              if (currentPage === totalPages) return;
              paginationStore.updateCurrentPage(currentPage + 1);
            }}
          >
            <SvgIncreasePage isActive={currentPage !== totalPages} />
          </PageItem>
        </PagesList>
      ) : (
        <Fragment />
      )}
    </StyleSheetManager>
  );
});
