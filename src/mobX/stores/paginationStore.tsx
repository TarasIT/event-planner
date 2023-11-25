import { observable, action, makeAutoObservable } from "mobx";
import { NewEvent } from "../../types/types";

class PaginationStore {
  @observable
  currentPage: number = 1;
  eventsPerPage: number = 4;
  totalPages: number = 1;
  pagination: (number | string)[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  updatePagination(events: NewEvent[]): void {
    this.totalPages = Math.ceil(events.length / this.eventsPerPage);
    const ellipsis = "...";
    this.pagination = [];

    for (let i = 1; i <= this.totalPages; i += 1) {
      if (
        (i <= 3 && this.currentPage < 3) ||
        (i <= 4 && this.currentPage === 3) ||
        (i <= 5 && this.totalPages <= 5) ||
        (i >= this.totalPages - 2 && this.currentPage >= this.totalPages - 2)
      ) {
        this.pagination.push(i);
      }

      if (
        this.totalPages > 5 &&
        i === this.totalPages - 2 &&
        this.currentPage === this.totalPages - 2
      ) {
        this.pagination.unshift(this.currentPage - 1);
      }

      if (
        this.totalPages > 4 &&
        this.currentPage >= 4 &&
        this.currentPage <= this.totalPages - 3 &&
        this.pagination.length < 1
      ) {
        this.pagination.push(
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1
        );
      }
    }

    if (this.totalPages >= 6 && this.currentPage <= this.totalPages - 3) {
      this.pagination.push(ellipsis, this.totalPages);
    }

    if (
      this.totalPages > 5 &&
      this.currentPage >= 4 &&
      this.currentPage <= this.totalPages
    ) {
      this.pagination.unshift(1, ellipsis);
    }
  }

  @action
  updateCurrentPage(page: number): void {
    this.currentPage = page;
  }

  @action
  displayEventsPerPage(events: NewEvent[]): NewEvent[] {
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = startIndex + this.eventsPerPage;
    const displayedEventsPerPage = events.slice(startIndex, endIndex);
    this.updatePagination(events);
    return displayedEventsPerPage;
  }
}

const paginationStore = new PaginationStore();
export default paginationStore;
