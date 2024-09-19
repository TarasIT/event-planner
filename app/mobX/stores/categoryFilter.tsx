import { observable, action, makeAutoObservable } from "mobx";

class CategoryFilter {
  @observable
  currentCategory: string = "";
  isOpened: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCurrentCategory(category: string): void {
    this.currentCategory = category;
  }

  @action
  checkCategoriesFilterOpened(isCategoryListOpened: boolean): void {
    this.isOpened = isCategoryListOpened;
  }
}

const categoryFilter = new CategoryFilter();
export default categoryFilter;
