import React, {useEffect, useRef, useState} from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,Platform, ScrollView} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BoldText, RegularText} from '../components/Texts/Texts';
import { SubmitButton} from '../components/Buttons';
import colors from '../utils/colors';
import {Loader} from '../components/Loader/Loader';
import navigationStrings from '../utils/navigationStrings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import tw from 'twrnc';
export default function CartScreen(props) {

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [props.navigation]);


  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  }, []);

  return (
    <Container>
      <Header hideLogin={true} title={'My Cart'} />

      <View style={tw`h-full bg-[#fff]`}>
          <ScrollView  >

      <View style={styles.infoContainer}>
          <Text style={styles.name}>Gaurav Mangal</Text>
          <Text style={styles.price}>$30.00</Text>
          <Text style={styles.lbl_options}>Sizes</Text>
          <Text style={styles.lbl_options}>Small</Text>

            <Text style={styles.lbl_options}>Quantity</Text>
            <Text style={styles.lbl_options}>2</Text>
                <View style={styles.btnSection}>
                <SubmitButton
                  style={styles.submitBtn}
                  title={'CheckOut'}
                  onPress={() => alert('Work in progress')}
                />
              </View>
        </View>
        <Loader visible={isLoading} />
          </ScrollView>
        </View>

        </Container>

  );
}
const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: hp('40%'),


  },
  submitBtn: {
    backgroundColor: colors.app_theme_dark_green,
    borderRadius: 20,
  },
  btnSection: {
    flex:1,

    padding: hp('2%'),

    marginTop: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: hp('40%'),

    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#fff',
    height: hp('0.7%'),
    width: hp('1.5%'),
    padding: 0,
  },
  inactiveDot: {
    backgroundColor: '#ddd',
    height: hp('1.6%'),
    width: hp('1.6%'),
    borderRadius: hp('0.8%'),
    padding: 0,
  },
  paginationSection: {
    marginHorizontal: '45%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  infoContainer: {
    padding: 16,justifyContent:'center',alignContent:'center',marginTop:10
  },
  name: {
    fontSize: hp('2.4%'),
    color:'#000'
  },
  price: {
    fontSize: hp('2.2%'),
    color:'#000',
    marginTop:hp('3%')
  },
  lbl_options: {
    fontSize: hp('2.2%'),
    color:'#aaa',
    marginTop:hp('0.5%')
  },
  dropDownView: {
    marginTop: 10,
    ...(Platform.OS !== 'android' && {
      zIndex: 10,
  }),
  },
  dropDownContainer: {
    borderColor:'#aaa',
  },
});


