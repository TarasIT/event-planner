import { cookies } from "next/headers";
import { EventsProps } from "../types/types";

interface HomeProps {
  eventsList: EventsProps | null;
  error: string | null;
  message: string | null;
  errors: { message: string } | null;
}

export async function getEvents(queryParams: string): Promise<HomeProps> {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `https://event-planner-api.onrender.com/api/events?per_page=8&${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const eventsResponse = await response.json();
    if (!response.ok || eventsResponse.error || eventsResponse.errors) {
      throw new Error(
        eventsResponse.error ||
          eventsResponse.message ||
          "Failed to get events."
      );
    }
    return {
      eventsList: eventsResponse || null,
      error: null,
      message: null,
      errors: null,
    };
  } catch (error: unknown) {
    return {
      eventsList: null,
      errors: null,
      error: (error as Error).message,
      message: (error as Error).message,
    };
  }
}
