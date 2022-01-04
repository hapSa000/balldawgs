import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../utils/navigationStrings';
import Login from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const ShopStackNavigator = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <ShopStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <ShopStackNavigator.Screen
        name={navigationStrings.LOGIN_SCREEN}
        component={Login}
      />
      <ShopStackNavigator.Screen
        name={navigationStrings.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </ShopStackNavigator.Navigator>
  );
}
