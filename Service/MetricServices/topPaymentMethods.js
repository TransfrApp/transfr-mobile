
// Reducing the transactions to an object with keys of coin id's
// and a value of arrays of transactiosn that used that coin.
const reduceByPaymentMethod = (transactions) => {
    return transactions.reduce((accum, value) => {
        const { payment_method, amount, tax } = value;
        if (accum[payment_method]) accum[payment_method].push({
            amount,
            tax,
            payment_method
        });
        else {
          accum[payment_method] = [{
            amount,
            tax,
            payment_method
          }]
        }
        return accum;
      },{});
}

  // Creates an Array of coin id's that have been used.
  // Makes reducing the transaction data a bit easier 
  const findAllUsedCoins = (transactions) => {
    let coins = [];
    transactions.map(tx => {
        if (!coins.includes(tx.payment_method)){
          coins.push(tx.payment_method)
        }
      });
      return coins;
  }


  // Format the data to be easy to use in the bar chart
  const formatToUIData = (coins, paymentType) => {
    return coins.map(coin => {
        return paymentType[coin].reduce((accum, value) => {
          return {
            x: value.payment_method,
            y: accum.amount ? accum.amount : accum.y + value.amount, // accum changes object shape from payment type to the ui type which causes a break
          }
        });
      });
  }


const calculateTopPaymentMethods = (transactions) => {
    // Reduce the data to find the top coins used, and later, credit cards and e-payments
    const paymentTypes = reduceByPaymentMethod(transactions);
    const coinsUsed = findAllUsedCoins(transactions);
    const topPaymentMethod = formatToUIData(coinsUsed, paymentTypes);
    return { topPaymentMethod, coinsUsed };
}


/*
Data to test the Top Payments with

 const testTopPaymentMethod = [
      { x: "ETH", y: 30000 },
      { x: "REQ", y: 60000 },
      { x: "KNC", y: 100000 },
      { x: "DGX", y: 30000 },
      { x: "DAI", y: 60000 },
      { x: "NEO", y: 100000 },
    ];
*/

export default calculateTopPaymentMethods;
