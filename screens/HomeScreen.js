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
import images from '../assets/Images.js';
import appStyles from '../constants/Styles.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Welcome Home',
    headerRight: (
      <TouchableOpacity>
        <Image style={appStyles.topNavIcon} source={images.plus}/>
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
