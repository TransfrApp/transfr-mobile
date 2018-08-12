import React from 'react';
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
const {width, height} = Dimensions.get('window');

import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Welcome Home',
    headerRight: (
      <TouchableOpacity>
        <Image style={appStyles.topNavIconRight} source={images.plus}/>
      </TouchableOpacity>
    )
  };

  constructor(props){
    super(props);
    this.state = {
      drawerActive: false,
      products: [],
    }
  }
  
  checkoutList(){
    if (this.state.products.length === 0){
      return (
        <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: height * .3}}>
          <Text style={[styles.mainText]}>No Product Selected</Text>
          <Text style={[styles.mainText, {paddingLeft: 10, paddingRight: 10, textAlign: 'center'}]}>Please select from the product list</Text>
        </View>
      )
    } else {
      return;
    }
  }

  addProduct(business){
    if(business.addingProduct === 0){
      return(
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.mainText}>You have no Products</Text>
          <Text style={styles.text}>Click "Add Product" below to get started</Text>
          <TouchableOpacity onPress={() => business.addingProduct = 1} style={styles.addProduct}>
           <Text style={{fontSize:93, color: '#B1B5C2'}}>+</Text>
           <Text style={styles.mainText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (business.addingProduct === 1) {
        return(
          <View>
            <AddInfo/>
          </View>
        )
    }
    else if(business.addingProduct === 3){
      return;
    }
  }

  render() {
    const business = this.props.store.BusinessStore.business;

    return (
      <View style={styles.container}>
        <View style={styles.products}>
          {this.addProduct(business)}
        </View>
        <View style={styles.checkout}>
          <View style={styles.checkoutContainer}>
            <Text style={styles.checkoutTitle}>Current Checkout</Text>
           {this.checkoutList()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FB'
  },
  products: {
    width: width *.65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addProduct: {
    height: 200,
    width: 200,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19,
  },
  mainText: {
    fontSize: 20,
    color: '#B1B5C2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#B1B5C2',
    paddingTop: 10,
    paddingBottom: 20,
  },
  checkout:{
    width: width * .35,
  },
  checkoutContainer: {
    backgroundColor: 'white',
    height: height * .85,
    width: width * .32,
    flexDirection: 'column'
  },
  checkoutTitle: {
    textAlign: 'center', 
    fontSize: 19, 
    justifyContent: 'flex-start',
    paddingTop: 10,
    color: '#6D708A',
  }
});
