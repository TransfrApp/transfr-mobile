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
import ProductCard from './ProductCards';

const { width, height } = Dimensions.get('window');

import { observer, inject } from 'mobx-react';
import { FlatList } from '../node_modules/react-native-gesture-handler';

@inject('store')
@observer
class CheckoutList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    removeItem(index) {
        const BusinessStore = this.props.store.BusinessStore;
        BusinessStore.removeItemFromCheckoutList(index)
    }
    divider() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.divider} />
            </View>
        )
    }

    renderCheckoutList() {
        const business = this.props.store.BusinessStore.business;

        return (
            <FlatList
                data={business.checkoutItems}
                style={{ height: height * .48 }}
                scrollEnabled={true}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                    <View style={styles.listItem}>
                        <Image
                            style={{ height: 60, width: 72 }}
                            source={{ uri: item.image }} />
                        <View style={{ justifyContent: 'space-around', marginLeft: 10 }}>
                            <Text style={{ fontSize: 14 }}>{item.name}</Text>
                            <Text>incrementer here</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: width * .06 }}>
                            <Text style={{ fontSize: 14 }}>{`$${item.price}`}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: width * .06 }}>
                            <TouchableOpacity onPress={() => this.removeItem(index)}>
                                <Image
                                    style={{ height: 23, width: 15 }}
                                    source={require('../assets/images/trash-can.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    {this.renderCheckoutList()}
                </View>
                {this.divider()}
                <View style={styles.totals}>
                    <View>
                        <Text style={[styles.text, styles.pricePadding]}>Subtotal</Text>
                        <Text style={[styles.smallText, styles.pricePadding]}>Tax</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>$45.00</Text>
                        <Text style={[styles.smallText, {textAlign: 'right'}]}>$4.00</Text>
                    </View>
                </View>
                {this.divider()}
                <View style={styles.totals}>
                    <Text style={[styles.text, {paddingRight: 40}]}>Total</Text>
                    <Text style={styles.text}>$49.00</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                    <TouchableOpacity style={styles.discountButton}>
                        <Text style={{fontSize: 16, color:  '#6532BD'}}>Discount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={{fontSize: 16, color: 'white'}}>Select Payment Method</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height * .8
    },
    list: {
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },
    listItem: {
        width: width * .3,
        height: 60,
        flexDirection: 'row',
        marginTop: 10,
    },
    totals: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: width * .28,
        paddingTop: 5,
        paddingBottom: 5
    },
    divider: {
        borderWidth: 1,
        borderColor: '#707070',
        width: width * .28
    },
    text: {
        fontSize: 16,
    },
    smallText: {
        fontSize: 12,
    },
    pricePadding: {
        paddingRight: 15
    },
    discountButton: {
        width: width * .28,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6532BD',
        borderRadius: 10
    },
    checkoutButton: {
        width: width * .28,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6532BD',
        borderRadius: 10,
        backgroundColor: '#6532BD',
        marginTop: 10,
    }
})

export default CheckoutList;