import { format as dateFnsFormat } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return dateFnsFormat(new Date(date), 'MMMM do, yyyy');
  } else {
    return dateFnsFormat(date, 'MMMM do, yyyy');
  }
};

export const formatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    return dateFnsFormat(new Date(date), 'h:mm a');
  } else {
    return dateFnsFormat(date, 'h:mm a');
  }
};