import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../utils/navigationStrings';
import ShopScreen from '../screens/ShopScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CarouselFullImagePinchable from '../screens/CarouselFullImagePichable';
import CartScreen from '../screens/CartScreen';

const ShopStackNavigator = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <ShopStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <ShopStackNavigator.Screen
        name={navigationStrings.SHOP_SCREEN}
        component={ShopScreen}
      />
      <ShopStackNavigator.Screen
        name={navigationStrings.PRODUCT_DETAILS_SCREEN}
        component={ProductDetailsScreen}
      />
      <ShopStackNavigator.Screen
        name={navigationStrings.CarouselFullImagePinchable}
        component={CarouselFullImagePinchable}
      />
      <ShopStackNavigator.Screen
        name={navigationStrings.CART_SCREEN}
        component={CartScreen}
      />
    </ShopStackNavigator.Navigator>
  );
}
