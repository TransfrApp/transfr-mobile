
const cryptoPrice = () => {
    await axios.get("https://api.cryptonator.com/api/ticker/btc-usd")
          .then((res) => {
            const price =  res.data.ticker.price;
          });
}

export default cryptoPrice;