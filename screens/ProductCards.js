import React, { Component } from 'react';
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
const { width, height } = Dimensions.get('window');
import { FontAwesome } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class ProductCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: false,
        }
    }

    handleCardClick(products, index) {
        const business = this.props.store.BusinessStore;
        business.itemToCheckoutQue(products[index]);
        this.props.store.BusinessStore.total();
    }

    handleSearchCardClick(index){
        const searchProducts = this.props.store.BusinessStore.business.searchProductList;
        const business = this.props.store.BusinessStore;

        business.itemToCheckoutQue(searchProducts[index]);
        this.props.store.BusinessStore.total();
    }

    displayProducts() {
        const list = this.state.listView;
        const products = this.props.store.BusinessStore.business.products;
        const search = this.props.store.BusinessStore.business.searchProductList;
        console.log(search);
        if (search.length > 0) {
            return search.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => this.handleSearchCardClick(index)} style={list ? styles.wideCard : styles.card}>
                        <Image
                            style={list ? styles.wideCardImage : styles.cardImage}
                            source={{ uri: item.image }} />
                        <Text style={list ? styles.prodNameWideCard : styles.prodName}>{item.name}</Text>
                        <Text style={list ? styles.priceWideCard : styles.price}>{`$${item.price}.00`}</Text>
                    </TouchableOpacity>
                )
            })
        } else if (search.length === 0) {
            return products.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => this.handleCardClick(products, index)} style={list ? styles.wideCard : styles.card}>
                        <Image
                            style={list ? styles.wideCardImage : styles.cardImage}
                            source={{ uri: item.image }} />
                        <Text style={list ? styles.prodNameWideCard : styles.prodName}>{item.name}</Text>
                        <Text style={list ? styles.priceWideCard : styles.price}>{`$${item.price}.00`}</Text>
                    </TouchableOpacity>
                )
            })
        }
    }

    toggleIcon() {
        if (!this.state.listView) {
            return (
                <TouchableOpacity onPress={() => this.setState({ listView: !this.state.listView })}>
                    <FontAwesome style={{ marginRight: 40 }} name="bars" size={20} color="grey" />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.setState({ listView: !this.state.listView })}>
                    <FontAwesome style={{ marginRight: 40 }} name="th-large" size={20} color="grey" />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={{ height: height * .85, width: width * .64, paddingLeft: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>All Products</Text>
                    {this.toggleIcon()}
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.displayProducts()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        height: 167,
        width: 130,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: .7
    },
    wideCard: {
        backgroundColor: 'white',
        height: 75,
        width: width * .57,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        flexDirection: 'row',
        shadowRadius: 5,
        shadowOpacity: .7
    },
    prodNameWideCard: {
        fontSize: 16,
        color: '#35313A',
        marginRight: width * .20,
        width: 200,
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    priceWideCard: {
        fontSize: 14,
        marginTop: 10,
        marginRight: 10,
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    cardImage: {
        width: 130,
        height: 106
    },
    wideCardImage: {
        height: 75,
        width: 75,
        justifyContent: 'flex-start'
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
        numberOfLines: 1,
        ellipsizeMode: 'tail',
    },
    price: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10,
    }
});

export default ProductCards;