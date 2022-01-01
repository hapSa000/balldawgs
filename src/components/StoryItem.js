import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from '../../lib/tailwind';
// elevation: 3,

export default function StoryItem() {
  return (
    <View style={tw`mx-1`}>
      <View
        style={tw.style({
          shadowOffset: {width: 0, height: 8},
          shadowColor: `#000`,
          shadowRadius: 3,
          shadowOpacity: 0.25,
        })}>
        <Image
          style={tw.style(
            `w-20 h-20 rounded-full border-2 border-white flex`,
          )}
          source={{
            uri: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
          }}
        />
      </View>
      <Text
        style={tw.style(`w-20 uppercase mt-5 text-center text-xs font-bold`)}>
        GAME PREVIEW
      </Text>
    </View>
  );
}
