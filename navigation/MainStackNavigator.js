import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/AuthStack/Login.js';
import CreateAccount from '../screens/AuthStack/SignUp.js';
import AccountSetup from '../screens/AuthStack/AccountSetup';

const AuthStack = createStackNavigator({
    AccountSetup: AccountSetup,
    CreateAccount: CreateAccount,
    LoginScreen: LoginScreen,
})
 export default AuthStack;