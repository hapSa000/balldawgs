import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../utils/navigationStrings';
// import HomeScreen from '../screens/HomeScreen';
import HomeStack from './HomeStack';
import ShopStack from '../navigation/ShopStack';
import VideoScreen from '../screens/VideoScreen';
import CalenderScreen from '../screens/CalenderScreen';
import MoreScreen from '../screens/MoreScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === navigationStrings.HOME_STACK) {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === navigationStrings.SHOP_STACK) {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === navigationStrings.VIDEO_SCREEN) {
            iconName = focused ? 'youtube-play' : 'youtube-play';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === navigationStrings.CALENDER_SCREEN) {
            iconName = focused ? 'calendar-alt' : 'calendar-alt';
          } else if (route.name === navigationStrings.MORE_SCREEN) {
            iconName = focused
              ? 'dots-three-horizontal'
              : 'dots-three-horizontal';
            return <Entypo name={iconName} size={size} color={color} />;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        labelStyle: {paddingBottom: 10, fontSize: 10},
        tabBarItemStyle: {
          padding: 5,
          height: 55,
          backgroundColor: '#C2C2C2',
        },
      })}>
      <Tab.Screen
        name={navigationStrings.HOME_STACK}
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name={navigationStrings.SHOP_STACK}
        component={ShopStack}
        options={{title: 'Shop'}}
      />
      <Tab.Screen
        name={navigationStrings.VIDEO_SCREEN}
        component={VideoScreen}
        options={{title: 'Videos'}}
      />
      <Tab.Screen
        name={navigationStrings.CALENDER_SCREEN}
        component={CalenderScreen}
        options={{title: 'Calender'}}
      />
      <Tab.Screen
        name={navigationStrings.MORE_SCREEN}
        component={MoreScreen}
        options={{title: 'More'}}
      />
    </Tab.Navigator>
  );
}
