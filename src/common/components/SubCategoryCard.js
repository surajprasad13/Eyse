import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {options} from '../../data/Options';

export default class SubCategoryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.onPress(this.props.item);
        }}>
        <View style={styles.productCard}>
          <Image
            // source={require('../../assets/images/img1.png')}
            source={{uri: this.props.item.prdct_attributes.media[0].url}}
            style={styles.productImg}
          />

          <View style={styles.productDetailsContainer}>
            <View style={styles.elementsInRowJSB}>
              <View style={{flex: 1}}>
                <Text style={styles.productName} numberOfLines={1}>
                  {this.props.item.prdct_attributes.prdct_name} -{' '}
                  {this.props.item.prdct_attributes.brand}
                </Text>
                <Text style={styles.productSubTitle}>
                  MOQs : {this.props.item.min_order_quantity} units
                </Text>
              </View>

              <View style={styles.badgeContainer}>
                <View style={styles.elementsInRow}>
                  <Text style={styles.textSmall}>{this.props.item.rating}</Text>
                  <Image
                    source={require('../../assets/images/star-yellow.png')}
                    style={{...styles.icon16, marginBottom: 3}}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.badgeMinimal}>
                  <Text style={{...styles.textSmall, fontSize: 12}}>
                    Verified
                  </Text>
                </View>
              </View>
            </View>

            <View style={{...styles.elementsInRow, marginTop: 8, flex: 1}}>
              <View style={{...styles.elementsInRow, flex: 1}}>
                <Text style={styles.productPrice}>
                  {this.props.item.prdct_attributes.dsct_price.toFixed(2)}
                </Text>

                {this.props.forMembers ? (
                  <Text style={styles.quantity}>
                    {this.props.item.member_discount.toFixed(2)}
                    <Text styles={styles.quantityLabel}> for members</Text>
                  </Text>
                ) : null}

                {this.props.isOffer ? (
                  <Text style={styles.totalMRP}>2500</Text>
                ) : null}
              </View>

              {this.props.isOffer ? (
                <Text style={styles.offPercentage}>20% off</Text>
              ) : null}
            </View>

            <View style={styles.elementsInRowJSB}>
              <Text style={styles.productInfo}>
                Estimated Delivery {this.props.item.dispatch_time}
              </Text>

              <TouchableNativeFeedback
                onPress={() => {}}
                background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
                <View style={{...styles.icon20, marginRight: 6}}>
                  <Image
                    source={require('../../assets/images/heart-outline.png')}
                    style={styles.icon20}
                    resizeMode="contain"
                  />
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                onPress={() => Share.open(options)}
                background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
                <View style={styles.icon18}>
                  <Image
                    source={require('../../assets/images/share.png')}
                    style={styles.icon18}
                    resizeMode="contain"
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          {this.props.isBestSeller ? (
            <View style={styles.cardTag}>
              <Text style={styles.tagLabel}>Best Seller</Text>
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

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  icon16: {
    width: 16,
    height: 16,
  },

  icon18: {
    width: 18,
    height: 18,
  },

  icon20: {
    width: 20,
    height: 20,
  },

  productCard: {
    width: width,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    marginVertical: 8,
    padding: 10,
  },

  productImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
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
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 2,
  },

  badgeMinimal: {
    backgroundColor: '#F2F7FD',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 3,
  },

  productDetailsContainer: {
    flex: 1,
    marginLeft: 6,
  },

  productName: {
    fontSize: 16,
    fontFamily: fontMedium,
    color: '#011E46',
  },

  productSubTitle: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
  },

  productPrice: {
    fontSize: 18,
    fontFamily: fontMedium,
    color: '#011E46',
    marginRight: 4,
  },

  totalMRP: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
    marginRight: 6,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  offPercentage: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: '#FF9E00',
  },

  quantity: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#015DD3',
    marginHorizontal: 8,
  },

  quantityLabel: {
    fontFamily: fontRegular,
  },

  productInfo: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
  },

  badgeContainer: {
    alignItems: 'center',
  },

  cardTag: {
    backgroundColor: '#FF9E00',
    position: 'absolute',
    paddingLeft: 25,
    paddingRight: 15,
    borderTopLeftRadius: 20,
  },

  tagLabel: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: '#fff',
  },
});
