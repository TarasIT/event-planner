import { observable, action, makeAutoObservable } from "mobx";
import type { NewEvent } from "../../types/types";

class EventsStore {
  @observable
  event: NewEvent | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  getEvents(key: string): NewEvent[] {
    try {
      const events = localStorage.getItem(key);
      return events ? (JSON.parse(events) as NewEvent[]) : [];
    } catch (error: unknown) {
      console.error("Get events error: ", (error as Error).message);
      return [];
    }
  }

  @action
  getEventById(id: string): NewEvent | null {
    try {
      const KEY = process.env.NEXT_PUBLIC_STORAGE_KEY!;
      const events = this.getEvents(KEY);
      return id && events ? events.filter((event) => event.id === id)[0] : null;
    } catch (error: unknown) {
      console.error("Get event error: ", (error as Error).message);
      return null;
    }
  }

  @action
  saveEvents(key: string, newEvents: NewEvent[]): void {
    try {
      if (newEvents) localStorage.setItem(key, JSON.stringify(newEvents));
    } catch (error: unknown) {
      console.error("Save events error: ", (error as ErrorEvent).message);
    }
  }

  @action
  updateEvents(key: string, updatedEvent: NewEvent) {
    try {
      const events = this.getEvents(key);
      if (events) {
        const updatedEvents = events.map((event) => {
          if (event.id === updatedEvent.id) return updatedEvent;
          return event;
        });
        localStorage.setItem(key, JSON.stringify(updatedEvents));
      } else {
        console.error("No events found in local storage with key: ", key);
      }
    } catch (error: unknown) {
      console.error("Update event error: ", (error as ErrorEvent).message);
    }
  }

  @action
  deleteEvent(key: string, eventId: string) {
    try {
      const events = this.getEvents(key);
      if (events) {
        const updatedEvents = events.filter(({ id }) => id !== eventId);
        localStorage.setItem(key, JSON.stringify(updatedEvents));
      } else {
        console.error("No events found in local storage with key: ", key);
      }
    } catch (error: unknown) {
      console.error("Error deleting event: ", (error as ErrorEvent).message);
    }
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
