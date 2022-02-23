import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios';

// helpers
import ProductCardVerticleNew from './ProductCardVerticleNew';
const {height, width} = Dimensions.get('screen');

const SimilarProducts = ({navigation, id}) => {
  const [similarData, setSimilarData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get('http://18.190.154.188:9000/products/getsmlrprdcts/' + id)
      .then(res => {
        setSimilarData(res.data);
      })
      .catch(e => {});
  }, [id]);

  const data = [
    'https://picsum.photos/id/0/367/267',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-fb15111e-fb36-4352-96cc-a7123094b9cc',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-5864b123-de0d-4124-85fe-c8c267afdfdf',
    'https://mystuff.bublup.com/api/v1/uploads/001-i-fb15111e-fb36-4352-96cc-a7123094b9cc',
    'https://picsum.photos/id/0/367/267',
  ];
  const _renderProductItem = ({item, index}) => {
    return (
      <View key={index}>
        <ProductCardVerticleNew
          item={item}
          image={item}
          isVerified={item.isVerified}
          isFav={item.isFav}
          isOffer={item.isOffer}
          height={height}
          navigation={navigation}
          title={false}
          similar={true}
        />
      </View>
    );
  };
  return (
    <View>
      <MasonryList
        keyPrefix={(item, index) => index}
        numColumns={2}
        style={{marginBottom: 80}}
        showsVerticalScrollIndicator={false}
        data={similarData}
        renderItem={_renderProductItem}
      />
    </View>
  );
};

export default SimilarProducts;
