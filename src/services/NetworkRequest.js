import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';
export const servicesPoints = {
  userServices: {
    loginApi: 'auth/login',
    sendOtp: 'auth/sendotp',
    forgotApi:'auth/forgot',
    signup: 'auth/register',
    getProfileData: 'profile',
    setpassword:'auth/setpassword',
    profilePhoto:'profile/profile-photo',
    cartData:'cart',
    getMessages:'message'
  },

};
export const method = {
  post: 'post',
  get: 'get',
  put:'put'
};

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const NetworkRequest = async requestConfig => {
  try {
    const token = await AsyncStorage.getItem('apiToken');
    console.log('token NetworkRequest-------',token);
    apiClient.defaults.headers.common.Authorization = 'Bearer '+token;
    const response = await apiClient.request(requestConfig);
    console.log('response response-------',response);
    if (response) {
      const {status} = response;
      if (status === 200) {
        const {data} = response;
        return data;
      }
    }
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default NetworkRequest;
