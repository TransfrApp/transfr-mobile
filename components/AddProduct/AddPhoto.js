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
import authStyles from '../../Styles/authStyles';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modal';
const { height, width } = Dimensions.get('window');

@inject('store')
@observer
class AddProductPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: width * .34, marginTop: 20, justifyContent: 'space-between', }}>
                    <Text style={styles.mainText}>Add a Photo</Text>
                    <Text style={styles.text}>3/3</Text>
                </View>
                <View>
                    <Image source={require('../../assets/images/image-archive.png')}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        minHeight: height * .55,
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
})
export default AddProductPhoto;