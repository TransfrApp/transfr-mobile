import React from 'react';
import { Platform, TouchableOpacity, ImageBackground, View, StyleSheet, Text, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
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


const CustomDrawerContentComponent = (props) => (
  <View>
    <ImageBackground
      style={{ height: 150, width: 320, justifyContent: 'center', alignItems: 'center' }}
      source={require('../assets/images/headerBackground.png')}>
      <Text>Testing the Custom Drawer</Text>
    </ImageBackground>
    <DrawerItems {...props} />
  </View>
)

const drawer = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  CodeScanner: {
    screen: CodeScanner,
  },
  MetricsMainPage: {
    screen: MetricsMainPage
  }
}, {
    initialRouteName: 'HomeScreen',
    contentComponent: CustomDrawerContentComponent
  });

const mainNavigation = createStackNavigator({
  DrawerNavigation: { screen: drawer }
}, {
    navigationOptions: ({ navigation }) => ({
      headerTitle: <SearchBar />,
      headerRight: <AddProductButton />, // This needs some functionality tweaks
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
          <Image style={{ height: 22, width: 32 }} source={images.headerLeft} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#693CB7',
      }
    })
  })

const styles = StyleSheet.create({
  drawerheader: {
    backgroundColor: 'red'
  }
})

export default mainNavigation;
