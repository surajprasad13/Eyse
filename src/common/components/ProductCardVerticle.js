import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default class ProductCardVerticle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.onCardPressed(this.props.item);
        }}>
        <View style={styles.productCard}>
          <Image
            source={{uri: this.props.item.prdct_attributes.media[0].url}}
            style={styles.productImg}
          />

          <Text numberOfLines={1} style={styles.productTitle}>
            {this.props.item.prdct_attributes.prdct_name} -{' '}
            {this.props.item.prdct_attributes.brand}
          </Text>

          <View style={{...styles.elementsInRow, marginHorizontal: 10}}>
            <View style={styles.elementsInRow}>
              <Text style={styles.textSmall}>{this.props.item.rating}</Text>
              <Image
                source={require('../../assets/images/star-yellow.png')}
                style={styles.icon14}
                resizeMode="contain"
              />
            </View>

            <View style={styles.badgeMinimal}>
              <Text style={styles.textSmall}>Verified</Text>
            </View>
          </View>

          <Text style={styles.moqText}>
            MOQs : {this.props.item.min_order_quantity} pieces
          </Text>

          <Text style={styles.quantity}>
            {this.props.item.member_discount}{' '}
            <Text styles={styles.quantityLabel}>for members</Text>
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {this.props.item.prdct_attributes.dsct_price.toFixed(2)}
            </Text>

            <Image
              source={
                this.props.isFav
                  ? require('../../assets/images/heart-fill.png')
                  : require('../../assets/images/heart-outline.png')
              }
              style={styles.icon24}
              resizeMode="contain"
            />
          </View>

          {this.props.isOffer ? (
            <View style={styles.offerTag}>
              <Text style={styles.offerTagText}>50% OFF</Text>
            </View>
          ) : null}
        </View>
      </TouchableNativeFeedback>
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
    height: width / 2 - 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  productTitle: {
    fontSize: 14,
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
