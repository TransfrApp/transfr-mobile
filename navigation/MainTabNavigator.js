import React from 'react';
import { Platform, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import images from '../assets/Images';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CodeScanner from '../screens/CodeScanner';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/AuthStack/Login';
// Components
import SearchBar from './Components/SearchBar';
import AddProductButton from './Components/AddProductButton';


import MetricsMainPage from "../screens/MetricsDash/MetricsMainPage"


const drawer  = createDrawerNavigator ({
  HomeScreen:{
    screen: HomeScreen,
  },
  CodeScanner: {
    screen: CodeScanner,
  },
  MetricsMainPage: {
    screen: MetricsMainPage
  }
},{
  initialRouteName: 'HomeScreen'
});

const mainNavigation = createStackNavigator({
  DrawerNavigation: {screen: drawer}
}, {
  navigationOptions: ({navigation}) => ({
    headerTitle: <SearchBar/>,
    headerRight: <AddProductButton/>, // This needs to functionality tweaks
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginLeft: 15}}>
        <Image style={{height: 22, width: 32}} source={images.headerLeft}/>
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#693CB7',
    }
  })
})

export default mainNavigation;
