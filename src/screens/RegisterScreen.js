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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../components/Toast/Toast';
import {Loader} from '../components/Loader/Loader';
import NetworkRequest, {
  servicesPoints,
  method,
} from '../services/NetworkRequest';
import tw from '../../lib/tailwind';
import Logo from '../../assets/images/logo.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Container from '../components/Container';
import {CheckBox} from 'react-native-elements';
import navigationStrings from '../utils/navigationStrings';

export default function RegisterScreen({navigation}) {
  const [checked, setChecked] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uname, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
   try {
    if (!firstName) {
      Toast('Error', 'Please enter first name', 'danger', 'danger');
      return;
    }
    if (!lastName) {
      Toast('Error', 'Please enter last name', 'danger', 'danger');
      return;
    }
    if (!uname) {
      Toast('Error', 'Please enter user name', 'danger', 'danger');
      return;
    }
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
    if (!confirmPassword) {
      Toast('Error', 'Please enter confirm password', 'danger', 'danger');
      return;
    }
    if (confirmPassword  !=  password) {
      Toast('Error', 'Confirm password should be same as password.', 'danger', 'danger');
      return;
    }

    let condition =
      firstName && lastName && uname && emailAddress && password && confirmPassword;
    if (condition) {

       await onApiSignup();
    }


   } catch (error) {

   }

  };


  const onApiSignup = async () => {
    let data ={
      "firstName": firstName,
      "lastName": lastName,
      "username": uname,
      "email": emailAddress,
      "password": password
  }
    try {
      setLoading(true);
      const requestConfig = {
        method: method.post,
        url: servicesPoints.userServices.signup,
        data: data,
      };
      const response = await NetworkRequest(requestConfig);
      if (response) {
        const status = response.status;
        if (status == 'success') {
          console.log('res success', response);
          setLoading(false);
          await saveProfileWithUserToken(response.data);
          Toast('Success', response.message, 'success', 'success');
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
          style={tw.style(`mx-auto mt-1`, {
            width: 100,
            resizeMode: 'contain',
          })}
        />
        <View style={tw`mt-0 mx-auto flex flex-row`}>
          <FontAwesome name="lock" style={tw`text-4xl my-auto mx-1`} />
          <Text style={tw`text-2xl my-auto mx-1 font-bold`}>Sign Up</Text>
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
        <View style={tw`mt-4`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'Username:'}
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
            value={uname}
            onChangeText={uname => setUserName(uname)}
          />
        </View>
        <View style={tw`mt-4`}>
          <TextInput
            keyboardType={'default'}
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
        <View style={tw`mt-4`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'Password:'}
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
        <View style={tw`mt-6`}>
          <TextInput
            keyboardType={'default'}
            placeholder={'Confirm Password'}
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
            value={confirmPassword}
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          />
        </View>

        <View style={tw`mx-auto mt-6 flex flex-row justify-center`}>
          <CheckBox
            title="I agree to the"
            center
            checked={checked}
            onPress={() => setChecked(!checked)}
            checkedColor={'#000'}
            uncheckedColor={'#000'}
            containerStyle={tw`bg-transparent px-0`}
            style={tw`mx-auto my-auto`}
            textStyle={tw`text-black`}
          />
          <TouchableOpacity style={tw`mx-auto my-auto -ml-5`}>
            <Text style={tw`text-black text-sm font-bold underline`}> Term </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`mx-auto w-80 px-6 py-4 border mt-6 bg-black`} onPress={() => onSubmit()}>
          <Text style={tw`text-white text-xl font-bold mx-auto `}>
            Register
          </Text>
        </TouchableOpacity>

        <View style={tw`my-6`}></View>
      </ScrollView>

      <Loader visible={isLoading} />

    </Container>
  );
}
