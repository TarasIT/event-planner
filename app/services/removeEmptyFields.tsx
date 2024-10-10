import { NewEvent } from "../types/types";

export function removeEmptyFields(event: NewEvent): NewEvent | FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(event)) {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  }
  return formData;
}
