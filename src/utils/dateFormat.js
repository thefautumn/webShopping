// utils.js
import { format } from 'date-fns';

export const dateFormat = (dateString) => {
  return format(new Date(dateString), 'dd-MM-yyyy');
};
  