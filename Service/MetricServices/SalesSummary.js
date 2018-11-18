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

const generateSalesSummary = (transactions) => {
    const formatedTransactions = formatTransactionsByDate(transactions);
    console.log("Formated Transactions", formatedTransactions);
}

export default generateSalesSummary;