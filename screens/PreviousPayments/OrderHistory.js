import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { FontAwesome } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import mockData from '../../Store/mockSalesData';
import moment from 'moment';

const { height, width } = Dimensions.get('window');

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSwitchSalesUI(salesHistory) {
        console.log("Sales History in Switch UI", salesHistory);
        if (salesHistory.length > 0) {
            return (
                <FlatList
                    data={salesHistory}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 10 }}>
                            <Text style={[styles.salesHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{item.id}</Text>
                            <Text style={[styles.salesHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{`$${(item.amount - item.tax).toFixed(2)}`}</Text>
                            <Text style={[styles.salesHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{`$${item.discount ? item.discount.toFixed(2) : item.discount}`}</Text>
                            <Text style={[styles.salesHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{`$${item.tax ? item.tax.toFixed(2) : item.tax}`}</Text>
                            <Text style={[styles.salesHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{`$${item.amount ? item.amount.toFixed(2) : item.amount}`}</Text>
                        </View>
                    )}
                />
            )
        } else {
            return (
                <View style={{ height: height * .6, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>There Are No Transactions Yet</Text>
                    <Text style={{ fontSize: 20, marginTop: 30, fontWeight: 'bold' }}>After Selling an Item you will be able to track it here</Text>
                </View>
            )
        }
    }

    handleSwitchProductUI(productHistory, salesHistory) {
        console.log("Transactions Complete", JSON.stringify(salesHistory, null, 4));
        let date;
        if (salesHistory.length > 0) {
            return salesHistory.map(transaction => {
                date = transaction.createdAt;
                return transaction.items.map(item => {
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 10 }}>
                            <Text style={[styles.prodHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{item.name}</Text>
                            <Text style={[styles.prodHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{moment(date).fromNow()}</Text>
                            <Text style={[styles.prodHistoryDataFormat, { color: '#454974', fontSize: 13, fontWeight: '200' }]}>{`$${parseFloat(item.price)}`}</Text>
                        </View>
                    )
                })
            });
        } else {
            return (
                <View style={{ height: height * .6, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>There Are No Transactions Yet</Text>
                    <Text style={{ fontSize: 20, marginTop: 30, fontWeight: 'bold' }}>After Selling an Item you will be able to track it here</Text>
                </View>
            )
        }
    }

    render() {
        let sortBy = ['Day', 'Week', 'Month', 'Year'];
        // Mock Sales Data
        const productHistory = mockData.productHistory;
        const mockSalesHistory = mockData.salesHistory;
        // Actual Sales Data
        const salesHistory = this.props.store.BusinessStore.business.completedTransactions;
        return (
            <View style={styles.container}>
                <View style={styles.sales}>
                    <View style={styles.mainCardHeader}>
                        <Text style={styles.sectionTitle}>Sales History</Text>
                        <TouchableOpacity style={styles.dropDownButton}>
                            <Text>Weekly</Text>
                            <FontAwesome name="caret-down" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataHeader}>
                        <Text style={styles.salesHistoryDataFormat}>Receipt No.</Text>
                        <Text style={styles.salesHistoryDataFormat}>Subtotal</Text>
                        <Text style={styles.salesHistoryDataFormat}>Discount</Text>
                        <Text style={styles.salesHistoryDataFormat}>Tax</Text>
                        <Text style={styles.salesHistoryDataFormat}>Total Price</Text>
                    </View>
                    {/* 
                    // Sales History Section Begins Here
                    */}
                    {this.handleSwitchSalesUI(salesHistory)}
                </View>
                <View style={styles.products}>
                    <View style={styles.mainCardHeader}>
                        <Text style={styles.sectionTitle}>Products Sold</Text>
                        <TouchableOpacity style={styles.dropDownButton}>
                            <Text>Weekly</Text>
                            <FontAwesome name="caret-down" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataHeader}>
                        <Text style={styles.prodHistoryDataFormat}>Product Name</Text>
                        <Text style={styles.prodHistoryDataFormat}>Date & Time</Text>
                        <Text style={styles.prodHistoryDataFormat}>Price</Text>
                    </View>
                    {/* 
                    // Product Sales History Starts Here
                    */}
                    {this.handleSwitchProductUI(productHistory, salesHistory)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height * .9,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#F5F9FB'
    },
    mainCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dataHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    salesHistoryDataFormat: {
        width: width * .09,
        textAlign: 'center'
    },
    prodHistoryDataFormat: {
        width: width * .15,
        textAlign: 'center'
    },
    dropDownButton: {
        width: 110,
        height: 25,
        backgroundColor: '#F5F9FB',
        borderWidth: 2,
        borderColor: '#DBDBDB',
        borderRadius: 4.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 20
    },
    sales: {
        height: height * .85,
        width: width * .45,
        backgroundColor: '#FFF',
        borderRadius: 16,
    },
    products: {
        height: height * .85,
        width: width * .45,
        backgroundColor: '#FFF',
        borderRadius: 16,
    },
    sectionTitle: {
        fontSize: 19,
        marginTop: 10,
        marginLeft: 20
    }
});

export default inject("store")(observer(OrderHistory));