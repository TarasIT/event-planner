import { observable, action, makeAutoObservable } from "mobx";
import eventsStore from "./eventsStore";

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

  @action filterEventsByCategory() {
    const KEY = process.env.REACT_APP_STORAGE_KEY!;
    const events = eventsStore.getEvents(KEY);

    return events
      ? events.filter(({ category }) => category === this.currentCategory)
      : [];
  }
}

const categoryFilter = new CategoryFilter();
export default categoryFilter;
