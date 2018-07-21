import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/AuthStack/Login.js';
import CreateAccount from '../screens/AuthStack/SignUp.js';

const AuthStack = createStackNavigator({
    LoginScreen: LoginScreen,
    CreateAccount: CreateAccount,
})
 export default AuthStack;