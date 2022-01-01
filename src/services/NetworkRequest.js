import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
export const servicesPoints = {
  userServices: {
    loginApi: 'auth/login',
    sendOtp: 'auth/sendotp',
    forgotApi:'auth/forgot',
    signup: 'auth/register',
    myProfile: 'profile',
  },

};
export const method = {
  post: 'post',
  get: 'get',
};

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const NetworkRequest = async requestConfig => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    apiClient.defaults.headers.common.Authorization = token;
    const response = await apiClient.request(requestConfig);
    console.log('response response-------',response);
    if (response) {
     // const {status} = response;
      const {data} = response;
      console.log('response request',response);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default NetworkRequest;
