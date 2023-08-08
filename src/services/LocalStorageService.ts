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
