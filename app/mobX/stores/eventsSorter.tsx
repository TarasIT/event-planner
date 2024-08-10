import { observable, action, makeAutoObservable } from "mobx";

class EventsSorter {
  @observable
  currentSorter: string | null = null;
  isSorterIncreased: boolean | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCurrentSorter(sorter: string): void {
    this.currentSorter = sorter;
  }

  @action
  setIsSorterIncreased(isSorterIncreased: boolean): void {
    this.isSorterIncreased = isSorterIncreased;
  }
}

const eventsSorter = new EventsSorter();
export default eventsSorter;
