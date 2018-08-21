import { observable, action, computed } from 'mobx';

class BusinessStore {
    @observable business = {
        products: [
            {
                name: 'Pizza',
                image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86c8c1fd5e9e5b384696472a095c42ac&auto=format&fit=crop&w=1500&q=80',
                price: 20,
                quantity: 1,
            }, {
                name: 'Coffee',
                image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1500&q=80',
                price: 5,
                quantity: 1,
            }, {
                name: 'Dessert',
                image: 'https://images.unsplash.com/photo-1505418640699-b8e61c7273af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e3ee68f6a29882dc092879cd68cb6f12&auto=format&fit=crop&w=1225&q=80',
                price: 7,
                quantity: 1,
            },
        ],
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
        searchProductList: [],
        addingProduct: 0, // 0 -> no products being added // 1 -> adding name and category // 2 -> adding image
        productCategories: [
            {name: 'Hot Category', id: 'hotfood'},
            {name: 'Dresses', id: 'dress'},
            {name: 'Hoodies & Sweatshirts', id:'jackets'},
            {name: 'T-Shirt', id:'tshirt'},
            {name: 'Sweaters', id: 'sweater'},
            {name: 'Socks & Hosiery', id: 'footshit'},
            {name: 'Bottoms', id:'bottoms'},
            {name: 'Skirts', id: 'skirts'},
            {name: 'Leggings', id: 'leggings'}
        ],
        paymentMethods: [
            {name: 'REQ', image: require('../assets/cryptoIcons/REQ.png')},
            {name: 'ETH', image: require('../assets/cryptoIcons/ETH.png')},
            {name: 'KNC', image: require('../assets/cryptoIcons/KNC.png')},
            {name: 'DGX', image: require('../assets/cryptoIcons/DGX.png')},
            {name: 'DAI', image: require('../assets/cryptoIcons/DAI.png')},
            {name: 'NEO', image: require('../assets/cryptoIcons/NEO.png')}
        ],

        selectedCoin: '',
        newProductCategories: [],
        newProductName: '',
        newProductPrice: '',
        checkout: '', // QR showes the QR screen, "complete" shows the completed Screen
    }
    @observable sale = {
        price: 0,
        tax: 0,
        discount: null,
        total: 0,
        soldItems: []
    }
    addProductCateogry(categories){
        this.business.newProductCategories = categories
    }
    updateCheckoutItems(index, item){
        // Uh, not super sure why this works but it does
        this.business.checkoutItems.concat().splice(index, 1, item);
    }
    updateSearchProductList(updatedList){
        console.log("Updated List", updatedList);
        this.business.searchProductList = updatedList;
    }
    addNewProductName(name){
        this.business.newProductName = name;
    }
    addNewProductPrice(price){
        this.business.newProductPrice = price;
    }
    changeAddingProductWindow(screen){
        this.business.addingProduct = screen;
    }
    addProduct(product){
        console.log("Product from Mobx Store",product);
        this.business.products = this.business.products.concat(product);
    }
    itemToCheckoutQue(item){
        console.log("Item from Mobx Store", item);
        this.business.checkoutItems = this.business.checkoutItems.concat(item);
    }
    removeItemFromCheckoutList(index){
        const item = this.business.checkoutItems.concat();
        item.splice(index, 1);
        this.business.checkoutItems = item;
    }
    setSelectedCoin(coin){
        this.business.selectedCoin = coin;
    }
    addSaleDiscount(discount){
        this.sale.discount = discount;
    }
    updateCheckoutFlow(phase){
        this.business.checkout = phase;
        setTimeout(() => { 
           this.business.checkout = 'complete';
        }, 5000);

        setTimeout(() => { 
            this.business.checkout = '';
            this.business.selectedCoin = '';
            this.sale.soldItems = this.sale.soldItems.concat(this.business.checkoutItems);
            this.business.checkoutItems = [];
         }, 15000);

    }
   
    total(){
        if(this.business.checkoutItems.length > 0){
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
}

export default new BusinessStore;