import React from 'react';
import {View, Text} from 'react-native';
import Container from '../components/Container';
import tw from '../../lib/tailwind';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Storys from '../components/Storys';
import Events from '../components/Events';

export default function HomeScreen(props) {
  
  return (
    <Container>
      <Header hideGoBack={true} />
      <SubHeader />
      <View style={tw`h-full`}>
          <Storys />
          <Events />
      </View>
    </Container>
  );
}
