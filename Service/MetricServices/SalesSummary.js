import { DateTime } from "luxon";

const formatTransactionsByDate = transactions => {
  return transactions.reduce((accum, value) => {
    const { amount, tax, discount } = value;
    const date = DateTime.fromISO(value.createdAt).toISODate();
    if (accum[date])
      accum[date].push({ date, amount, tax, discount});
    else {
      accum[date] = [{ date, amount, tax, discount }];
    }
    return accum;
  }, {});
};

const reduceByCurrentWeek = (weekDays, dailyTxs) => {
  return weekDays.reverse().map(day => {
    if (!dailyTxs[day]) return { x: DateTime.fromISO(day).weekdayShort, y: 1 };
    if (dailyTxs[day].length === 1) {
      return {
        x: DateTime.fromISO(day).weekdayShort,
        y: dailyTxs[day][0].amount
      };
    } else {
      return dailyTxs[day].reduce((accum, value) => {
        return {
          x: DateTime.fromISO(day).toLocal().weekdayShort,
          y: accum.amount ? accum.amount : accum.y + value.amount
        };
      });
    }
  });
};

const generateWeekDays = () => {
  return Array.from({ length: 7 }, (_, i) => {
    let day = DateTime.local()
      .minus({ days: i })
      .toISODate();
    return day;
  });
};

const findHighestDailyTotal = (finalData) => {
   return Math.max.apply(Math, finalData.map((total) => { return total.y } ))
}

const generateSalesSummary = transactions => {
  const weekDays = generateWeekDays();
  const formatedTransactions = formatTransactionsByDate(transactions);
  const salesSummary = reduceByCurrentWeek(weekDays, formatedTransactions);
  const highestTotal = findHighestDailyTotal(salesSummary);
  return {
      salesSummary,
      highestTotal
    };
};

export default generateSalesSummary;
