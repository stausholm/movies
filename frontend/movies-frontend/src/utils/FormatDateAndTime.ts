export const formatMinutes = (minutes: number): string => {
  if (minutes < 0) minutes = 0;
  const hours = Math.floor(minutes / 60);
  const minutesRemainder = minutes % 60;
  const hoursLabel = 'hr'; // TODO: localize
  const minutesLabel = 'min'; // TODO: localize
  return `${hours} ${hoursLabel} ${minutesRemainder} ${minutesLabel}`;
};

export const localizeDate = (date: string | Date, locale?: string): string => {
  const _date = new Date(date);
  if (isNaN(_date.getDate())) return 'N/A';
  return _date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
};
