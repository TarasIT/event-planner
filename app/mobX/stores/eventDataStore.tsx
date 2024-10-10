import { observable, action, makeAutoObservable } from "mobx";

class SetFormValues {
  @observable
  title: string = "";
  description: string = "";
  date: string = "";
  time: string = "";
  location: string = "";
  category: string = "";
  picture: string | File | Blob | null = null;
  priority: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTitle = (title: string): void => {
    this.title = title;
  };

  @action
  setDescription(description: string): void {
    this.description = description;
  }

  @action
  setDate(date: string): void {
    this.date = date;
  }

  @action
  setTime(time: string): void {
    this.time = time;
  }

  @action
  setLocation(location: string): void {
    this.location = location;
  }

  @action
  setCategory(category: string): void {
    this.category = category;
  }

  @action
  setPicture(picture: string | File | Blob | null): void {
    this.picture = picture;
  }

  @action
  setPriority(priority: string): void {
    this.priority = priority;
  }

  @action
  resetEventFormInputs = (): void => {
    this.setTitle("");
    this.setDescription("");
    this.setDate("");
    this.setTime("");
    this.setLocation("");
    this.setCategory("");
    this.setPicture(null);
    this.setPriority("");
  };
}

const setFormValues = new SetFormValues();
export default setFormValues;
