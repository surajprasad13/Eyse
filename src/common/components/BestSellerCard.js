import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ProductCardVerticleNew from '../../screens/shopHome/components/ProductCardVerticleNew';
import MasonryList from '@react-native-seoul/masonry-list';

export default class BestSellerCard extends Component {
  constructor(props) {
    super(props);
  }

  _renderProductItem = ({item}) => {
    return (
      <ProductCardVerticleNew
        onCardPressed={productData => {
          this.props.onCardPressed(productData);
        }}
        item={item}
        image={item.image}
        isVerified={item.isVerified}
        isFav={item.isFav}
        isOffer={item.isOffer}
      />
    );
  };

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={{...styles.cardTitle, color: '#015DD3'}}>
            {this.props.cardTitle}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.onViewAll();
            }}>
            <Text style={styles.textBtnText}>View all</Text>
          </TouchableOpacity>
        </View>

        {this.props.loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              alignItems="center"
              marginTop={3}
              marginBottom={6}
              paddingBottom={10}
              flexDirection="row">
              <SkeletonPlaceholder.Item
                width={width / 2 - 20}
                height={260}
                borderRadius={14}
                marginLeft={10}
              />
              <SkeletonPlaceholder.Item
                width={width / 2 - 20}
                height={260}
                borderRadius={14}
                marginLeft={20}
              />
              <SkeletonPlaceholder.Item
                width={width / 2 - 20}
                height={260}
                borderRadius={14}
                marginLeft={20}
              />
              <SkeletonPlaceholder.Item
                width={width / 2 - 20}
                height={260}
                borderRadius={14}
                marginLeft={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <View>
            {/* <FlatList
            data={this.props.productData}
            renderItem={this._renderProductItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
            <MasonryList
              keyExtractor={(item, index) => item.ID}
              numColumns={2}
              style={{marginBottom: 80}}
              showsVerticalScrollIndicator={false}
              data={this.props.productData}
              renderItem={this._renderProductItem}
            />
          </View>
        )}
      </View>
    );
  }
}

const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'NotoSans-Regular';
const fontBold = 'NotoSans-Bold';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  icon14: {
    width: 14,
    height: 14,
    marginBottom: 3.5,
  },

  icon28: {
    width: 28,
    height: 28,
  },

  icon24: {
    width: 24,
    height: 24,
  },

  card: {
    width: width,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 3,
    paddingBottom: 20,
    marginVertical: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontFamily: fontBold,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 7,
    color: '#011E46',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
  },

  textBtnText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
  },

  productCard: {
    width: width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 10,
    paddingBottom: 10,
    elevation: 3,
    marginTop: 3,
    marginBottom: 6,
  },

  productImg: {
    width: width / 2 - 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  productTitle: {
    fontSize: 16,
    fontFamily: fontMedium,
    color: '#011E46',
    marginTop: 6,
    marginLeft: 8,
    marginRight: 6,
    marginBottom: 3,
  },

  elementsInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  elementsInRowJSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textSmall: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 2,
  },

  badgeMinimal: {
    backgroundColor: '#F2F7FD',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  moqText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#B3BBC7',
    marginHorizontal: 8,
    marginTop: 24,
  },

  quantity: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#015DD3',
    marginTop: 8,
    marginHorizontal: 8,
  },

  quantityLabel: {
    fontFamily: fontRegular,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 6,
  },

  priceText: {
    fontSize: 16,
    fontFamily: fontMedium,
    color: '#011E46',
  },

  offerTag: {
    backgroundColor: '#FF9E00',
    padding: 9,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0,
    top: 8,
  },

  offerTagText: {
    fontSize: 10,
    fontFamily: fontMedium,
    color: '#fff',
  },
});
