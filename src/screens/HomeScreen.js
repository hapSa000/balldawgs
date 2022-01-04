import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Container from '../components/Container';
import tw from '../../lib/tailwind';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Storys from '../components/Storys';
import Events from '../components/Events';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreen({navigation}) {
  const [apiToken, setApiToken] = useState(null);

  useEffect(() => {
    const getTokenAsync = async () => {
      let apiTokenCheck;
      try {
        apiTokenCheck = await AsyncStorage.getItem('apiToken');
        console.log('apiToken', apiTokenCheck);
        setApiToken(apiTokenCheck);
      } catch (e) {}
    };

    const unsubscribe = navigation.addListener('focus', () => {
      getTokenAsync();
    });
  }, []);

  return (
    <Container>
      <Header hideGoBack={true} hideLogin={apiToken ? true : false} />
      <SubHeader navigation={navigation} />
      <View style={tw`h-full`}>
        <Storys />
        <Events />
      </View>
    </Container>
  );
}
