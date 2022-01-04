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
import {Toast} from '../components/Toast/Toast';
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
export default function ResetPasswordScreen(props) {

  const otp = props.route.params.otp;
  const emailAddress = props.route.params.email;

  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
   try {
    if (!newPassword) {
      Toast('Error', 'Please enter new password', 'danger', 'danger');
      return;
    }
    let condition =
    newPassword ;
    if (condition) {
      await onApisetPassword();
    }


   } catch (error) {
   }
  };

  const onApisetPassword = async () => {
    let data ={
      "email":emailAddress,
      "otp":otp,
      "password":newPassword,
  }
  console.log('aaa',data);
  try {
    setLoading(true);

    const requestConfig = {
      method: method.post,
      url: servicesPoints.userServices.setpassword,
      data: data,
    };
    const response = await NetworkRequest(requestConfig);
    console.log('response from server', response);
    if (response) {
      const status = response.status;
      if (status == 'success') {
        console.log('res success', response);
        setLoading(false);
        Toast('Success',response.message, 'success', 'success');
        props.navigation.navigate(navigationStrings.LOGIN_SCREEN)
      } else {
        console.log('res failure', response);
        setLoading(false);
        Toast('Error', response.message, 'danger', 'danger');
      }
    }
  } catch (error) {
    console.log(error.message);
    setLoading(false);
  }
  };




  return (
    <Container>
          <Header hideLogin={true} title={'Reset Password'} />

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
          <Text style={tw`text-2xl my-auto mx-1 font-bold`}>set Password</Text>
        </View>
        <View style={tw`mt-6`}>
          <TextInput
            keyboardType={'email-address'}
            placeholder={'New Password : '}
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
            value={newPassword}
            onChangeText={newPassword => setNewPassword(newPassword)}
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
