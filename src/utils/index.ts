import { format, subDays } from 'date-fns';

export const getDate = (sub: number = 0) => { 
    const dataXDaysAgo = subDays(new Date(), sub);

    return format(dataXDaysAgo, 'dd/MM/yyyy');
}