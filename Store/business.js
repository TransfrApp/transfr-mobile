import { observable, action } from 'mobx';

class BusinessStore {
    @observable business = {
        products: [
            {
                name: 'Pizza',
                image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86c8c1fd5e9e5b384696472a095c42ac&auto=format&fit=crop&w=1500&q=80',
                price: 20
            }, {
                name: 'Coffee',
                image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1500&q=80',
                price: 5,
            }, {
                name: 'Dessert',
                image: 'https://images.unsplash.com/photo-1505418640699-b8e61c7273af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e3ee68f6a29882dc092879cd68cb6f12&auto=format&fit=crop&w=1225&q=80',
                price: 7,
            }
        ],
        checkoutItems: [
            {
                name: 'Coffee',
                image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c29572a9d10e1903398a9448e1e962ed&auto=format&fit=crop&w=1500&q=80',
                price: 5,
            }, {
                name: 'Dessert',
                image: 'https://images.unsplash.com/photo-1505418640699-b8e61c7273af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e3ee68f6a29882dc092879cd68cb6f12&auto=format&fit=crop&w=1225&q=80',
                price: 7,
            }
        ],
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
        newProductCategories: [],
        newProductName: '',
    }
    addProductCateogry(categories){
        this.business.newProductCategories = categories
    }
    addNewProductName(name){
        this.business.newProductName = name;
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
}

export default new BusinessStore;