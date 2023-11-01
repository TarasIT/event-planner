import { observable, action, makeAutoObservable } from "mobx";

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
}

const categoryFilter = new CategoryFilter();
export default categoryFilter;
