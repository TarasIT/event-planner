import { observable, action, makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import type { User } from "../../types/types";
import setAuthCredentials from "./setAuthCredentials";

class AuthStore {
  @observable
  userId: string | null = null;
  token: null | string = null;
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") this.loadToken();
  }

  @action
  setLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  @action
  loadToken(): void {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
      this.isLoggedIn = true;
      this.getUser();
    }
  }

  @action
  saveToken(token: string): void {
    if (typeof window === "undefined") return;
    this.token = token;
    localStorage.setItem("token", token);
  }

  @action
  clearToken(): void {
    if (typeof window === "undefined") return;
    this.token = null;
    localStorage.removeItem("token");
  }

  @action
  resetAuthForm(): void {
    setAuthCredentials.setName("");
    setAuthCredentials.setEmail("");
    setAuthCredentials.setPassword("");
  }

  @action
  async signup() {
    const credentials: User = {
      name: setAuthCredentials.name,
      email: setAuthCredentials.email,
      password: setAuthCredentials.password,
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
  async login() {
    const credentials: User = {
      email: setAuthCredentials.email,
      password: setAuthCredentials.password,
    };
    this.setLoading(true);
    this.isLoggedIn = false;
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to log in.");
      }
      this.token = data.token;
      this.saveToken(data.token);
      this.isLoggedIn = true;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.resetAuthForm();
      this.setLoading(false);
    }
  }

  async getUser() {
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/current",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get user.");
      }
      this.userId = data.id;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.resetAuthForm();
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);
    this.error = null;
    try {
      const response = await fetch(
        "https://event-planner-api.onrender.com/api/users/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to logout.");
      }
      this.clearToken();
      this.isLoggedIn = false;
      this.userId = null;
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
      this.error = errorMessage;
    } finally {
      this.resetAuthForm();
      this.setLoading(false);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
