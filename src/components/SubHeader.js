import React from 'react';
import {View, Text, TextInput} from 'react-native';
import tw from '../../lib/tailwind';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SubHeader({navigation}) {
  // const navigation = useNavigation();
  return (
    <View style={tw`w-full h-15 bg-black flex flex-row`}>
      <Octicons
        name="three-bars"
        style={tw`text-white my-auto mx-2.5`}
        size={35}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />

      <TextInput
        keyboardType={'default'}
        placeholder={'Enter your search'}
        placeholderTextColor={tw`bg-gray-200`}
        style={tw.style(`px-6 py-4 my-2 mx-2.5 rounded-full bg-white`, {
          flex: 1,
        })}
      />
      <Feather
        name="arrow-right"
        style={tw`text-white my-auto mr-2 `}
        size={40}
      />
    </View>
  );
}
