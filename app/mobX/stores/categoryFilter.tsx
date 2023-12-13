import { observable, action, makeAutoObservable } from "mobx";
import eventsStore from "./eventsStore";
import { NewEvent } from "../../types/types";

class CategoryFilter {
  @observable
  currentCategory: string = "";
  isOpened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action getCurrentCategory(category: string): void {
    category ? (this.currentCategory = category) : (this.currentCategory = "");
  }

  @action checkCategoriesFilterOpened(isCategoryListOpened: boolean): void {
    this.isOpened = isCategoryListOpened;
  }

  @action filterEventsByCategory(): NewEvent[] {
    return eventsStore
      .getEvents(process.env.NEXT_PUBLIC_STORAGE_KEY!)
      .filter(({ category }) => category === this.currentCategory);
  }
}

const categoryFilter = new CategoryFilter();
export default categoryFilter;
