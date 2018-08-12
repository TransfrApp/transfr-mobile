import {observable} from 'mobx';

class BusinessStore {
    @observable business = {
        products: [],
        checkoutItems: [],
        addingProduct: 2, // 0 -> no products being added // 1 -> adding name and category // 2 -> adding image
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
        this.newProductCategories = categories
    }
    addNewProductName(name){
        this.newProductName = name;
    }
    changeAddingProductWindow(screen){
        this.addingProduct = screen;
    }
}

export default new BusinessStore;