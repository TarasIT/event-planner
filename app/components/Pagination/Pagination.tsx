"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { EventsMeta } from "@/app/types/types";
import { toast } from "react-toastify";
import { createQueryString } from "@/app/services/createQueryString";

const shouldForwardProp = (prop: string) => prop !== "isActive";

interface PaginationProps {
  meta: EventsMeta | null;
  error: string | null;
}

export const Pagination: FC<PaginationProps> = observer(
  ({ meta, error }): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [lastPage, setLastPage] = useState<number | null>(null);
    const [pagination, setPagination] = useState<(number | "...")[] | null>();
    const { paginationStore } = useStore();

    const router = useRouter();

    useEffect(() => {
      if (meta) {
        paginationStore.setPaginationData(meta);
        setLastPage(paginationStore.lastPage);
        setCurrentPage(paginationStore.currentPage);
        setPagination(paginationStore.pagination);

        if (meta.last_page < meta.current_page) {
          router.push(`?${createQueryString()}`);
        }
      }
      if (error) toast.error(error);
    }, [meta, error, router.push]);

    const onPrevPageClick = (): void => {
      if (currentPage && currentPage === 1) return;
      if (currentPage) {
        paginationStore.setCurrentPage(currentPage - 1);
        router.push(`?${createQueryString()}`);
      }
    };

    const onNextPageClick = (): void => {
      if (currentPage && currentPage === lastPage) return;
      if (currentPage) {
        paginationStore.setCurrentPage(currentPage + 1);
        router.push(`?${createQueryString()}`);
      }
    };

    const onPageClick = (page: number | "..."): void => {
      if (currentPage && currentPage === page) return;
      if (typeof page === "number") {
        paginationStore.setCurrentPage(page);
        router.push(`?${createQueryString()}`);
      }
    };

    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {lastPage && lastPage > 1 ? (
          <PagesList>
            <PageItem
              isActive={currentPage !== 1}
              onClick={onPrevPageClick}
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
              isActive={currentPage !== lastPage}
              onClick={onNextPageClick}
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
