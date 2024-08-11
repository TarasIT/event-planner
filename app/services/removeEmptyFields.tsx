import { NewEvent } from "../types/types";

export function removeEmptyFields(
  event: NewEvent,
  isUpdatingProcess: boolean
): NewEvent | FormData {
  if (isUpdatingProcess) {
    return Object.fromEntries(
      Object.entries(event).filter(([key, value]) => {
        return value !== "" && value !== null && value !== undefined;
      })
    ) as NewEvent;
  } else {
    const formData = new FormData();
    for (const [key, value] of Object.entries(event)) {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    }
    return formData;
  }
}
