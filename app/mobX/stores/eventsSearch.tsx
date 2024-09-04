import { observable, action, makeAutoObservable } from "mobx";

class EventsSearch {
  @observable
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }
}

const eventsSearch = new EventsSearch();
export default eventsSearch;
