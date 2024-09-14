import { cookies } from "next/headers";
import { NewEvent } from "../../types/types";

interface ResponseProps {
  data?: NewEvent | null;
  error?: string | null;
  message?: string | null;
  errors?: [{ message: string }] | null;
}

interface EventProps {
  event?: NewEvent | null | undefined;
  error?: string | null | undefined;
}

export async function getEventById(id: string): Promise<EventProps> {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      `https://event-planner-api.onrender.com/api/events/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const responseData: ResponseProps = await response.json();
    if (!response.ok || responseData.error || responseData.errors) {
      throw new Error(
        responseData.error || responseData.message || "Failed to get events."
      );
    }

    return {
      event: responseData.data || null,
      error: null,
    };
  } catch (error: unknown) {
    return {
      event: null,
      error: (error as Error).message || "Unknown error occurred.",
    };
  }
}
