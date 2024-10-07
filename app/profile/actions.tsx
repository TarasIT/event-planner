import axios from "axios";
import axiosServer from "@/axiosServer";

interface ProfileProps {
  name: string | null;
  email: string | null;
  google_id: string | null;
  is_password_existed: boolean | null;
  error: string | null;
  message: string | null;
}

export async function getUserData(): Promise<ProfileProps> {
  try {
    const response = await axiosServer.get("users/current");
    const data: ProfileProps = response.data;

    return {
      name: data.name,
      email: data.email,
      google_id: data.google_id,
      is_password_existed: data.is_password_existed,
      error: null,
      message: null,
    };
  } catch (error: unknown) {
    let errorMessage = "Failed to get user.";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      name: null,
      email: null,
      google_id: null,
      is_password_existed: null,
      error: errorMessage,
      message: null,
    };
  }
}
