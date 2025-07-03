// utils/dateFormatter.ts

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Adjust for timezone offset to ensure the date is interpreted as local
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() + userTimezoneOffset);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return localDate.toLocaleDateString('es-ES', options);
};
