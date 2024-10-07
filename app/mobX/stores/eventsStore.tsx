import axios from "axios";
import { observable, action, makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import type { NewEvent } from "../../types/types";
import eventDataStore from "./eventDataStore";
import axiosClient from "@/axiosClient";

interface EventResponseProps {
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
  message: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

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
  setMessage(message: string | null): void {
    this.message = message;
  }

  @action
  async createEvent(event: FormData): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      this.setEvent(null);

      const response = await axiosClient.post("events", event);
      const data: EventResponseProps = response.data;

      this.setEvent(data.data);
    } catch (error: unknown) {
      let errorMessage = "Failed to create an event.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      this.setError(errorMessage);
    } finally {
      if (!this.error) eventDataStore.resetEventFormInputs();
      this.setLoading(false);
    }
  }

  @action
  async updateEvent(id: string, event: NewEvent): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);

      const response = await axiosClient.put(`events/${id}`, event);
      const data: EventResponseProps = response.data;

      this.setEvent(data.data);
    } catch (error: unknown) {
      let errorMessage = "Failed to update the event.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

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
      this.setError(null);
      this.setMessage(null);

      const response = await axiosClient.delete(`events/${id}`);
      const data: EventResponseProps = response.data;

      toast.success(data.message);
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to delete an event.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      this.setError(errorMessage);
    } finally {
      this.setLoading(false);
    }
  }

  @action
  async deleteAllEvents(): Promise<void> {
    try {
      this.setLoading(true);
      this.setError(null);
      this.setMessage(null);

      const response = await axiosClient.delete("events");
      const data: EventResponseProps = response.data;

      this.setEvents(null);
      toast.success(data.message);
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to delete all events.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      this.setError(errorMessage);
    } finally {
      this.setLoading(false);
    }
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
