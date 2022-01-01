import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const BoldText = ({numberOfLines, style, title, onPress}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles.boldText, style]}>
      {title}
    </Text>
  );
};

export const MediumText = ({numberOfLines, style, title}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.mediumText, style]}>
      {title}
    </Text>
  );
};

export const RegularText = ({numberOfLines, style, title}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.regularText, style]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontSize: hp('2.4%'),

    color:'#fff',
  },
  mediumText: {
    fontSize: hp('2%'),

    color:'#fff',
  },
  regularText: {
    fontSize: hp('1.9%'),

    color:'#000',
  },
});
