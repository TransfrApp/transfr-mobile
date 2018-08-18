import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { observer, inject } from 'mobx-react';

const { width, height } = Dimensions.get('window');

@inject('store')
@observer
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
        }
    }

    handleSearch(){
        alert("Need to wire in the search");
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text>Categories </Text>
                    <FontAwesome name="angle-down" size={20} color="black" />
                </TouchableOpacity>
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ width: width * .25 }}
                        underlineColorAndroid={'transparent'}
                        placeholder={"Search Products"}
                        onChangeText={(searchValue) => this.setState({ searchValue })} />
                    <TouchableOpacity onPress={() => this.handleSearch()}>
                        <FontAwesome name="search" size={20} color="grey" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: width * 0.90
    },
    input: {
        height: 36,
        width: width * .3,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        backgroundColor: '#E5E0EE',
        paddingLeft: 10,
    },
    button: {
        height: 36,
        width: 120,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        flexDirection: 'row',
        backgroundColor: '#E5E0EE',
    }
})

export default SearchBar;