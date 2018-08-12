import { observable, action } from 'mobx';

class BusinessStore {
    @observable business = {
        products: [],
        checkoutItems: [],
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
        this.business.products = this.business.products.push(product);
    }
}

export default new BusinessStore;