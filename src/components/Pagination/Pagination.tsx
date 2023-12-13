import React, { FC, Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import { StyleSheetManager } from "styled-components";
import { useStore } from "../../hooks/useStore";
import {
  PagesList,
  PageItem,
  Page,
  Ellipsis,
  SvgIncreasePage,
  SvgDecreasePage,
} from "./Pagination.styled";
import Sprite from "../../assets/images/sprite.svg";

const shouldForwardProp = (prop: string) => prop !== "isActive";

export const Pagination: FC = observer((): JSX.Element => {
  const [pagination, setPagination] = useState<(number | string)[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { paginationStore } = useStore();

  const navigate = useNavigate();
  const pageFromQuery = searchParams.get("page");

  const currentPage = paginationStore.currentPage;
  const totalPages = paginationStore.totalPages;
  const eventsPerPage = paginationStore.eventsPerPage;
  const currentEventsAmount = totalPages * eventsPerPage;

  useEffect(() => {
    if (pageFromQuery && Number(pageFromQuery) !== 1 && currentPage === 1) {
      navigate(`?page=${pageFromQuery}`);
      paginationStore.updateCurrentPage(Number(pageFromQuery));
    } else {
      currentPage && currentEventsAmount > eventsPerPage
        ? navigate(`?page=${currentPage}`)
        : navigate("");
    }
    setPagination(paginationStore.pagination);
  }, [
    pageFromQuery,
    currentPage,
    currentEventsAmount,
    eventsPerPage,
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
          >
            <SvgDecreasePage isActive={currentPage > 1}>
              <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
            </SvgDecreasePage>
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
            <SvgIncreasePage isActive={currentPage !== totalPages}>
              <use xlinkHref={`${Sprite}#icon-chevron-left`}></use>
            </SvgIncreasePage>
          </PageItem>
        </PagesList>
      ) : (
        <Fragment />
      )}
    </StyleSheetManager>
  );
});
