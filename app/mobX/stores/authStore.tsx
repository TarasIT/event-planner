import { observable, action, makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import type { User } from "../../types/types";
import setAuthCredentials from "./setAuthCredentials";

class AuthStore {
  @observable
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async signup() {
    try {
      const credentials: User = {
        name: setAuthCredentials.name,
        email: setAuthCredentials.email,
        password: setAuthCredentials.password,
      };

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error(error as string);
    }
  }

  @action
  async login() {
    try {
      const credentials: User = {
        email: setAuthCredentials.email,
        password: setAuthCredentials.password,
      };

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.token);
    } catch (error) {
      console.error(error as string);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
