import axios from 'axios';
import moment from 'moment';
import config from '../config';
import {supabase} from '../database';

const TIMESTAMP_UNIX = () => {
  return moment().unix();
};

const ALL_PRODUCTS = async () => {
  let response = await axios.get(`${config.ALL_PRODUCTS}${TIMESTAMP_UNIX}`);
  if (response.status === 200) return await response.data;
  else return {};
};

const PRODUCT_DETAILS = async slug => {
  let url = config.PRODUCT_DETAIL;
  url = url.replace('@SLUG@', slug);
  let response = await axios.get(`${url}${TIMESTAMP_UNIX}`);
  console.log(response.data);
  if (response.status === 200) return await response.data;
  else return {};
};

const insertTable = () => {
  try {
    supabase.from('cities').select().then(console.log).catch(console.log);
  } catch (error) {
    console.log(error);
  }
};





export {ALL_PRODUCTS, PRODUCT_DETAILS};
