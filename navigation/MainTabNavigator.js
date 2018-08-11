import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CodeScanner from '../screens/CodeScanner';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/AuthStack/Login';


const drawer  = createDrawerNavigator ({
  HomeScreen:{
    screen: HomeScreen,
  },
  CodeScanner: {
    screen: CodeScanner,
  }
});

const mainNavigation = createStackNavigator({
  DrawerNavigation: {screen: drawer},
}, {
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#693CB7',
    }
  })
})

export default mainNavigation;
