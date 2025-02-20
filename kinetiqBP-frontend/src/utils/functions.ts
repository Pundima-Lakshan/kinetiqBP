export const dateToString = (date: string | Date) => {
  const createdDate = new Date(date);
  return createdDate.toLocaleDateString();
};
