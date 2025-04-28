export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getISOStringDate = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};
