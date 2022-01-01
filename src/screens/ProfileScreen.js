import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {Toast} from '../components/Toast/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../components/Loader/Loader';
import NetworkRequest, {
  servicesPoints,
  method,
} from '../services/NetworkRequest';

import tw from '../../lib/tailwind';
import Logo from '../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Container from '../components/Container';
import navigationStrings from '../utils/navigationStrings';
export default function ProfileScreen({navigation}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
   try {
      if (!emailAddress) {
        Toast('Error', 'Please enter email address', 'danger', 'danger');
        return;
      }
      if (!password) {
        Toast('Error', 'Please enter password', 'danger', 'danger');
        return;
      }
      if (password.length != 8) {
        Toast('Error', 'password should be minimum 8 digit character & alpha numeric only.', 'danger', 'danger');
        return;
      }
      let condition =
          emailAddress && password;
      if (condition) {

         await onApiLogin();
      }

   } catch (error) {
   }

  };


  const onApiLogin = async () => {
    let data ={
      "email": emailAddress,
      "password":password
  }
    try {
      setLoading(true);

      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.loginApi,
        data: data,
      };
      const response = await NetworkRequest(requestConfig);
      console.log('response from server', response);
      if (response) {
        const status = response.status;
        if (status == 'success') {
          console.log('res success', response);
          setLoading(false);
          await saveProfileWithUserToken(response.data);
          Toast('Success', 'user login successfully.', 'success', 'success');
          navigation.navigate(navigationStrings.HOME_SCREEN)
        } else {
          console.log('res failure', response);
          setLoading(false);
          Toast('Error', response.message, 'danger', 'danger');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function saveProfileWithUserToken(data) {
    try {
      console.log('gauarav res', data.token);
      await AsyncStorage.setItem('apiToken',data.token);
      AsyncStorage.setItem('profileInfo', JSON.stringify(data.profile), (err)=> {
        if(err){
            console.log("an error");
            throw err;
        }
        console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Container>
     <Header hideLogin={true} title={'My Account'} />
      <ScrollView style={tw`h-full w-full`}>
      <View style={tw`mx-1`}>
      <View
        style={tw.style({
          justifyContent:'center',alignContent:'center',alignItems:'center',
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
        style={{textAlign:'center',margin:20}}>
        gMangal
      </Text>
    </View>

        <View style={tw`mt-4`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'First Name:'}
            placeholderTextColor={tw`bg-gray-200`}
            style={tw.style(
              `mx-auto w-80 px-6 py-4 rounded-full bg-white shadow-md`,
              {
                shadowOffset: {width: 2, height: 5},
                shadowColor: `#000`,
                shadowRadius: 1,
                shadowOpacity: 0.13,
                elevation: 3,
              },
            )}
            value={firstName}
                onChangeText={firstName => setFirstName(firstName)}
          />
        </View>
        <View style={tw`mt-4`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'Last Name:'}
            placeholderTextColor={tw`bg-gray-200`}
            style={tw.style(
              `mx-auto w-80 px-6 py-4 rounded-full bg-white shadow-md`,
              {
                shadowOffset: {width: 2, height: 5},
                shadowColor: `#000`,
                shadowRadius: 1,
                shadowOpacity: 0.13,
                elevation: 3,
              },
            )}
            value={lastName}
            onChangeText={lastName => setLastName(lastName)}
          />
        </View>
        <View style={tw`mt-6`}>
          <TextInput
            keyboardType={'email-address'}
            placeholder={'Email ID:'}
            placeholderTextColor={tw`bg-gray-200`}
            style={tw.style(
              `mx-auto w-80 px-6 py-4 rounded-full bg-white shadow-md`,
              {
                shadowOffset: {width: 2, height: 5},
                shadowColor: `#000`,
                shadowRadius: 1,
                shadowOpacity: 0.13,
                elevation: 3,
              },
            )}
            value={emailAddress}
            onChangeText={emailAddress => setEmailAddress(emailAddress)}
          />
        </View>
        <View style={tw`mt-6`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'Others'}
            secureTextEntry={true}
            placeholderTextColor={tw`bg-gray-200`}
            style={tw.style(
              `mx-auto w-80 px-6 py-4 rounded-full bg-white shadow-md`,
              {
                shadowOffset: {width: 2, height: 5},
                shadowColor: `#000`,
                shadowRadius: 1,
                shadowOpacity: 0.13,
                elevation: 3,
              },
            )}
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </View>



        <TouchableOpacity
         onPress={() => onSubmit()}
          style={tw`mx-auto w-80 px-6 py-4 border mt-20 bg-black`}>
          <Text style={tw`text-white text-xl font-bold mx-auto `}>
            Submit
          </Text>
        </TouchableOpacity>


      </ScrollView>
      <Loader visible={isLoading} />

    </Container>
  );
}
