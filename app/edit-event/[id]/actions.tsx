import axios from "axios";
import axiosServer from "@/axiosServer";
import { NewEvent } from "../../types/types";

interface ResponseProps {
  data?: NewEvent | null;
  error?: string | null;
  message?: string | null;
  errors?: [{ message: string }] | null;
}

interface EventProps {
  event?: NewEvent | null;
  error?: string | null;
}

export async function getEventById(id: string): Promise<EventProps> {
  try {
    const response = await axiosServer.get(`events/${id}`);
    const responseData: ResponseProps = response.data;

    return {
      event: responseData.data || null,
      error: null,
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to retrieve an event. Please, try later.";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      event: null,
      error: errorMessage,
    };
  }
}
