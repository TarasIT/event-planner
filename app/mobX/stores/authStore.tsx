import { observable, action, makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
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
  clearToken(): void {
    this.token = null;
    Cookies.remove("token", { path: "/" });
  }

  @action
  resetAuthForm(): void {
    setAuthCredentials.setName("");
    setAuthCredentials.setEmail("");
    setAuthCredentials.setPassword("");
  }

  @action
  async signup(): Promise<void> {
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
  async login(): Promise<void> {
    const credentials: User = {
      email: setAuthCredentials.email,
      password: setAuthCredentials.password,
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
      const data = await response.json();
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
  async getUser(): Promise<void> {
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to logout.");
      }
      this.clearToken();
      this.setLoggedIn(false);
      this.userId = null;
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
