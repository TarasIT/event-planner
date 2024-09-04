export const transformDate = (date: string): string => {
  const [day, month, year] = date.split("/");
  return `${day}.${month}`;
};
