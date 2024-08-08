import { observable, action, makeAutoObservable } from "mobx";
import type { EventsMeta } from "../../types/types";

class PaginationStore {
  @observable
  currentPage: number | null = null;
  prevPage: number | null = null;
  nextPage: number | null = null;
  lastPage: number | null = null;
  eventsPerPage: number | null = null;
  totalEvents: number | null = null;
  pagination: (number | "...")[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setPagination(lastPage: number | null, currentPage: number | null): void {
    if (lastPage && currentPage) {
      const maxPagesToShow = 3;
      const pages: (number | "...")[] = [];

      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(
        lastPage,
        currentPage + Math.floor(maxPagesToShow / 2)
      );

      if (endPage - startPage < maxPagesToShow - 1) {
        if (endPage === lastPage) {
          startPage = Math.max(1, endPage - (maxPagesToShow - 1));
        } else if (startPage === 1) {
          endPage = Math.min(lastPage, startPage + (maxPagesToShow - 1));
        }
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < lastPage) {
        if (endPage < lastPage - 1) pages.push("...");
        pages.push(lastPage);
      }

      this.pagination = pages;
    } else {
      this.pagination = null;
    }
  }

  @action
  setPaginationData(data: EventsMeta): void {
    if (data) {
      const { current_page, last_page, per_page, total } = data;
      this.currentPage = current_page;
      this.prevPage = current_page > 1 ? current_page - 1 : 1;
      this.nextPage = current_page < last_page ? current_page + 1 : last_page;
      this.lastPage = last_page;
      this.eventsPerPage = per_page;
      this.totalEvents = total;
      this.setPagination(last_page, current_page);
    }
  }

  @action
  setCurrentPage = (currentPage: number | null): void => {
    this.currentPage = currentPage;
  };
}

const paginationStore = new PaginationStore();
export default paginationStore;
