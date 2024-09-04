import { observable, action, makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import type { ChangePassworProps, User } from "../../types/types";
import authCredentials from "./authCredentials";

class AuthStore {
  @observable
  userId: string | null = null;
  name: string | null = null;
  email: string | null = null;
  token: null | string = null;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadToken();
  }

  @action
  setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  @action
  setLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  @action
  loadToken(): void {
    const token = Cookies.get("token");
    if (token) {
      this.token = token;
      this.setLoggedIn(true);
      // this.getUser();
    }
  }

  @action
  saveToken(token: string): void {
    this.token = token;
    Cookies.set("token", token, {
      expires: 7,
      // secure: true,
      sameSite: "strict",
    });
  }

  @action
  deleteToken(): void {
    this.token = null;
    Cookies.remove("token", { path: "/" });
  }

  @action
  resetAuthForm(): void {
    authCredentials.setName("");
    authCredentials.setEmail("");
    authCredentials.setPassword("");
    authCredentials.setNewPassword("");
    authCredentials.setConfirmPassword("");
  }

  @action
  async signup(): Promise<void> {
    const credentials: User = {
      name: authCredentials.name,
      email: authCredentials.email,
      password: authCredentials.password,
    };
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up.");
      }
      toast.success(data.message);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.resetAuthForm();
      this.setLoading(false);
    }
  }

  @action
  async login(): Promise<void> {
    const credentials: User = {
      email: authCredentials.email,
      password: authCredentials.password,
    };
    this.setLoading(true);
    this.setLoggedIn(false);
    this.token = null;
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const data: {
        token: string;
        error: string;
      } = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to log in.");
      }
      this.saveToken(data.token);
      this.setLoggedIn(true);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.resetAuthForm();
      this.setLoading(false);
    }
  }

  @action
  async logout(): Promise<void> {
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
        }
      );
      const data: {
        message: string;
        error: string;
      } = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to logout.");
      }
      this.deleteToken();
      this.setLoggedIn(false);
      this.userId = null;
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
  async deleteProfile(): Promise<void> {
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/current",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data: {
        message: string;
        error: string;
      } = await response.json();

      if (!response.ok || data.error) {
        throw new Error(
          data.error || data.message || "Failed to delete profile."
        );
      }
      toast.success(data.message);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.setLoading(false);
      this.deleteToken();
      this.setLoggedIn(false);
    }
  }

  @action
  async changePassword(credentials: ChangePassworProps): Promise<void> {
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        `https://event-planner-api.onrender.com/api/users/change-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const data: {
        message: string;
        error: string;
      } = await response.json();

      console.log("credentials", credentials);
      console.log("data", data);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to change password."
        );
      }
      this.resetAuthForm();
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

const authStore = new AuthStore();
export default authStore;
