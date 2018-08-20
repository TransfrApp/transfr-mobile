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

const { height, width } = Dimensions.get('window');

@inject('store')
@observer
class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let sortBy = ['Day', 'Week', 'Month', 'Year'];
       const productHistory = mockData.productHistory;
       const salesHistory = mockData.salesHistory;
        console.log("Sold Items", this.props.store.BusinessStore.sale.soldItems);
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
                    <FlatList
                        data={salesHistory}
                        scrollEnabled={true}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 10}}>
                                <Text style={[styles.salesHistoryDataFormat,{color: '#454974', fontSize: 13, fontWeight: '200'}]}>{index + 1}</Text>
                                <Text style={[styles.salesHistoryDataFormat,{color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.subtotal}</Text>
                                <Text style={[styles.salesHistoryDataFormat,{color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.discount}</Text>
                                <Text style={[styles.salesHistoryDataFormat,{color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.tax}</Text>
                                <Text style={[styles.salesHistoryDataFormat,{color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.totalPrice}</Text>
                            </View>
                        )}
                    />
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
                    <FlatList
                        data={productHistory}
                        scrollEnabled={true}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginTop: 10}}>
                                <Text style={[styles.prodHistoryDataFormat, {color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.productName}</Text>
                                <Text style={[styles.prodHistoryDataFormat, {color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.date}</Text>
                                <Text style={[styles.prodHistoryDataFormat, {color: '#454974', fontSize: 13, fontWeight: '200'}]}>{item.price}</Text>
                            </View>
                        )}
                    />
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
        marginTop:30,
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

export default OrderHistory;