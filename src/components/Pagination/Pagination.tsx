import React, { FC, Fragment, useEffect, useState } from "react";
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
  const { paginationStore } = useStore();

  const currentPage = paginationStore.currentPage;
  const totalPages = paginationStore.totalPages;
  const eventsPerPage = paginationStore.eventsPerPage;
  const currentEventsAmount = totalPages * eventsPerPage;

  useEffect(() => {
    setPagination(paginationStore.pagination);
  }, [paginationStore.pagination]);

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
                    <Page href="#!">{page}</Page>
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
