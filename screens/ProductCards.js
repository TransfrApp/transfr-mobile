import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../assets/Images.js';
import appStyles from '../constants/Styles.js';
import AddInfo from '../components/AddProduct/AddInfo';
import AddPhoto from '../components/AddProduct/AddPhoto';
const {width, height} = Dimensions.get('window');

import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class ProductCards extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleCardClick(products, index){
        const business = this.props.store.BusinessStore;
        business.itemToCheckoutQue(products[index]);
    }

    displayProducts(){
        const products = this.props.store.BusinessStore.business.products;
       return this.props.store.BusinessStore.business.products.map((item, index) => {
            return(
                <TouchableOpacity onPress={() => this.handleCardClick(products, index)} style={styles.card}>
                    <Image 
                        style={{width: 130, height: 106}}
                        source={{uri: item.image}}/>
                    <Text style={styles.prodName}>{item.name}</Text>
                    <Text style={styles.price}>{`$${item.price}.00`}</Text>
                </TouchableOpacity>
            )
        })
    }

    render(){
        return (
            <View style={{height: height * .85, width: width * .6, paddingLeft: 20}}>
                <Text style={styles.title}>All Products</Text>
                <View style={{flexDirection: 'row'}}>
                    {this.displayProducts()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white', 
        height: 167, 
        width: 130, 
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#6D708A',
        marginLeft: 10
    },
    prodName: {
        fontSize: 16,
        color: '#35313A',
        marginTop: 5,
        marginLeft: 10,
    },
    price: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
    }
});

export default ProductCards;