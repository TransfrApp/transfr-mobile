import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Text
 } from 'react-native';


class CodeScanner extends Component {
  static navigationOptions = {
    title: 'Links',
  };

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