import React, {useEffect, useMemo, useReducer} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStack from './src/navigation/RootStack';
import FlashMessage from 'react-native-flash-message';
import {AuthContext} from './context/context';
import AuthStack from './src/navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
export default function App() {
  console.log('Hello Git Setup');
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'ADD_TO_CART_ITEM_QTY':
          return {
            ...prevState,
            cartItemCount: action.itemCount,
          };
      }
    },
    {
      cartItemCount: 0,
    },
  );

  const authContext = useMemo(
    () => ({
      addToCartItemQTY: async itemCount => {
        console.log('itemCount---', itemCount);
        await AsyncStorage.setItem('CartItemCount', itemCount.toString());
        dispatch({type: 'ADD_TO_CART_ITEM_QTY', itemCount: itemCount});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>

      <FlashMessage position="top" animated hideOnPress autoHide />
    </AuthContext.Provider>
  );
}
