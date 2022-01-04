import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import tw from '../../lib/tailwind';
import BgImg from '../../assets/images/bg-splash-screen.jpg';
import Logo from '../../assets/images/splash-screen-logo.png';
import SplashVideoFile from '../../assets/videos/splash.mp4';
import Video from 'react-native-video';
import navigationStrings from '../utils/navigationStrings';
import {StackActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

export default function SplashScreen({navigation}) {
  const [playVideo, setPlayVideo] = useState(false);
  const [pauseVideo, setPauseVideo] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => {
        setPauseVideo(true);
      };

      return () => unsubscribe();
    }, [pauseVideo]),
  );

  useEffect(() => {
    setTimeout(() => {
      // setPauseVideo(false)
      // setPlayVideo(true);
      //  navigation.dispatch(StackActions.replace(navigationStrings.TAB_NAVIGATOR));
    }, 3000);
  }, [playVideo]);

  const SplashLogo = () => (
    <ImageBackground source={BgImg} style={tw.style(`h-full`, `w-full`)}>
      <View style={tw`m-auto `}>
        <Image
          source={Logo}
          style={tw.style(`w-70`, {resizeMode: 'contain'})}
        />
      </View>
    </ImageBackground>
  );

  const onBuffer = isBuffer => {
    console.log(isBuffer);
  };

  const SplashVideo = () => (
    <Video
      source={SplashVideoFile} // Can be a URL or a local file.
      ref={ref => {
        this.player = ref;
      }} // Store reference
      onBuffer={onBuffer} // Callback when remote video is buffering
      allow
      style={tw`h-full`}
      resizeMode={'cover'}
      paused={pauseVideo}
      // playInBackground={false}
      onEnd={() =>
        navigation.dispatch(
          StackActions.replace(navigationStrings.TAB_NAVIGATOR),
        )
      }
    />
  );
  return (
    <SafeAreaView style={tw`h-full bg-black`}>
      <StatusBar barStyle={'light-content'} />
      {playVideo ? <SplashVideo /> : <SplashLogo />}
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
