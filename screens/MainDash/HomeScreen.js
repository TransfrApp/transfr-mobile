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
import images from '../../assets/Images.js';
import appStyles from '../../constants/Styles.js';
import AddInfo from '../../components/AddProduct/AddInfo.js';
import AddPhoto from '../../components/AddProduct/AddPhoto.js';
import ProductCard from './ProductCards.js';
import CheckoutList from './CheckoutList.js';
import AddProductButton from '../../navigation/Components/AddProductButton.js';
import { FontAwesome } from '@expo/vector-icons';
import SearchBar from '../../navigation/Components/SearchBar.js';
import QRCode from 'react-native-qrcode';

const { width, height } = Dimensions.get('window');

import { observer, inject } from 'mobx-react';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: <SearchBar />,
      headerRight: <AddProductButton />,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
      products: [],
    }
  }

  componentDidMount = () => {
    console.log("Store", this.props.store);
  }

  checkoutList() {
    const business = this.props.store.BusinessStore.business;
    const walletAddress = this.props.store.UserStore.user.walletAddress;
    if (business.checkoutItems.length === 0) {
      return (
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: height * .3 }}>
          <Text style={[styles.mainText, { paddingLeft: 10, paddingRight: 10, textAlign: 'center' }]}>No Product Selected</Text>
          <Text style={[styles.mainText, { paddingLeft: 10, paddingRight: 10, textAlign: 'center' }]}>Please select from the product list</Text>
        </View>
      )
    } if (business.checkout === 'QR') {
      return (
        <View style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: height * .2 }}>
          {/* <Image style={{ height: 209, width: 209 }} source={require('../../assets/images/qrCode.png')} /> */}
          <QRCode
            value={walletAddress}
            size={209}
            bgColor={'#693CB7'}
            fgColor={"white"}/>
          <Text style={[styles.mainText, { marginTop: 60, paddingLeft: 10, paddingRight: 10, textAlign: 'center' }]}>Show the customer the QR code so they can complete the payment</Text>
          <TouchableOpacity onPress={() => this.props.store.BusinessStore.updateCheckoutFlow('')}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: '#693CB7', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View>
          <CheckoutList />
        </View>
      )
    }
  }

  addProduct(business) {
    const BusinessStore = this.props.store.BusinessStore;
    const addProduct = BusinessStore.business.addingProduct;
    if (BusinessStore.business.products.length > 0 && addProduct === 0) {
      return (
        <View style={styles.activeProduct}>
          <ProductCard />
        </View>
      )
    }
    else if (business.addingProduct === 0 && BusinessStore.business.products.length === 0) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.mainText}>You have no Products</Text>
          <Text style={styles.text}>Click "Add Product" below to get started</Text>
          <TouchableOpacity onPress={() => BusinessStore.changeAddingProductWindow(1)} style={styles.addProduct}>
            <Text style={{ fontSize: 93, color: '#B1B5C2' }}>+</Text>
            <Text style={styles.mainText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (business.addingProduct === 1) {
      return (
        <View>
          <AddInfo />
        </View>
      )
    }
    else if (business.addingProduct === 2) {
      return (
        <View>
          <AddPhoto />
        </View>
      )
    }
  }

  handleTitleSwitch(business) {
    if (business.checkout === 'complete') {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10 }}>
          <FontAwesome name="check-circle" size={40} color="#5AC93F" />
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Text style={styles.completedTitle}>Great Success</Text>
            <Text style={styles.completedText}>You're payment went through</Text>
            <Text style={styles.completedText}>without a hitch!</Text>
          </View>
        </View>
      )
    } else {
      return (
        <Text style={styles.checkoutTitle}>Current Checkout</Text>
      )
    }
  }

  render() {
    const business = this.props.store.BusinessStore.business;
    const productList = this.props.store.BusinessStore.business.products.length;

    return (
      <View style={styles.container}>
        <View style={styles.products}>
          {this.addProduct(business)}
        </View>
        <View style={styles.checkout}>
          <View style={styles.checkoutContainer}>
            {this.handleTitleSwitch(business)}
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
    backgroundColor: '#F5F9FB',
  },
  products: {
    width: width * .65,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  activeProduct: {
    alignItems: 'flex-start',
    width: width * .65,
    height: height * .85,
    flexWrap: 'wrap',
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
  checkout: {
    width: width * .35,
  },
  checkoutContainer: {
    backgroundColor: 'white',
    minHeight: height * .85,
    width: width * .32,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 6 },
    // shadowRadius: 5,
    // shadowOpacity: .37
  },
  checkoutTitle: {
    textAlign: 'center',
    fontSize: 19,
    justifyContent: 'flex-start',
    paddingTop: 10,
    color: '#6D708A',
  },
  completedText: {
    color: '#5AC93F',
    fontSize: 15,
    flexWrap: 'wrap'
  },
  completedTitle: {
    color: '#5AC93F',
    fontSize: 20
  }
});

export default inject("store")(observer(HomeScreen));
