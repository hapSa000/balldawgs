import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import navigationStrings from '../utils/navigationStrings';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={navigationStrings.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          name={navigationStrings.TAB_NAVIGATOR}
          component={TabNavigator}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
