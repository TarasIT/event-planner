import axios from "axios";
import { observable, action, makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { t } from "i18next";
import type {
  AuthResponseProps,
  ChangePassworProps,
  ResetPassworProps,
  User,
} from "../../types/types";
import authCredentials from "./authCredentials";
import axiosClient from "@/axiosClient";
import { localizeResponses } from "@/app/services/localizeResponses";
import { handleUnauthenticatedUser } from "@/app/services/handleUnauthenticatedUser";

class AuthStore {
  @observable
  name: string | null = null;
  email: string | null = null;
  token: null | string = null;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  message: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  };

  @action
  setLoggedIn = (isLoggedIn: boolean): void => {
    this.isLoggedIn = isLoggedIn;
  };

  @action
  setMessage = (message: string | null): void => {
    this.message = message;
  };

  @action
  setError = (error: string | null): void => {
    this.error = error;
  };

  @action
  setToken = (token: string): void => {
    this.token = token;
  };

  @action
  deleteToken = (): void => {
    this.token = null;
  };

  @action
  signup = async (): Promise<void> => {
    const credentials: User = {
      name: authCredentials.name,
      email: authCredentials.email,
      password: authCredentials.password,
    };
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post("users/auth/signup", credentials);
      const data: AuthResponseProps = response.data;

      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to sign up.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
      this.setLoading(false);
    }
  };

  @action
  login = async (): Promise<void> => {
    const credentials: User = {
      email: authCredentials.email,
      password: authCredentials.password,
    };
    this.setLoading(true);
    this.setLoggedIn(false);
    this.setError(null);

    try {
      const response = await axiosClient.post("users/auth/login", credentials);
      const data: AuthResponseProps = response.data;
      await axios.post(`/login?token=${data.token}`);
      this.setToken(data.token as string);
      this.setLoggedIn(true);
    } catch (error: unknown) {
      let errorMessage = "Failed to login. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
      this.setLoading(false);
    }
  };

  @action
  logout = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post("users/auth/logout");
      const data: AuthResponseProps = response.data;

      this.deleteToken();
      this.setLoggedIn(false);
      await axios.post("/logout");
      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to logout. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage === "Unauthenticated.") {
        this.setError(errorMessage);
        await handleUnauthenticatedUser(errorMessage);
        return;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      this.setLoading(false);
    }
  };

  @action
  deleteProfile = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.delete("users/current");
      const data: AuthResponseProps = response.data;
      this.setLoading(false);
      this.deleteToken();
      await axios.post("/logout");
      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to delete profile. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage === "Unauthenticated.") {
        this.setError(errorMessage);
        await handleUnauthenticatedUser(errorMessage);
        return;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      this.setLoggedIn(false);
    }
  };

  @action
  changePassword = async (credentials: ChangePassworProps): Promise<void> => {
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post(
        "users/change-password",
        credentials
      );
      const data: AuthResponseProps = response.data;

      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to change password. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          (error.response?.data?.error as string) ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage === "Unauthenticated.") {
        this.setError(errorMessage);
        await handleUnauthenticatedUser(errorMessage);
        return;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
      this.setLoading(false);
    }
  };

  @action
  sendResetPasswordLink = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post("forgot-password", {
        email: authCredentials.email,
      });
      const data: AuthResponseProps = response.data;

      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to send reset link. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
      this.setLoading(false);
    }
  };

  @action
  resetPassword = async (resetPasswordToken: string): Promise<void> => {
    const credentials: ResetPassworProps = {
      email: authCredentials.email,
      password: authCredentials.newPassword,
      password_confirmation: authCredentials.confirmPassword,
    };
    this.setLoading(true);
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post(
        `reset-password?token=${resetPasswordToken}`,
        credentials
      );
      const data: AuthResponseProps = response.data;

      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage = "Failed to reset password. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
      this.setLoading(false);
    }
  };

  @action
  resendVerificationLink = async (): Promise<void> => {
    const credentials: User = {
      email: authCredentials.email,
      password: authCredentials.password,
    };
    this.setError(null);
    this.setMessage(null);

    try {
      const response = await axiosClient.post("email/resend", credentials);
      const data: AuthResponseProps = response.data;

      toast.success(t(localizeResponses(data.message as string)));
      this.setMessage(data.message as string);
    } catch (error: unknown) {
      let errorMessage =
        "Failed to resend verification email. Please try later.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(t(localizeResponses(errorMessage)));
      this.setError(errorMessage);
    } finally {
      if (!this.error) authCredentials.resetAuthForm();
    }
  };
}

const authStore = new AuthStore();
export default authStore;
