import { NewEvent } from "../types/types";

export const parseEventsFromLS = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key)!) ?? [];
  } catch (error: unknown) {
    console.error("Get state error: ", (error as ErrorEvent).message);
  }
};

export const saveEventToLS = (key: string, newEvent: NewEvent[]) => {
  try {
    return localStorage.setItem(key, JSON.stringify(newEvent));
  } catch (error: unknown) {
    console.error("Set state error: ", (error as ErrorEvent).message);
  }
};

export const updateEventInLS = (key: string, updatedEvent: NewEvent) => {
  try {
    const events: NewEvent[] = parseEventsFromLS(key);

    if (events) {
      const updatedEvents = events.map((event) => {
        if (event.id === updatedEvent.id) return updatedEvent
        return event
      });
      localStorage.setItem(key, JSON.stringify(updatedEvents));
    } else {
      console.error("No events found in local storage with key: ", key);
   }
  } catch (error: unknown) {
    console.error("Update event error: ", (error as ErrorEvent).message);
  }
};

export const deleteEventFromLS = (key: string, eventId: string | undefined) => {
  try {
    const existingEvents = localStorage.getItem(key);
    
    if (existingEvents) {
      const events: NewEvent[] = JSON.parse(existingEvents);
      const eventsWithoutDeletedOne = events.filter(({id}) => id !== eventId);
      localStorage.setItem(key, JSON.stringify(eventsWithoutDeletedOne));
      } else {
      console.error("No events found in local storage with key: ", key);
    }
  } catch (error) {
    console.error("Error deleting event: ", error);
  }
};

