import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import HomeStack from './HomeStack';
import ShopStack from './ShopStack';
import TabNavigator from './TabNavigator';
import navigationStrings from '../utils/navigationStrings';
import ProfileStack from './ProfileStack';
import HomeScreen from '../screens/HomeScreen';

function HomeTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeStack"
        component={HomeStack}
      />
    </Stack.Navigator>
  );
}

function ShopTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ShopStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopStack"
        component={ShopStack}
      />
    </Stack.Navigator>
  );
}

function VideoTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ShopStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopStack"
        component={ShopStack}
      />
    </Stack.Navigator>
  );
}

function CalendarTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ShopStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopStack"
        component={ShopStack}
      />
    </Stack.Navigator>
  );
}

function MoreTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ShopStack">
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopStack"
        component={ShopStack}
      />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return <TabNavigator />;
}

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (routeName === 'MyCart') {
    return false;
  }

  return true;
}

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name={'BottomTab'} component={BottomTabs} />
      <Drawer.Screen
        name={navigationStrings.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerItemStyle: {height: 0},
        }}
      />

      <Drawer.Screen
        name={'Profile'}
        component={ProfileStack}
        options={{
          title: 'My Account',
          drawerItemStyle: {
            height: 60,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignContent: 'center',
            borderColor: '#aaa',
            borderRadius: 10,
          },
        }}
      />
    </Drawer.Navigator>
  );
}
