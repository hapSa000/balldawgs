import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const Loader = props => {
  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      onRequestClose={undefined}>
      <View style={styles.modalContainer}>
        <View style={styles.circleContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={'#000'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleContainer: {
    borderWidth: 1,
    borderColor:'#000',
    backgroundColor: '#f0f0f0',
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
