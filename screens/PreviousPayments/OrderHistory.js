import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
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
        console.log("Sold Items", this.props.store.BusinessStore.sale.soldItems);
        return (
            <View style={styles.container}>
                <View style={styles.sales}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.sectionTitle}>Sales Section</Text>
                        <TouchableOpacity style={{marginRight: 20}}>
                            <Text>Select Time Frame</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.products}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sectionTitle}>Products Section</Text>
                    </View>
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
    sectionTitle:{
        fontSize: 19,
        marginTop: 10,
        marginLeft: 20
    }
});

export default OrderHistory;