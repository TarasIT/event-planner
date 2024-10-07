import axios from "axios";
import { EventsProps } from "../types/types";
import axiosServer from "@/axiosServer";

interface HomeProps {
  eventsList: EventsProps | null;
  error: string | null;
  message: string | null;
  errors: { message: string } | null;
}

export async function getEvents(queryParams: string): Promise<HomeProps> {
  try {
    const response = await axiosServer.get(`events?per_page=8&${queryParams}`);
    const eventsResponse = response.data;

    return {
      eventsList: eventsResponse || null,
      error: null,
      message: null,
      errors: null,
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to get events.";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      eventsList: null,
      errors: null,
      error: errorMessage,
      message: errorMessage,
    };
  }
}
