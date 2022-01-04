import React from 'react';
import {View, Text, Alert} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationStrings from '../utils/navigationStrings';
import HomeScreen from '../screens/HomeScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Drawer = createDrawerNavigator();

function LogoutNavigator() {
  Alert.alert(
    'Log out',
    'Do you want to logout?',
    [
      {
        text: 'Cancel',
        onPress: () => {
          return null;
        },
      },
      {text: 'Confirm', onPress: () => {}},
    ],
    {cancelable: false},
  );

  return null;
}
const Stack = createNativeStackNavigator();
export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={navigationStrings.HOME_SCREEN}>
      <Stack.Screen
        options={{headerShown: false}}
        name={navigationStrings.HOME_SCREEN}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
