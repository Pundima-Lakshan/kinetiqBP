import type { UiServiceUser } from '@/services';

export const dateToString = (date: string | Date | null | undefined) => {
  if (!date) return '';

  const _date = new Date(date);

  if (isNaN(_date.getTime())) {
    return 'Invalid date';
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // e.g., "Monday"
    day: '2-digit', // e.g., "08"
    month: 'long', // e.g., "February"
    year: 'numeric', // e.g., "2025"
    hour: '2-digit', // e.g., "09"
    minute: '2-digit', // e.g., "45"
    second: '2-digit', // e.g., "30"
    hour12: true, // AM/PM format
  };

  return _date.toLocaleString('en-US', options);
};

export const getUiUserFullName = (value?: UiServiceUser) => `${value?.firstname ?? ''} ${value?.lastname ?? ''}`;

export const extractPdfTemplateFilename = (fileNameWithPrefixes: string) => {
  const regex = /([^__]+)(?=__)/;
  const match = fileNameWithPrefixes.match(regex);
  return match ? match[0] : fileNameWithPrefixes;
};
