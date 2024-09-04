import { observable, action, makeAutoObservable } from "mobx";
import type { EventsMeta, NewEvent } from "../../types/types";
import authStore from "./authStore";
import { toast } from "react-toastify";
import setFormValues from "./setFormValues";
import paginationStore from "./paginationStore";

interface ResponseProps {
  data?: NewEvent | null;
  error?: string | null;
  message?: string | null;
  errors?: [{ message: string }] | null;
}

class EventsStore {
  @observable
  isLoading: boolean = false;
  events: NewEvent[] | null = null;
  event: NewEvent | null | undefined = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  resetEventFormInputs = (): void => {
    setFormValues.setTitle("");
    setFormValues.setDescription("");
    setFormValues.setDate("");
    setFormValues.setTime("");
    setFormValues.setLocation("");
    setFormValues.setCategory("");
    setFormValues.setPicture("");
    setFormValues.setPriority("");
  };

  @action
  setEvents(events: NewEvent[] | null) {
    this.events = events;
  }

  @action
  setEvent(event: NewEvent | null | undefined) {
    this.event = event;
  }

  @action
  setError(error: string | null) {
    this.error = error;
  }

  @action
  async createEvent(event: FormData): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      this.setEvent(null);

      const response = await fetch(
        "https://event-planner-api.onrender.com/api/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: "application/json",
          },
          body: event,
        }
      );
      const eventsResponse = await response.json();

      if (!response.ok || eventsResponse.error || eventsResponse.errors) {
        throw new Error(
          eventsResponse.error ||
            eventsResponse.message ||
            "Failed to create an event."
        );
      }
      this.setEvent(eventsResponse.data);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.setError(errorMessage);
    } finally {
      this.resetEventFormInputs();
      this.setLoading(false);
    }
  }

  @action
  async updateEvent(id: string, event: NewEvent): Promise<void> {
    try {
      this.setLoading(true);
      this.error = null;
      const response = await fetch(
        `https://event-planner-api.onrender.com/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );
      const data = await response.json();

      if (!response.ok || data.error || data.errors) {
        throw new Error(
          data.error || data.message || "Failed to update the event."
        );
      }
      this.event = data.event;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.setError(errorMessage);
    } finally {
      this.setLoading(false);
    }
  }

  @action
  async deleteEvent(id: string): Promise<void> {
    try {
      this.setLoading(true);
      this.error = null;
      const response = await fetch(
        `https://event-planner-api.onrender.com/api/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: "application/json",
          },
        }
      );
      const data: ResponseProps = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to delete an event.");
      }
      toast.success(data.message);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.setLoading(false);
    }
  }

  @action
  async deleteAllEvents(): Promise<void> {
    try {
      this.setLoading(true);
      this.error = null;
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/events",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            Accept: "application/json",
          },
        }
      );
      const data: ResponseProps = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to delete all events.");
      }
      toast.success(data.message);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.setLoading(false);
    }
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
