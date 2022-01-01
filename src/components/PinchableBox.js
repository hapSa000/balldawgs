import React, {useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import {
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const screen = Dimensions.get('window');

const PinchableBox = ({imageUri}) => {
  const doubleTapRef = useRef(null);

  scale = new Animated.Value(1);

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale: this.scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const onDoubleTapEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('onDoubleTapEvent');
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={onPinchStateChange}>
      <Animated.Image
        source={{uri: imageUri}}
        style={{
          width: screen.width,
          height: 300,
          transform: [
            {perspective: 200},
            {
              scale: this.scale.interpolate({
                inputRange: [0.9, 100],
                outputRange: [0.9, 100],
                extrapolateLeft: 'clamp',
              }),
            },
          ],
          zIndex: this.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 9999],
          }),
        }}
        resizeMode="cover"
      />
    </PinchGestureHandler>
  );
};

export default PinchableBox;
