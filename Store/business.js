import { observable, action, computed } from 'mobx';
import baseUrl from '../request-config';
import UserStore from './user';
import axios from 'axios';
import transactionFilter from '../Service/transactionFilters.js';
import { DateTime } from 'luxon';
class BusinessStore {
    business = observable({
        products: [
            {
                name: 'Pizza',
                image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86c8c1fd5e9e5b384696472a095c42ac&auto=format&fit=crop&w=1500&q=80',
                price: 20.00,
                quantity: 1,
            }, {
                name: 'Coffee',
                image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1500&q=80',
                price: 5.00,
                quantity: 1,
            }, {
                name: 'Dessert',
                image: 'https://images.unsplash.com/photo-1505418640699-b8e61c7273af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e3ee68f6a29882dc092879cd68cb6f12&auto=format&fit=crop&w=1225&q=80',
                price: 7.00,
                quantity: 1,
            },
        ],
        completedTransactions: [],
        checkoutItems: [
            // {
            //     name: 'Coffee',
            //     image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1500&q=80',
            //     price: 5,
            //     quantity: 1,
            // }, {
            //     name: 'Dessert',
            //     image: 'https://images.unsplash.com/photo-1505418640699-b8e61c7273af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e3ee68f6a29882dc092879cd68cb6f12&auto=format&fit=crop&w=1225&q=80',
            //     price: 7,
            //     quantity: 1,
            // },
        ],
        checkoutClient: 'Insert Clients Wallet',
        searchProductList: [],
        addingProduct: 0, // 0 -> no products being added // 1 -> adding name and category // 2 -> adding image
        productCategories: [
            { name: 'Hot Category', id: 'hotfood' },
            { name: 'Dresses', id: 'dress' },
            { name: 'Hoodies & Sweatshirts', id: 'jackets' },
            { name: 'T-Shirt', id: 'tshirt' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'Socks & Hosiery', id: 'footshit' },
            { name: 'Bottoms', id: 'bottoms' },
            { name: 'Skirts', id: 'skirts' },
            { name: 'Leggings', id: 'leggings' }
        ],
        paymentMethods: [
            { name: 'REQ', image: require('../assets/cryptoIcons/REQ.png') },
            { name: 'ETH', image: require('../assets/cryptoIcons/ETH.png') },
            { name: 'KNC', image: require('../assets/cryptoIcons/KNC.png') },
            { name: 'DGX', image: require('../assets/cryptoIcons/DGX.png') },
            { name: 'DAI', image: require('../assets/cryptoIcons/DAI.png') },
            { name: 'NEO', image: require('../assets/cryptoIcons/NEO.png') }
        ],

        selectedCoin: '',
        newProductCategories: [],
        newProductName: '',
        newProductPrice: '',
        checkout: '', // QR showes the QR screen, "complete" shows the completed Screen
    })
    sale = observable({
        price: 0,
        tax: 0,
        discount: null,
        total: 0,
        soldItems: []
    });

    addProductCateogry(categories) {
        this.business.newProductCategories = categories
    }
    updateCheckoutItems(index, item) {
        // Uh, not super sure why this works but it does
        this.business.checkoutItems.concat().splice(index, 1, item);
    }
    updateSearchProductList(updatedList) {
        console.log("Updated List", updatedList);
        this.business.searchProductList = updatedList;
    }
    addNewProductName(name) {
        this.business.newProductName = name;
    }
    addNewProductPrice(price) {
        this.business.newProductPrice = price;
    }
    changeAddingProductWindow(screen) {
        this.business.addingProduct = screen;
    }
    addProduct(product) {
        this.business.products = this.business.products.concat(product);
        // clear the state of the new product
        this.business.newProductCategories = [];
        this.business.newProductPrice = null;
        this.business.newProductName = "";
    }
    // Called to Pull all the users items into the store
    productDBToState(products) {
        this.business.products = products;
    }

    itemToCheckoutQue(item) {
        console.log("Item from Mobx Store", item);
        const { image, name, price, quantity } = item;
        const product = { image, name, price, quantity: 1 };
        this.business.checkoutItems = this.business.checkoutItems.concat(product);
    }
    removeItemFromCheckoutList(index) {
        const item = this.business.checkoutItems.concat();
        item.splice(index, 1);
        this.business.checkoutItems = item;
    }
    setSelectedCoin(coin) {
        this.business.selectedCoin = coin;
    }
    addSaleDiscount(discount) {
        this.sale.discount = discount;
    }

    addCompletedTransaction(transaction) {
        this.business.completedTransactions = this.business.completedTransactions.concat(transaction);
    }

    updateCheckoutFlow(phase) {
        this.business.checkout = phase;
        setTimeout(() => {
            this.business.checkout = 'complete';
            // Add Axios to update the sold items in DB
            axios.post(`${baseUrl}/transaction`, {
                to: UserStore.user.businessName,
                from: this.business.checkoutClient,
                amount: this.sale.total,
                tax: this.sale.tax,
                discount: this.sale.discount ? this.sale.discount : 0,
                items: this.business.checkoutItems,
                UserId: UserStore.user.userId,
            }).then(txs => {
                this.addCompletedTransaction(txs.data);
            }).catch(err => console.log(err));
        }, 6000);

        setTimeout(() => {
            this.business.checkout = '';
            this.business.selectedCoin = '';
            // Add Items to Store and clear the checkout items 
            this.sale.soldItems = this.sale.soldItems.concat(this.business.checkoutItems);
            this.business.checkoutItems = [];
        }, 10000);

    }

    total() {
        if (this.business.checkoutItems.length > 0) {
            const price = this.business.checkoutItems.reduce((accum, value) => {
                return parseFloat(accum) + (parseFloat(value.price) * parseInt(value.quantity));
            }, 0);
            const tax = parseFloat(price) * 0.08;
            const total = (parseFloat(price) + parseFloat(tax)) - (this.sale.discount !== null ? parseFloat(this.sale.discount) : 0.00);

            this.sale.price = price;
            this.sale.tax = tax;
            this.sale.total = total;
        }
    }

    filterCompletedTransactions = (timePeriod) => {
        const allData = this.business.completedTransactions; 
        const currentYear = DateTime.local().get('year');

        // Filter out data from other years
        const yearData = allData.filter(item => {
            const itemYear = DateTime.fromISO(item.createdAt).get('year');
            return itemYear === currentYear
        });
  
        let result;
        switch(timePeriod) {
            case "Day":
                result = transactionFilter.filterDay(yearData);
                break;
            case "Week":
                result = transactionFilter.filterWeek(yearData);
                break;
            case "Month":
                result = transactionFilter.filterMonth(yearData);
                break;
            case "Year": 
                result = yearData
        }
        console.log("Result", result);
        return result ? result : allData;
    }
}

export default new BusinessStore;