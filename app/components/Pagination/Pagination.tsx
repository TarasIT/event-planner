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
import { EventsLinks, EventsMeta } from "@/app/types/types";
import eventsStore from "@/app/mobX/stores/eventsStore";
import { toast } from "react-toastify";
import { createURL } from "@/app/services/createURL";

const shouldForwardProp = (prop: string) => prop !== "isActive";

interface PaginationProps {
  meta: EventsMeta | null;
  error: string | null;
}

export const Pagination: FC<PaginationProps> = observer(
  ({ meta, error }): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number | null>(
      meta && meta.current_page
    );
    const [prevPage, setPrevPage] = useState<number | null>(1);
    const [nextPage, setNextPage] = useState<number | null>(2);
    const [lastPage, setLastPage] = useState<number | null>(
      meta && meta.last_page
    );
    const [pagination, setPagination] = useState<(number | "...")[] | null>();
    const searchParams = useSearchParams();
    const { paginationStore } = useStore();

    const router = useRouter();
    const pageFromURL = searchParams.get("page");

    useEffect(() => {
      if (meta) paginationStore.setPaginationData(meta);
      if (error) toast.error(error);
    }, []);

    useEffect(() => {
      const { currentPage, nextPage, prevPage, lastPage, pagination } =
        paginationStore;
      setCurrentPage(currentPage);
      setPrevPage(prevPage);
      setNextPage(nextPage);
      setLastPage(lastPage);
      setPagination(pagination);
    }, [
      paginationStore.nextPage,
      paginationStore.prevPage,
      paginationStore.currentPage,
      paginationStore.lastPage,
      paginationStore.pagination,
    ]);

    // const currentPage = paginationStore.currentPage;
    // const totalPages = paginationStore.totalPages;
    // const eventsPerPage = paginationStore.eventsPerPage;
    // const currentEventsAmount = totalPages * eventsPerPage;

    // useEffect(() => {
    //   if (pageFromURL && Number(pageFromURL) !== 1 && currentPage === 1) {
    //     router.push(`?page=${pageFromURL}`);
    //     paginationStore.setCurrentPage(Number(pageFromURL));
    //   } else {
    //     currentPage && currentEventsAmount > eventsPerPage
    //       ? router.push(`?page=${currentPage}`)
    //       : router.push("");
    //   }
    //   setPagination(paginationStore.pagination);
    // }, [
    //   pageFromURL,
    //   currentPage,
    //   currentEventsAmount,
    //   eventsPerPage,
    //   paginationStore.pagination,
    // ]);

    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {lastPage && lastPage >= 1 ? (
          <PagesList>
            <PageItem
              isActive={currentPage !== 1}
              onClick={() => {
                if (currentPage === prevPage) return;
                if (prevPage) {
                  eventsStore.getEvents(createURL({ page: prevPage }));
                }
              }}
              className={poppins.className}
            >
              <SvgContainer>
                <SvgDecreasePage
                  isActive={
                    currentPage !== null &&
                    currentPage !== undefined &&
                    currentPage > 1
                  }
                />
              </SvgContainer>
            </PageItem>
            {pagination &&
              pagination.map((page) => {
                return (
                  <PageItem
                    key={nanoid()}
                    onClick={() => {
                      if (typeof page === "number")
                        eventsStore.getEvents(createURL({ page: page }));
                    }}
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
              isActive={currentPage !== lastPage}
              onClick={() => {
                if (currentPage === lastPage) return;
                if (nextPage)
                  eventsStore.getEvents(createURL({ page: nextPage }));
              }}
            >
              <SvgIncreasePage isActive={currentPage !== lastPage} />
            </PageItem>
          </PagesList>
        ) : (
          <Fragment />
        )}
      </StyleSheetManager>
    );
  }
);
