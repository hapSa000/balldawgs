import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import tw from 'twrnc';

export default function Container(props) {
  return (
    <View style={tw`h-full`}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={tw`h-full`}>
        <View
          style={tw`bg-[#A6A6A6] opacity-48 rounded-full h-24 w-24 -ml-10 -mt-14 `}
        />
        <View
          style={tw`bg-[#B5B5B5] opacity-48 absolute rounded-full h-24 w-24 ml-2 -mt-12 `}
        />
        {props.children}
      </SafeAreaView>
    </View>
  );
}
