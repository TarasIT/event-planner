import { observable, action, makeAutoObservable } from "mobx";

class SetAuthCredentials {
  @observable
  name: string = "";
  email: string = "";
  password: string = "";

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
  setPassword(password: string): void {
    this.password = password;
  }
}

const setAuthCredentials = new SetAuthCredentials();
export default setAuthCredentials;
