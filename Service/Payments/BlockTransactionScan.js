import axios from 'axios';

const BitcoinTransactions = (address) => {
    if (!address) return;
    console.log("Bitcoin Transaction Block Function Firing");
    console.log("BTC Address", address);
    axios.get(`https://blockchain.info/rawaddr/${address}`)
        .then(res => {
            console.log("Bitcoin Transactions Res", res);
        })
}

const EthTransactions = (address) => {
    if (!address) return;
    console.log("Ethereium Transactions Block Function Firing");
}

const scan = {
    BitcoinTransactions,
    EthTransactions
}

export default scan;