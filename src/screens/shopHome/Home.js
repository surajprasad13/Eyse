import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAgeListfromApi,
  getInfluencers,
  getOccassionListFromApi,
  getPersonalityListfromApi,
  getProducts,
} from '../../store/actions/shopActions';
import HomeHeader from './components/HomeHeader';
import ProductCardVerticleNew from './components/ProductCardVerticleNew';
import SearchBar from './components/SearchBar';
import SmartSearchIcon from './components/SmartSearchIcon';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [height, setHeight] = React.useState(0);
  const getOccassionList = data => dispatch(getOccassionListFromApi(data));
  const getPersonalityList = data => dispatch(getPersonalityListfromApi(data));
  const getAgeList = data => dispatch(getAgeListfromApi(data));
  const getProductsData = data => dispatch(getProducts(data));
  const getInfluencersAPI = data => dispatch(getInfluencers(data));
  const ProductsData = useSelector(state => state.shop.products);
  const data = [
    'https://picsum.photos/id/0/367/267',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-fb15111e-fb36-4352-96cc-a7123094b9cc',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-fb15111e-fb36-4352-96cc-a7123094b9cc',
    'https://picsum.photos/id/0/367/267',
  ];

  useEffect(() => {
    const getData = async () => {
      await axios
        .get('http://18.190.154.188:9000/products/getAllPrdctOnCond')
        .then(res => {
          getProductsData(res.data.Data);
        })
        .catch(error => {});
      await axios
        .get('http://18.190.154.188:9000/occasions')
        .then(res => {
          getOccassionList(res.data['occasion_list']);
        })
        .catch(error => alert(error));
      await axios
        .get('http://18.190.154.188:9000/inflncr/getAllInfluencers')
        .then(res => getInfluencersAPI(res.data.Data))
        .catch(error => {});
      await axios
        .get('http://18.190.154.188:9000/personality')
        .then(res => {
          getPersonalityList(res.data['personality_list']);
        })
        .catch(error => alert(error));
      await axios
        .get('http://18.190.154.188:9000/ageGroup')
        .then(res => {
          getAgeList(res.data['age-group']);
        })
        .catch(error => alert(error));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _renderProductItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <ProductCardVerticleNew
          item={item}
          image={
            item?.prdct_attributes.media.length > 0
              ? item?.prdct_attributes.media[0].url
              : 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg'
          }
          navigation={navigation}
          title={true}
          key={index}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <HomeHeader />
          <SearchBar navigation={navigation} />
          <MasonryList
            keyPrefix={item => toString(item._id)}
            numColumns={2}
            style={{marginBottom: 80, backgroundColor: '#fff'}}
            showsVerticalScrollIndicator={false}
            data={ProductsData}
            renderItem={_renderProductItem}
            ListEmptyComponent={null}
          />
        </ScrollView>
        <View style={styles.bottomIcon}>
          <SmartSearchIcon navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    bottom: 10,
  },
});
