import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Dimensions,
  Text
} from 'react-native';
import authStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modal';
const { height, width } = Dimensions.get('window');

class AddProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null,
      modalDisplay: false,
      prodCategory: [],
      prodName: '',
      prodPrice: null,
    }
  }
  static navigationOptions = {
    title: 'Scan Code',
  };

  handleSetCategories() {
    this.props.store.BusinessStore.addProductCateogry(this.state.prodCategory.concat());
    this.setState({ modalDisplay: false });
  }

  addCategory(index, item, business) {
    const prodCategory = this.state.prodCategory.concat();
    if (prodCategory.filter(product => product.value === item.value).length) {
      const minusSelectedItem = prodCategory.filter(product => product.value !== item.value);
      this.setState({ prodCategory: minusSelectedItem });
    }
    else {
      const updatedProdCategory = this.state.prodCategory.concat(item);
      this.setState({ prodCategory: updatedProdCategory });
    }
  }

  ifCategoriesExist(business) {
    return this.state.prodCategory.concat().map(item => {
      return <Text>{` ${item.value} `}</Text>
    })
  }

  handleNext() {
    const BusinessStore = this.props.store.BusinessStore;
    BusinessStore.addNewProductName(this.state.prodName);
    BusinessStore.addNewProductPrice(parseFloat(this.state.prodPrice));
    BusinessStore.changeAddingProductWindow(2);
  }

  render() {
    const business = this.props.store.BusinessStore.business;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: width * .34, marginTop: 20, justifyContent: 'space-between', }}>
          <Text style={styles.mainText}>Add a new Product</Text>
          <Text style={styles.text}>1/3</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            placeholder="Name of Product"
            value={this.state.prodName}
            underlineColorAndroid={'transparent'}
            onChangeText={(name) => this.setState({ prodName: name })}
            style={authStyles.textInput} />
          <TextInput
            placeholder="$15"
            value={this.state.prodPrice}
            underlineColorAndroid={'transparent'}
            onChangeText={(price) => this.setState({ prodPrice: price })}
            style={[authStyles.textInput, { marginTop: 10 }]} />
          <View style={{ flexDirection: 'row', width: 300, justifyContent: 'center', alignItems: 'center' }}>
            {this.ifCategoriesExist(business)}
          </View>
          <TouchableOpacity onPress={() => this.setState({ modalDisplay: true })}>
            <Text style={styles.ghostButton}>Select Category</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleNext()} style={[authStyles.login, { marginTop: 20, marginBottom: 20 }]}>
            <Text style={[authStyles.buttonText]}>Next</Text>
          </TouchableOpacity>
        </View>
        <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={this.state.modalDisplay}>
          <View style={styles.modal}>
            <Text style={styles.modalText}>Select Category</Text>
            <FlatList
              data={business.productCategories}
              style={{ height: 200, width: 250 }}
              scrollEnabled={true}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => this.addCategory(index, item, business)}>
                  <Text style={this.checkStyling(item)}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => this.handleSetCategories(business)} style={[authStyles.login, { marginTop: 10, marginBottom: 20 }]}>
              <Text style={authStyles.buttonText}>Set Categories</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  checkStyling(item) {
    if (this.state.prodCategory.includes(item)) {
      return styles.flatListTextActive;
    } else {
      return styles.flatListText;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: height * .35,
    width: width * .35,
    backgroundColor: '#FFF',
    borderRadius: 19,
  },
  mainText: {
    fontSize: 23,
    paddingLeft: 20,
  },
  text: {
    fontSize: 16,
    color: '#B1B5C2',
    paddingRight: 20
  },
  ghostButton: {
    color: '#693CB7',
    fontSize: 20,
    marginTop: 10
  },
  modal: {
    height: 400,
    width: width * .4,
    backgroundColor: 'white',
    borderRadius: 37,
    alignItems: 'center',
  },
  modalText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18
  },
  flatListText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#6D708A',
    paddingTop: 5,
    paddingBottom: 5
  },
  flatListTextActive: {
    fontSize: 18,
    fontWeight: '400',
    color: '#693CB7',
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default inject("store")(observer(AddProductInfo));