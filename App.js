import React, { Component } from 'react';
import { 
  StyleSheet, 
  View 
} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider, connect } from 'react-redux';
import store from './Store';

export default class App extends Component {
  render() {
    return (
     <Provider store={store}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
     </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
