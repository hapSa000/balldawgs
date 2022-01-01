import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationStrings from '../utils/navigationStrings';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Drawer = createDrawerNavigator();

export default function ProfileStack() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name={navigationStrings.HOME_SCREEN}
        component={HomeScreen}
      />

      <Drawer.Screen
        name={navigationStrings.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <Drawer.Screen
        name={navigationStrings.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </Drawer.Navigator>
  );
}
