import { parseISO, format } from 'date-fns';

export const formatDate = (dateString: string) =>
  format(parseISO(dateString), 'MMMM d, yyyy');
