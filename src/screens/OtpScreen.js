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
export default function OtpScreen(props) {

  const otp = props.route.params.otp;
  const emailAddress = props.route.params.email;
console.log('otp receive :',otp);
  const [otpMatch, setOtpMatch] = useState('');

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
   try {
    if (!otpMatch) {
      Toast('Error', 'Please enter otp', 'danger', 'danger');
      return;
    }
    let condition =
    otpMatch ;
    if (condition) {
      await onCheckMathcOtpValidate();
    }


   } catch (error) {
   }
  };

  const onCheckMathcOtpValidate = async () => {

    try {
        if(otpMatch === otp){
          Toast('Success', 'otp is verified successfully. ', 'success', 'success');
          props.navigation.navigate(navigationStrings.RESET_PASSWORD,{otp:otp , email:emailAddress})
        }
        else{
          Toast('Error', 'Please enter correct otp ', 'danger', 'danger');
        }

    } catch (error) {
      console.log(error.message);
    }
  };




  return (
    <Container>
          <Header hideLogin={true} title={'OTP '} />

      <ScrollView style={tw`h-full w-full`}>
        <Image
          source={Logo}
          style={tw.style(`mx-auto mt-2`, {
            width: 100,
            resizeMode: 'contain',
          })}
        />
        <View style={tw`mt-6`}>
          <TextInput
            keyboardType={'email-address'}
            placeholder={'Enter Otp :'}
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
            value={otpMatch}
            onChangeText={otpMatch => setOtpMatch(otpMatch)}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSubmit()}
          style={tw`mx-auto w-80 px-6 py-4 border mt-20 bg-black`}>
          <Text style={tw`text-white text-xl font-bold mx-auto `}>
           OTP Validate
          </Text>
        </TouchableOpacity>


      </ScrollView>
      <Loader visible={isLoading} />


    </Container>
  );
}
