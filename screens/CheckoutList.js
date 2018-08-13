import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    TextInput,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

import { observer, inject } from 'mobx-react';
import { FlatList } from '../node_modules/react-native-gesture-handler';
import authStyles from '../Styles/authStyles.js';

@inject('store')
@observer
class CheckoutList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            tax: 0,
            total: 0,
            discount: null,
            displayModal: false,
            displayPaymentModal: false
        }
    }

    componentDidMount() {
        this.reducePrices();
    }

    removeItem(index) {
        const BusinessStore = this.props.store.BusinessStore;
        BusinessStore.removeItemFromCheckoutList(index);
        this.reducePrices();
    }
    divider() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.divider} />
            </View>
        )
    }

    addDiscount() {
        this.reducePrices();
        this.setState({ displayModal: false })
    }

    // We should move this to the Mobx store as a computed property
    reducePrices() {
        const business = this.props.store.BusinessStore.business.checkoutItems;
        if (business.length > 0) {

            const price = business.reduce((accum, value) => {
                return accum + value.price;
            }, 0);

            const tax = price * .08;
            const total = (parseFloat(price) + parseFloat(tax)) - (this.state.discount !== null ? parseFloat(this.state.discount) : 0.00);

            this.setState({ price, total, tax });
        }
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

    displayDiscount() {
        if (this.state.discount !== null) {
            return <Text style={[styles.text, styles.pricePadding]}>Discount</Text>
        }
    }
    displayDiscountValue() {
        if (this.state.discount !== null) {
            return <Text style={styles.text}>{`-$${this.state.discount}`}</Text>
        }
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
                        {this.displayDiscount()}
                        <Text style={[styles.smallText, styles.pricePadding]}>Tax</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{`$${this.state.price}.00`}</Text>
                        {this.displayDiscountValue()}
                        <Text style={[styles.smallText, { textAlign: 'right' }]}>{`$${this.state.tax}`}</Text>
                    </View>
                </View>
                {this.divider()}
                <View style={styles.totals}>
                    <Text style={[styles.text, { paddingRight: 40 }]}>Total</Text>
                    <Text style={styles.text}>{`$${(this.state.total).toFixed(2)}`}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => this.setState({ displayModal: true })} style={styles.discountButton}>
                        <Text style={{ fontSize: 16, color: '#6532BD' }}>Discount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ displayPaymentModal: true })} style={styles.checkoutButton}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Select Payment Method</Text>
                    </TouchableOpacity>
                </View>
                {this.discountModal()}
                <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={this.state.displayPaymentModal}>
                    <View style={styles.modal}>
                        <Text>Select Payment Method Modal</Text>
                        {this.selectPaymentModal()}
                    </View>
                </Modal>
            </View>
        )
    }

    discountModal() {
        return (
            <Modal style={{ justifyContent: 'center', alignItems: 'center' }} isVisible={this.state.displayModal}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Add Discount</Text>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={this.state.discount}
                        onChangeText={(discount) => this.setState({ discount })}
                        placeholder="$15.00"
                        style={authStyles.textInput} />
                    <View style={{ height: 100, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.addDiscount()} style={styles.checkoutButton}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Add Discount</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', fontSize: 16, alignItems: 'center', paddingTop: 20 }}>
                        <TouchableOpacity onPress={() => this.setState({ displayModal: false })}>
                            <Text style={{ color: '#6532BD' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    selectPaymentModal() {
        const business = this.props.store.BusinessStore.business;
        const BusinessStore = this.props.store.BusinessStore;

       return business.paymentMethods.map((coin, index) => {
            return(
                <TouchableOpacity 
                    onPress={() => BusinessStore.setSelectedCoin(coin.name)} 
                    style={business.selectedCoin === coin.name ? styles.selectedCoinContainer : styles.coinContainer}>
                    <Image style={{height: 25, width: 25}} source={coin.image}/>
                    <Text>{coin.name}</Text>
                </TouchableOpacity>
            )
        })
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
    },
    modal: {
        height: 400,
        width: width * .4,
        backgroundColor: 'white',
        borderRadius: 37,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 23,
        marginTop: 20,
        marginBottom: 40,
    },
    coinContainer: {
        flexDirection: 'row',
        width: width * .2,
        borderWidth: 2,
        borderColor: '#CBCBCB',
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50
    },
    selectedCoinContainer: {
        flexDirection: 'row',
        width: width * .2,
        borderWidth: 2,
        borderColor: '#6532BD',
        borderRadius: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50
    }
})

export default CheckoutList;