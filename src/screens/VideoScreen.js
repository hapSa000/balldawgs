import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import Container from '../components/Container';
export default function VideoScreen() {
  return (
    <Container>
      <View style={tw`h-full`}>
        <Text style={tw`mx-auto my-auto`}>VIDEO</Text>
      </View>
    </Container>
  );
}
