import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { module as UserModule } from '../Store/user.js';
import { connectStore } from 'redux-box';
import images from '../assets/Images.js';
import appStyles from '../constants/Styles.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Welcome Home',
    headerRight: (
      <TouchableOpacity>
        <Image style={appStyles.topNavIconRight} source={images.plus}/>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
       <Text>Welcome to the home screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...appStyles,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
