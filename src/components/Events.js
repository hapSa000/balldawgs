import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../../lib/tailwind';

export default function Events() {
  return (
    <View style={tw`px-4 py-2`}>
      <View style={tw`border border-gray-300 rounded-lg`}>
        <View style={tw`bg-black rounded-t-lg`}>
          <Text style={tw`mx-auto my-2 text-base text-white`}>
            Week 10 - Dec 20
          </Text>
        </View>
        <View style={tw`h-30`}></View>
        <View
          style={tw`rounded-b-lg border-t border-gray-300 flex flex-row justify-between h-10`}>
          <TouchableOpacity style={tw.style(`mx-3 h-10 w-40`)}>
            <Text style={tw`mx-auto my-auto uppercase text-sm font-bold`}>Buy Tickets</Text>
          </TouchableOpacity>
          <View style={tw.style(`mx-0 border-l border-gray-300 h-10`)}></View>
          <TouchableOpacity style={tw.style(`mx-3 h-10 w-40`)}>
            <Text style={tw`mx-auto my-auto uppercase text-sm font-bold`}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
