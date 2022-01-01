import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationStrings from '../utils/navigationStrings';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function HomeStack() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name={navigationStrings.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerItemStyle:{height: 0}
        }}

      />

<Drawer.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          title: 'My Account',
          drawerItemStyle:{height: 60,backgroundColor:'#eee',justifyContent:'center',alignContent:'center',borderColor:'#aaa',borderRadius:10}
        }}
      />


      <Drawer.Screen
        name={navigationStrings.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          title: 'Logout',
          drawerItemStyle:{height: 60,backgroundColor:'#eee',justifyContent:'center',alignContent:'center',borderColor:'#aaa',borderRadius:10}
        }}
      />
      <Drawer.Screen
        name={navigationStrings.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          title: 'Register',
          drawerItemStyle:{height: 0}
        }}
      />
       <Drawer.Screen
        name={navigationStrings.FORGOT_SCREEN}
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          drawerItemStyle:{height: 0}
        }}
      />

    </Drawer.Navigator>
  );
}
