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
import {Toast} from '../components/Toast/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loader} from '../components/Loader/Loader';
import NetworkRequest, {
  servicesPoints,
  method,
} from '../services/NetworkRequest';

import tw from '../../lib/tailwind';
import Logo from '../../assets/images/logo.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Container from '../components/Container';
import navigationStrings from '../utils/navigationStrings';
export default function Login({navigation}) {

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
      <ScrollView style={tw`h-full w-full`}>
        <Image
          source={Logo}
          style={tw.style(`mx-auto mt-2`, {
            width: 100,
            resizeMode: 'contain',
          })}
        />
        <View style={tw`mt-8 mx-auto flex flex-row`}>
          <FontAwesome name="lock" style={tw`text-4xl my-auto mx-1`} />
          <Text style={tw`text-2xl my-auto mx-1 font-bold`}>Login</Text>
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
            placeholder={'Password'}
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

        <TouchableOpacity style={tw`mx-auto mt-8`}  onPress={() => {
            navigation.navigate(navigationStrings.FORGOT_SCREEN);
          }}>
          <Text style={tw`text-blue-400`}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={() => onSubmit()}
          style={tw`mx-auto w-80 px-6 py-4 border mt-20 bg-black`}>
          <Text style={tw`text-white text-xl font-bold mx-auto `}>
            Let's do
          </Text>
        </TouchableOpacity>

        <View style={tw`w-full flex flex-row justify-center mt-4`}>
          <Text style={tw`text-black text-sm font-light`}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={tw`ml-2`}
            onPress={() => {
              navigation.navigate(navigationStrings.REGISTER_SCREEN);
            }}>
            <Text style={tw`text-black text-sm font-bold`}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoading} />

    </Container>
  );
}
