import { observable, action, makeAutoObservable } from "mobx";
import { NewEvent } from "../../types/types";

interface PriorityLevel {
  Low: number;
  Medium: number;
  High: number;
  [key: string]: number;
}

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

  @action sortEvents(events: NewEvent[]): NewEvent[] {
    const priorityLevel: PriorityLevel = { Low: 0, Medium: 1, High: 2 };

    if (!this.currentSorter) return events;

    switch (this.currentSorter) {
      case "A-Z":
        events.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        events.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date":
        this.isSorterIncreased
          ? events.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          : events.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        break;
      case "priority":
        this.isSorterIncreased
          ? events.sort(
              (a, b) => priorityLevel[b.priority] - priorityLevel[a.priority]
            )
          : events.sort(
              (a, b) => priorityLevel[a.priority] - priorityLevel[b.priority]
            );
        break;
      default:
        events;
        break;
    }

    return events;
  }

  @action checkIsSorterIncreased(isSorterIncreased: boolean): void {
    this.isSorterIncreased = isSorterIncreased;
  }
}

const eventsSorter = new EventsSorter();
export default eventsSorter;
