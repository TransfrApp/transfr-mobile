import { DateTime } from 'luxon';

const currentYear = DateTime.local().get('year');
const currentMonth = DateTime.local().get('month');
const currentWeek = DateTime.local().weekNumber;
const currentDay = DateTime.local().get('day');


const filterMonth = (yearlyData) => {
    console.log("Filter Month Firing");
    const relevantTransactions = yearlyData.filter(item => {
        const itemYear = DateTime.fromISO(item.createdAt).get('year');
        const itemMonth = DateTime.fromISO(item.createdAt).get('month');
        return itemYear === currentYear && itemMonth === currentMonth;
      });
    return relevantTransactions;
}

const filterWeek = (yearlyData) => {
    console.log("Filter Week Firing");
    const relevantTransactions = yearlyData.filter(item => {
        const itemWeek = DateTime.fromISO(item.createdAt).weekNumber;
        const itemYear = DateTime.fromISO(item.createdAt).get('year');
        return itemYear ===currentYear && itemWeek === currentWeek;
      });
      return relevantTransactions;
}

const filterDay = (yearlyData) => {
    console.log("Filter Day Firing");
    const relevantTransactions = yearlyData.filter(item => {
        const itemDay = DateTime.fromISO(item.createdAt).get('day');
        const itemWeek = DateTime.fromISO(item.createdAt).weekNumber;
       return itemWeek === currentWeek && itemDay === currentDay;
      });
    return relevantTransactions;
}

const transactionFilter = { filterDay, filterMonth, filterWeek };

export default transactionFilter;