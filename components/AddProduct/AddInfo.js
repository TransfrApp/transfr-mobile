import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text
 } from 'react-native';
import authStyles from '../../Styles/authStyles';
const {height, width} = Dimensions.get('window');

class AddProductInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      placeholder: null,
    }
  }
  static navigationOptions = {
    title: 'Scan Code',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', width: width * .34, marginTop: 20, justifyContent: 'space-between',}}>
            <Text style={styles.mainText}>Add a new Product</Text>
            <Text style={styles.text}>1/3</Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <TextInput
               placeholder="Name of Product"
                style={authStyles.textInput}
               />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: height * .35,
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
  }
});

export default AddProductInfo;