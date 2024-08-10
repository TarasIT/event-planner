import { observable, action, makeAutoObservable } from "mobx";
import { NewEvent } from "../../types/types";
import eventsStore from "./eventsStore";
import { transformDate } from "../../services/dateTransform";

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
