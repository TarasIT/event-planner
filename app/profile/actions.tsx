import { cookies } from "next/headers";

interface ProfileProps {
  name: string | null;
  email: string | null;
  error: string | null;
  message: string | null;
}

export async function getUserData(): Promise<ProfileProps> {
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(
      "https://event-planner-api.onrender.com/api/users/current",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: ProfileProps = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to get user.");
    }
    return {
      name: data.name,
      email: data.email,
      error: null,
      message: null,
    };
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return {
      name: null,
      email: null,
      error: errorMessage,
      message: null,
    };
  }
}
