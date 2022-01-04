import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import navigationStrings from '../utils/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import TabNavigator from './TabNavigator';
import AppStack from './Appstack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return <AppStack />;
}
