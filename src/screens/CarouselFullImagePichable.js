import React, {useEffect, useRef, useState} from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,Platform, ScrollView} from 'react-native';
import Container from '../components/Container';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import Header from '../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import {BoldText, RegularText} from '../components/Texts/Texts';
import { SubmitButton} from '../components/Buttons';
import colors from '../utils/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import tw from 'twrnc';
import {PRODUCT_DETAILS} from '../services/index';
import {DEV_HEIGHT, DEV_WIDTH} from '../components/Device/DeviceDetails';
export default function CarouselFullImagePinchable(props) {
  const {activeIndexImages , assetImages} = props.route.params;

  console.log('data received ',activeIndexImages);
  console.log('assetImages received ',assetImages);
  const [assets, setAssets] = useState(assetImages);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(activeIndexImages);

  useEffect(() => {
  }, []);


  const _renderItem = (item, parallaxProps,index) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={{}} onPress={()=>{
        console.log('active index received selected click ', activeIndex);
        console.log('all data images coresal  assets received',assets);

        }}>
          <Image style={styles.image} source={{uri: item.small_url}} />
        </TouchableOpacity>
      </View>

    );
  };
  const pagination = () => {
    return (
      <Pagination
        dotsLength={assets.length > 0 ?assets.length :0}
        activeDotIndex={activeIndex}
        containerStyle={{paddingVertical: 1}}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
      />
    );
  };
  return (
    <Container>
      <Header hideLogin={true} title={''} />

      <View style={tw`h-full bg-[#fff]`}>
          <ScrollView  >
          <View style={{}}>
            <Carousel
              layout="default"
              loop={true}
              autoplay={false}
              ref={carouselRef}
              sliderWidth={DEV_WIDTH}
              sliderHeight={200}
              itemWidth={DEV_WIDTH}
              data={assets}
              renderItem={({item}) => _renderItem(item)}
              hasParallaxImages={true}
              onSnapToItem={index => setActiveIndex(index)}
            />
            <View style={styles.paginationSection}>{pagination()}</View>
          </View>

          </ScrollView>
        </View>
        </Container>

  );
}
const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: hp('80%'),
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
    height: hp('80%'),

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


