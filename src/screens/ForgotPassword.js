import React, {useState} from 'react';
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
// import {insertTable} from '../services';
export default function ForgotPassword({navigation}) {
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
   try {
    await onApiForgotPassword();
   } catch (error) {
   }
  };

  const onApiForgotPassword = async () => {
    let data ={
      "email": "kmamtora2@sds.com",
  }
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate(navigationStrings.HOME_SCREEN)

      }, 2000);

      // const requestConfig = {
      //   method: method.post,
      //   url: servicesPoints.userServices.forgotApi,
      //   data: data,
      // };
      // const response = await NetworkRequest(requestConfig);
      // if (response) {
      //   const {success} = response;
      //   if (success) {
      //     console.log('res success', response);
      //     setLoading(false);
      //   } else {
      //     console.log('res failure', response);
      //     setLoading(false);
      //   }
      // }
    } catch (error) {
      console.log(error.message);
    }
  };




  return (
    <Container>
          <Header hideLogin={true} title={''} />

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
          <Text style={tw`text-2xl my-auto mx-1 font-bold`}>Forgot Password</Text>
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
