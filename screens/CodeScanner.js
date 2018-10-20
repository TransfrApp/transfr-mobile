import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text
 } from 'react-native';
 import UserLocation from '../Service/Location.js';

class CodeScanner extends Component {
  constructor(props){
    super(props);
    this.state = {
      placeholder: null,
    }
  }
  static navigationOptions = {
    title: 'Scan Code',
  };
  componentDidMount(){
   this.props.user.syncFromDb();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Insert the Bar Code Scanner here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
});

export default CodeScanner;