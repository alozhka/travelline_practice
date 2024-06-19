import { format } from 'date-fns';

const getFormattedCurrentDate = () => format(new Date(), 'EEE, dd MMM yyyy HH:mm')


export { getFormattedCurrentDate }