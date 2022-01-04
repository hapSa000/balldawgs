import {createClient} from '@supabase/supabase-js';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log(config.REACT_APP_SUPABASE_URL, config.REACT_APP_SUPABASE_ANON_KEY)
const supabase = createClient(config.REACT_APP_SUPABASE_URL, config.REACT_APP_SUPABASE_ANON_KEY, {
  localStorage: AsyncStorage,
});

export {supabase};
