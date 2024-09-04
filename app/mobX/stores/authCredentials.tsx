import { observable, action, makeAutoObservable } from "mobx";

class SetAuthCredentials {
  @observable
  name: string = "";
  email: string = "";
  googleId: string | null = null;
  password: string | null = null;
  newPassword: string = "";
  confirmPassword: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setName = (name: string): void => {
    this.name = name;
  };

  @action
  setEmail(email: string): void {
    this.email = email;
  }

  @action
  setGoogleId(googleId: string): void {
    this.googleId = googleId;
  }

  @action
  setPassword(password: string): void {
    this.password = password;
  }

  @action
  setNewPassword(password: string): void {
    this.newPassword = password;
  }

  @action
  setConfirmPassword(password: string): void {
    this.confirmPassword = password;
  }
}

const authCredentials = new SetAuthCredentials();
export default authCredentials;
