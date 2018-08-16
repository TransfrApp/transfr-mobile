import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AddInfo from '../../components/AddProduct/AddInfo';
import AddPhoto from '../../components/AddProduct/AddPhoto';
import { observer, inject } from 'mobx-react';
import images from '../../assets/Images';

const { width, height } = Dimensions.get('window');

@inject('store')
@observer
class AddProductButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("Props", this.props);
    }
    
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.store.BusinessStore.changeAddingProductWindow(1)}
                style={styles.container}>
                <Text style={styles.plus}>+ </Text>
                <Text style={styles.text}>Add Product</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginRight: 15,
        borderRadius: 16,
        flexDirection: 'row',
        height: 35,
        width: 135,
    },
    text: {
        fontSize: 16,
        color: '#693CB7'
    },
    plus: {
        fontSize: 22,
        color: '#693CB7'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height
    }
})

export default AddProductButton;