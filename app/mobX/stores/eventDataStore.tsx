import { observable, action, makeAutoObservable } from "mobx";

class SetFormValues {
  @observable
  title: string | null = null;
  description: string | null = null;
  date: string | null = null;
  time: string | null = null;
  location: string | null = null;
  category: string | null = null;
  picture: string | File | Blob | null = null;
  priority: string | null = null;
  isTitleValid: boolean = true;
  isLocationValid: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setIsTitleValid = (isTitleValid: boolean): void => {
    this.isTitleValid = isTitleValid;
  };

  @action
  setIsLocationValid = (isLocationValid: boolean): void => {
    this.isLocationValid = isLocationValid;
  };

  @action
  setTitle = (title: string | null): void => {
    this.title = title;
  };

  @action
  setDescription(description: string | null): void {
    this.description = description;
  }

  @action
  setDate(date: string | null): void {
    this.date = date;
  }

  @action
  setTime(time: string | null): void {
    this.time = time;
  }

  @action
  setLocation(location: string | null): void {
    this.location = location;
  }

  @action
  setCategory(category: string | null): void {
    this.category = category;
  }

  @action
  setPicture(picture: string | File | Blob | null): void {
    this.picture = picture;
  }

  @action
  setPriority(priority: string | null): void {
    this.priority = priority;
  }

  @action
  resetEventFormInputs = (): void => {
    this.setTitle(null);
    this.setDescription(null);
    this.setDate(null);
    this.setTime(null);
    this.setLocation(null);
    this.setCategory(null);
    this.setPicture(null);
    this.setPriority(null);
    this.setIsTitleValid(true);
    this.setIsLocationValid(true);
  };
}

const setFormValues = new SetFormValues();
export default setFormValues;
