import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import tw from '../../lib/tailwind';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import navigationStrings from '../utils/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
var apiToken = '';
const getapiToken = async () => {
  apiToken = await AsyncStorage.getItem('apiToken');
  console.log('apiToken count ', apiToken);
};

export default function Header({hideLogin, title, hideGoBack}) {
  const navigation = useNavigation();

  const setTokenAsync = async () => {
    try {
      await AsyncStorage.setItem('apiToken', '');

      var apiTokenCheck = await AsyncStorage.getItem('apiToken');
      console.log('apiToken updated login', apiTokenCheck);
    } catch (e) {}
  };

  return (
    <View
      style={tw`w-full bg-gray-300 h-12 -mt-10 bg-transparent flex flex-row justify-between`}>
      <View style={tw`my-auto ml-12 flex flex-row`}>
        {!hideGoBack && (
          <>
            <Feather
              name="arrow-left"
              style={tw`text-black my-auto`}
              size={25}
              onPress={() => navigation.goBack()}
            />
          </>
        )}
        <Text style={tw`my-auto mx-2 font-bold text-sm`}>{title}</Text>
      </View>
      <View style={tw`my-auto mx-2`}>
        {!hideLogin && (
          <TouchableOpacity onPress={setTokenAsync} style={tw`flex flex-row`}>
            <Text style={tw`my-auto text-base font-bold`}>Login</Text>
            <MaterialCommunityIcons
              name="lock"
              style={tw`my-auto text-xl ml-1`}
            />
          </TouchableOpacity>
        )}
      </View>
      {title === 'Product Details' ? (
        <>
          <View
            style={{
              backgroundColor: 'red',
              borderRadius: 15,
              borderWidth: 2,
              width: 30,
              height: 30,
              borderColor: '#aaa',
              marginLeft: 20,
            }}>
            <Text style={tw`my-auto mx-2 font-bold text-sm`}>1</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 20, top: 3}}
              onPress={() =>
                navigation.navigate(navigationStrings.CART_SCREEN)
              }>
              <MaterialCommunityIcons name="cart" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
}
