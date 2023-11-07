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
  getUserQuery(query: string): void {
    this.searchQuery = query;
  }

  @action
  filterEventsByQuery(): NewEvent[] {
    const KEY = process.env.REACT_APP_STORAGE_KEY!;
    const events = eventsStore.getEvents(KEY);

    if (events) {
      return events.filter((event: NewEvent) => {
        const eventsValues = Object.keys(event)
          .filter((key) => key !== "id" && key !== "image")
          .map((key) => {
            if (key === "date") {
              const dayAndMonth = transformDate(event[key]);
              const year = new Date(event[key]).getFullYear().toString();
              return dayAndMonth + "." + year;
            }
            return event[key].toString().toLowerCase();
          });
        return eventsValues.some((value) => value.includes(this.searchQuery));
      });
    } else {
      return [];
    }
  }
}

const eventsSearch = new EventsSearch();
export default eventsSearch;
