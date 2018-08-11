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
import { module as UserModule } from '../Store/user.js';
import { connectStore } from 'redux-box';
import images from '../assets/Images.js';
import appStyles from '../constants/Styles.js';

const {width, height} = Dimensions.get('window');

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
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.products}>
          <Text style={styles.mainText}>You have no Products</Text>
          <Text style={styles.text}>Click "Add Product" below to get started</Text>
          <TouchableOpacity style={styles.addProduct}>
           <Text style={{fontSize:93, color: '#B1B5C2'}}>+</Text>
           <Text style={styles.mainText}>Add Product</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkout}>
          <View style={styles.checkoutContainer}>
            <Text style={styles.checkoutTitle}>Current Checkout</Text>
            <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: height * .3}}>
              <Text style={styles.mainText}>No Product Selected</Text>
              <Text style={styles.mainText}>Please select from the product list</Text>
            </View>
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
    height: height * .87,
    width: width * .3,
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
