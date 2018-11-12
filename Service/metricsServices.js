
const formatTransactionsByItem = (allItems) => {
   const data = allItems.reduce((accum, item) => {
        const { name, price, image, quantity } = item;
        if (accum[name]) accum[name].push({
          price,
          name,
          quantity,
        });
        else {
          accum[name] = [{
            price, 
            name,
            quantity,
          }];
        }
        return accum;
      },{});
      return data;
}

const totalsPerItem = (items, transactionsByItem) => {
    const reducedItems = items.map(itemName => {
        const result = transactionsByItem[itemName].reduce((accum, value) => {
           return {
             price: accum.price + value.price,
             name: value.name,
             quantity: accum.quantity + value.quantity,
           }
         });
         return result;
       });

       // Format Data To Match UI
      return reducedItems.map(item => {
           return {
               name: item.name,
               price: `$${(item.price / item.quantity).toFixed(2)}`,
               quantity: item.quantity,
               total: `$${item.price.toFixed(2)}`,
           }
       });
}


const findTopProducts = (transactions) => {
    // console.log("Transactions", JSON.stringify(transactions, null, 4));
    let allItems = []; // reformated json with item title as the key to an array of items object
    let items = []; // an array of item titles without duplicates

    // Populate allItems and items array with proper data
    transactions.map(tx => {
        tx.items.map(item => {
          allItems.push(item);
          if(!items.includes(item.name)){
            items.push(item.name);
          }
        })
      });
      // Format json into usable UI json
      const transactionsByItem = formatTransactionsByItem(allItems);
      const itemTotals = totalsPerItem(items, transactionsByItem); 

      const itemTransactionsResults = {
          itemTotals,
          transactionsByItem,
      }
      return itemTransactionsResults;
}

const metricsService = { findTopProducts };

export default metricsService;