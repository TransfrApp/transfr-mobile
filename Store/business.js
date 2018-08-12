import {observable} from 'mobx';

class BusinessStore {
    @observable business = {
        products: [],
        checkoutItems: [],
        addingProduct: 0, // 0 -> no products being added // 1 -> adding name and category // 2 -> adding image
    }
}

export default new BusinessStore;