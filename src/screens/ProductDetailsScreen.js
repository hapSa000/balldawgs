import React, {useEffect, useRef, useState} from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,Platform, ScrollView} from 'react-native';
import Container from '../components/Container';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
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
import {PRODUCT_DETAILS} from '../services/index';
import {DEV_HEIGHT, DEV_WIDTH} from '../components/Device/DeviceDetails';
import { AuthContext } from '../../context/context';
export default function ProductDetailsScreen(props) {

  const {addToCartItemQTY} = React.useContext(AuthContext);


  const data = props.route.params.data;
  const [itemDetails, setItemDetails] = useState({});
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [opens, setOpens] = useState(false);
  const [value, setValue] = useState(null);
  const [allSizes, setAllSizes] = useState([]);
  const [allVarients, setAllVarients] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setLoading] = useState(true);


  const [productPriceSize, setProductPriceSize] = useState('0.00');



  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      callSetCountCart();
    });
    return unsubscribe;
  }, [props.navigation]);


  const callSetCountCart = async () => {
    getCartItemCount();
  };

  const getCartItemCount = async () => {
    let countDta = await AsyncStorage.getItem('CartItemCount');
    console.log('getCartItemCount count ',countDta);
    setCartItemCount(countDta);

  };

  useEffect(() => {

    get_product_details(data.slug).then(res => {
      console.log('aaaaa',res);
      setItemDetails(res);

      let newoptions_text = [];
      let options_textArr = res.variants;
      options_textArr.map(item => {
        newoptions_text.push({label: item.option_values[0].presentation, value:  item.option_values[0].presentation});
      });
      setAllSizes(newoptions_text);
      setAllVarients(options_textArr)
      setProductPriceSize(options_textArr[0].display_price)
      setValue(newoptions_text[0].value);



    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  }, []);

  const get_product_details = async slug => {
    console.log('get_product_details******************',slug);
    let result = await PRODUCT_DETAILS(slug);
    console.log('get_product_details result respnonse',result);
    return result;
  };
  const _renderItem = (item, parallaxProps,index) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={{}} onPress={()=>{
        console.log('item selected click ',activeIndex);
        console.log('all data images coresal ',itemDetails.assets);

        props.navigation.navigate(navigationStrings.CarouselFullImagePinchable, {activeIndexImages: activeIndex , assetImages :itemDetails.assets })



        }}>
          <Image style={styles.image} source={{uri: item.small_url}} />
        </TouchableOpacity>
      </View>

    );
  };
  const getIndex = (value) => {
    console.log('get index ',allVarients);
    var index = 0;
    for (let i = 0; i < allVarients.length; i++) {
      console.log('get index insdie :****************',allVarients[i].option_values[0].presentation)
      if (allVarients[i].option_values[0].presentation == value) {
        return i;
      }
    }
  }
  const pagination = () => {
    return (
      <Pagination
        dotsLength={Object.keys(itemDetails).length > 0 ?itemDetails.assets.length :0}
        activeDotIndex={activeIndex}
        containerStyle={{paddingVertical: 1}}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
      />
    );
  };
  return (
    <Container>
      <Header hideLogin={true} title={'Product Details'} rightIcon={true}/>

      <View style={tw`h-full bg-[#fff]`}>
          <ScrollView>
          <View style={{}}>
            <Carousel
              layout="default"
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              autoplayDelay={3000}
              ref={carouselRef}
              sliderWidth={DEV_WIDTH}
              sliderHeight={200}
              itemWidth={DEV_WIDTH}
              data={itemDetails.assets}
              renderItem={({item}) => _renderItem(item)}
              hasParallaxImages={true}
              onSnapToItem={index => setActiveIndex(index)}
            />
            <View style={styles.paginationSection}>{pagination()}</View>
          </View>
      <View style={styles.infoContainer}>
          <Text style={styles.name}>{itemDetails.name}</Text>
          <Text style={styles.price}>{productPriceSize}</Text>
          <Text style={styles.lbl_options}>Sizes</Text>
          <View style={styles.dropDownView}>
              <DropDownPicker
                 dropDownContainerStyle={{
                  borderWidth: 0.3,
                  borderColor: 'rgba(0,0,0,0.15)',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  color: '#aaa',
                  zIndex:50000
                }}
                open={opens}
                placeholder="Select Sizes"
                value={value}
                style={styles.dropDownContainer}
                items={allSizes}
                setOpen={setOpens}
                setValue={setValue}
                onChangeValue={(value, index) => {

                  if(value != undefined)
                  {
                    console.log("selected value",value);

                    var indexVariants=getIndex(value);
                    console.log("selected Index",indexVariants);


                    setProductPriceSize(allVarients[indexVariants].display_price);
                  }




                }}

              />
            </View>

            <Text style={styles.lbl_options}>Quantity</Text>
            <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                  onPress={() => {setQuantity(quantity + 1)
                    addToCartItemQTY(quantity)}
                  }
                  >
                    <View
                      style={{
                        width: hp(3),
                        height: hp(3),
                        borderRadius: hp(1.5),
                        backgroundColor: colors.app_theme_dark_green,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:hp('2%')
                      }}>
                      <BoldText
                        title="+"
                        style={{
                          color: '#fff',
                          fontSize: hp('2.6%'),
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <RegularText
                    style={{
                      color:'#000',
                      fontSize: hp('1.6%'),
                    }}
                    title={quantity}
                  />
                  <TouchableOpacity
                  onPress={()=>{
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      addToCartItemQTY(quantity)
                    }
                  }}
                   >
                    <View
                      style={{
                        width: hp(3),
                        height: hp(3),
                        borderRadius: hp(1.5),
                        backgroundColor: colors.app_theme_dark_green,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <BoldText
                        title="-"
                        style={{
                          color: '#fff',
                          fontSize: hp('2.6%'),
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnSection}>
                <SubmitButton
                  style={styles.submitBtn}
                  title={'Add to Cart'}
                  onPress={() => props.navigation.navigate(navigationStrings.CART_SCREEN)
                  }
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


