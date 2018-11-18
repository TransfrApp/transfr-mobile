import { DateTime } from 'luxon';

const formatTransactionsByDate = (transactions) => {
    return transactions.reduce((accum, value) => {
        const { amount, tax, discount } = value;
        const date = DateTime.fromISO(value.createdAt).toISODate();
        if (accum[date]) accum[date].push({
          date,
          amount,
          tax,
          discount
        })
        else {
          accum[date] = [{ date, amount, tax, discount }];
        }
        return accum;
    },{})
}

const reduceByCurrentWeek = (weekDays, dailyTxs) => {
    return weekDays.map(day => {
        if (!dailyTxs[day]) return { x: DateTime.fromISO(day).weekdayShort, y: 0 }
         return dailyTxs[day].reduce((accum, value) => {
          return {
            x: DateTime.fromISO(day).toLocal().weekdayShort,
            y: accum.amount ? accum.amount : accum.y + value.amount
          }
        });
      })
}

const generateWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
        let day = DateTime.local().minus({ days: i }).toISODate();
        return day;
      });
}

const generateSalesSummary = (transactions) => {
    const weekDays = generateWeekDays();    
    const formatedTransactions = formatTransactionsByDate(transactions);
    const finalDate = reduceByCurrentWeek(weekDays, formatedTransactions)
    console.log("Final Date", finalDate);
}

export default generateSalesSummary;