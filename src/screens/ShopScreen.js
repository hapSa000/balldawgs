import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Container from '../components/Container';
import Header from '../components/Header';
import {ALL_PRODUCTS} from '../services';
import navigationStrings from '../utils/navigationStrings';
import {Loader} from '../components/Loader/Loader';
export default function ShopScreen(props) {
  const [allProducts, setAllProducts] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    let mounted = true;
    get_all_products().then(items => {
      if (mounted) {
        setProducts(items);
        setLoading(false);
      }
    });
    return () => (mounted = false,
      setLoading(false));
  }, []);

  const get_all_products = async () => {
    let result = await ALL_PRODUCTS();
    setAllProducts(result);
    setLoading(false);
    if (result !== {}) {
      return result.products;
      setLoading(false);
    }
    return [];
  };

  const renderListItem = ({item}) => {

    return (
      <TouchableOpacity
        style={tw.style(`flex flex-col m-1`, {flex: 1 / 2})}
        onPress={() =>
          props.navigation.navigate(navigationStrings.PRODUCT_DETAILS_SCREEN, {data: item})
        }>
        <Image
          source={{uri: item.default_asset_url}}
          style={tw.style(`w-full h-60`)}
        />
        <Text style={tw.style(`text-xs font-semibold my-1`)}>{item.name}</Text>
        <Text style={tw.style(`text-xs font-semibold my-1`)}>
          {item.price?.display}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header hideGoBack={true} hideLogin={true} title={'Shop'} />
      <View style={tw`h-full`}>
        {products && (
          <>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={products}
              renderItem={renderListItem}
              numColumns={2}
              ListZ
              q
              q4tyhg
            />
          </>
        )}
      </View>
      <Loader visible={isLoading} />
    </Container>
  );
}
