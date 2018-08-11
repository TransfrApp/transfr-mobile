import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginScreen from '../screens/AuthStack/Login.js';
import CreateAccount from '../screens/AuthStack/SignUp.js';
import AccountSetup from '../screens/AuthStack/AccountSetup';

const commonNavigationOptions = {
    headerStyle:{ 
        position: 'absolute', 
        backgroundColor: 'transparent', 
        zIndex: 100, 
        top: 0, 
        left: 0, 
        right: 0, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '500'
    },
    headerTintColor: 'white',
}

const AuthStack = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: commonNavigationOptions
    },
    AccountSetup: {
        screen: AccountSetup,
        navigationOptions: commonNavigationOptions
    },
    CreateAccount: {
        screen: CreateAccount,
        navigationOptions: commonNavigationOptions
    }
})
 export default AuthStack;