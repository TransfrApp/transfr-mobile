import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Image,
    Dimensions,
    Text
} from 'react-native';
import axios from 'axios';
import baseUrl from '../../request-config';
import authStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';
import { ImagePicker } from 'expo'
const { height, width } = Dimensions.get('window');

class AddProductPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit() {
        const image = 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74ac7c1aa35dc36f50cc1ac7517c70a7&auto=format&fit=crop&w=1350&q=80'
        const name = this.props.store.BusinessStore.business.newProductName;
        const price = parseFloat(this.props.store.BusinessStore.business.newProductPrice);
        const userId = this.props.store.UserStore.user.userId;
        const item = {
            image,
            name,
            quantity: 1,
            price,
        }
        console.log("Item", item);
        console.log("Type of Price", typeof (price), price);
        console.log("User Id", userId);
        axios.post(`${baseUrl}/inventory`, {
            name,
            price: price,
            quantity: 1,
            user_id: userId,
            meta_tags: { tag: 'food' }
        }).then((res) => {
            this.props.store.BusinessStore.addProduct(item);
            this.props.store.BusinessStore.changeAddingProductWindow(0);
            console.log("Item Store", this.props.store.BusinessStore.business.products);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: width * .34, marginTop: 20, justifyContent: 'space-between', }}>
                    <Text style={styles.mainText}>Add a Photo</Text>
                    <Text style={styles.text}>3/3</Text>
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity>
                        <Image style={styles.image} source={require('../../assets/images/image-archive.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.handleSubmit()} style={authStyles.login}>
                        <Text style={authStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
    imageContainer: {
        minHeight: height * .2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: 30,
        height: 100,
        width: 100,
    },
    buttonContainer: {
        height: height * .12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20

    }
})
export default inject("store")(observer(AddProductPhoto));