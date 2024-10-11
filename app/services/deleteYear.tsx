export const deleteYear = (date: string): string => {
  const [day, month, year] = date.split("/");
  return `${day}.${month}`;
};
