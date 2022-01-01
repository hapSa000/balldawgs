import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import tw from '../../lib/tailwind';
import StoryItem from './StoryItem';

export default function Storys() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={tw`h-38 px-4 py-2`}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={tw`w-full h-full`}>
        {arr.map(item => (
          <StoryItem key={item} />
        ))}
      </ScrollView>
    </View>
  );
}
