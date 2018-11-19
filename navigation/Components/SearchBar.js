import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Fuse from 'fuse.js';
import { FontAwesome } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import { observer, inject } from 'mobx-react';

const { width, height } = Dimensions.get('window');

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: null,
            activeCategory: null,
        }
    }

    handleSearch(){
        alert("Need to wire in the search");
    }

    fuzzySearch(searchValue){
        const productList = this.props.store.BusinessStore.business.products;
        const store = this.props.store.BusinessStore;
        const options = {
            keys: ['name']
          };

          const fuse = new Fuse(productList, options)
          let result = fuse.search(searchValue)
          if (this.state.activeCategory) {
              result = result.filter((item) => {
                  return item. meta_tags.name === this.state.activeCategory;
              });
          }
          store.updateSearchProductList(result);
        //   this.searchByCategory(this.state.activeCategory);
    }

    searchByCategory(item){
        const productList = this.props.store.BusinessStore.business.products;
        const store = this.props.store.BusinessStore;
        if (item === 'All') {
            store.updateSearchProductList(productList);
        } else {
            const result = productList.filter((product) => {
                const containsTag = product.meta_tags.map(tag => {
                    if (tag.value === item){
                        return true;
                    }
                });
                if (containsTag.includes(true)) return product;
            });
            store.updateSearchProductList(result);
        }
    }

    render() {
        const sortBy = this.props.store.BusinessStore.business.productCategories;
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Dropdown
                        containerStyle={{ width: 110, height: 36, marginBottom: height * .05 }}
                        dropdownPosition={0}
                        value="Category"
                        textColor={'black'}
                        onChangeText={(item) => this.searchByCategory(item) }
                        data={sortBy}/>
                </View>
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                        style={{ width: width * .25 }}
                        underlineColorAndroid={'transparent'}
                        placeholder={"Search Products"}
                        onChangeText={(searchValue) => this.fuzzySearch(searchValue)} />
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
        width: width * 0.90,
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
        minWidth: 130,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        flexDirection: 'row',
        backgroundColor: '#E5E0EE',
    },
    dropDownButton: {
        width: 90,
        height: 36, // 25
        borderWidth: 2,
        borderColor: '#DBDBDB',
        borderRadius: 4.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 20
    },
})

export default inject("store")(observer(SearchBar));