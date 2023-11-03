export const transformDate = (date: string): string => {
  const inputDate = new Date(date);
  const day = String(inputDate.getDate()).padStart(2, "0");
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
};
