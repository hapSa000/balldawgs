import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

export default function TopHeaderDivider(props) {
  return (
    <>
      <View style={tw`w-16 ml-6 border-t border-[#020202]`}></View>
      <View style={tw`w-full border-t border-[#D2D2D2] px-6 py-1`}>
        {props.children}
      </View>
    </>
  );
}
