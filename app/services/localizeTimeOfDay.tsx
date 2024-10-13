export const localizeTimeOfDay = (eventTime: string): string => {
  let timeOfDay = "";

  const [time, period] = eventTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  switch (period) {
    case "AM":
      if (hours === 12 || hours <= 3) {
        timeOfDay = "common.timeOfDay.night";
      } else {
        timeOfDay = "common.timeOfDay.morning";
      }
      break;
    case "PM":
      if (hours === 12 || hours <= 4) {
        timeOfDay = "common.timeOfDay.afternoon";
      } else {
        timeOfDay = "common.timeOfDay.evening";
      }
      break;
  }

  return timeOfDay;
};
