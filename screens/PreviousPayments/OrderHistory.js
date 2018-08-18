import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.container}>
               <View style={styles.sales}>
                    <Text>Sales Section</Text>
               </View>
               <View style={styles.products}>
                    <Text>Products Section</Text>
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
    }
});

export default OrderHistory;