import { observable, action, makeAutoObservable } from "mobx";

class EventsSorter {
  @observable
  currentSorter: string = "";
  isSorterIncreased: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action getCurrentSorter(sorter: string): void {
    this.currentSorter = sorter;
  }

  @action checkIsSorterIncreased(isSorterIncreased: boolean): void {
    this.isSorterIncreased = isSorterIncreased;
  }
}

const eventsSorter = new EventsSorter();
export default eventsSorter;
