import React from 'react';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from './MainStackNavigator';

export default createSwitchNavigator({
  Auth: AuthStack,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'Auth',
});