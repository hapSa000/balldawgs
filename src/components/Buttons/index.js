import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../utils/colors';
import {BoldText, RegularText} from '../Texts/Texts';
import styles from './styles';

export const SubmitButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.SubmitButton, props.style]}>
      <BoldText title={props.title} />
    </TouchableOpacity>
  );
};
export const CancelButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.style, styles.cancelButton]}>
      <BoldText title={props.title} />
    </TouchableOpacity>
  );
};

