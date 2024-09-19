import { observable, action, makeAutoObservable } from "mobx";
import categoryFilter from "./categoryFilter";
import eventsSorter from "./eventsSorter";

class FiltersStore {
  @observable
  areFiltersReseted: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  resetFilters(): void {
    categoryFilter.setCurrentCategory("");
    eventsSorter.setCurrentSorter("");
    eventsSorter.setIsSorterIncreased(null);
    this.setFiltersReseted(true);
  }

  @action
  setFiltersReseted(areFiltersReseted: boolean): void {
    this.areFiltersReseted = areFiltersReseted;
  }

  @action
  checkIfFiltersEmpty(): boolean {
    if (
      !categoryFilter.currentCategory &&
      !eventsSorter.currentSorter &&
      eventsSorter.isSorterIncreased === null
    ) {
      return true;
    } else {
      return false;
    }
  }
}

const filtersStore = new FiltersStore();
export default filtersStore;
