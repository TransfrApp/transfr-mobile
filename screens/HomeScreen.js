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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Welcome Home',
    headerRight: (
      <TouchableOpacity>
        <Image source="../assets/images/plus-icon.png"/>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
