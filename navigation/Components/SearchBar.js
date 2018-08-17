import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { observer, inject } from 'mobx-react';

const {width, height} = Dimensions.get('window');

@inject('store')
@observer
class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue: null,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text>Categories</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder={"Search Products"}
                    onChangeText={(searchValue) => this.setState({searchValue})}
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input:{
        height: 36,
        width: width * .3,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        backgroundColor: '#E5E0EE',
        paddingLeft: 10,
    },
    button: {
        height: 36,
        width: 150,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: '#E5E0EE',
    }
})

export default SearchBar;