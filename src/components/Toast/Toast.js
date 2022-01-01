import {showMessage} from 'react-native-flash-message';
import colors from '../../utils/colors';

const titleStyle = {color: colors.white};
const textStyle = {color: colors.white};

export const Toast = (message, description, type, icon) => {
  return showMessage({
    message,
    description,
    type,
    icon,
    titleStyle,
    textStyle,
  });
};
