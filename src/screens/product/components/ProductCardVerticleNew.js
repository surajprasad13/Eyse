import React, {useMemo} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {typography} from '../../../common/typography';

const ProductCardVerticleNew = props => {
  const [imageHeight, setImageHeight] = React.useState(300);
  const [liked, setLiked] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    Image.getSize(props.image, (_width, height) => {
      setImageHeight(height);
    });
  }, [props.image]);
  const ht = props.title ? 50 : 0;
  return (
    <TouchableOpacity
      key={props.key}
      source={{uri: props.image}}
      onPress={() => {
        props.navigation.navigate('ProductDetailsContainer', {
          item: props.item,
        });
      }}
      style={{
        margin: 10,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        height:
          imageHeight < 300
            ? imageHeight * 0.8 + ht
            : imageHeight > 600
            ? imageHeight * 0.2 + ht
            : imageHeight * 0.5 + ht,
      }}>
      <Image
        source={{uri: props.image}}
        style={{
          alignSelf: 'stretch',
          borderRadius: 10,
          height:
            imageHeight < 300
              ? imageHeight * 0.8
              : imageHeight > 600
              ? imageHeight * 0.2
              : imageHeight * 0.5,
        }}
        resizeMode={props.similar ? 'cover' : 'contain'}
      />
      {props.title ? (
        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          style={styles.floatingActionBtn}>
          <Image
            source={
              liked
                ? require('../../assets/images/heart-fill.png')
                : require('../../assets/images/heart-outline.png')
            }
            style={{...styles.icon28, top: 2}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}

      {props.title ? (
        <View
          style={{
            backgroundColor: '#fff',
            height: 40,
            justifyContent: 'space-around',
            paddingHorizontal: 15,
            marginVertical: 5,
          }}>
          <Text
            style={{
              color: '#011E46',
              fontSize: 14,
              fontFamily: typography.NatoBlack,
            }}>
            {props.item.prdct_attributes.brand}
          </Text>
          <Text
            style={{
              color: '#99A5B5',
              fontSize: 14,
              fontFamily: typography.DidactGothicRegular,
            }}>
            {props.item.prdct_attributes.prdct_name}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'NotoSans-Regular';
const fontBold = 'NotoSans-Bold';

export default ProductCardVerticleNew;

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
  floatingActionBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 8,
    bottom: 25,
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
{
  /*<TouchableNativeFeedback
        onPress={() => {
          props.onCardPressed(props.item);
        }}>
        <View style={styles.productCard}>
          <Image source={{uri:props.item.prdct_attributes.media[0].url}} style={styles.productImg} />

          <Text numberOfLines={1} style={styles.productTitle}>{props.item.prdct_attributes.prdct_name} - {props.item.prdct_attributes.brand}</Text>

          <View style={{...styles.elementsInRow, marginHorizontal: 10}}>
            <View style={styles.elementsInRow}>
              <Text style={styles.textSmall}>{props.item.rating}</Text>
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

          <Text style={styles.moqText}>MOQs : {props.item.min_order_quantity} pieces</Text>

          <Text style={styles.quantity}>
            {props.item.member_discount} <Text styles={styles.quantityLabel}>for members</Text>
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{(props.item.prdct_attributes.dsct_price).toFixed(2)}</Text>

            <Image
              source={
                props.isFav
                  ? require('../../assets/images/heart-fill.png')
                  : require('../../assets/images/heart-outline.png')
              }
              style={styles.icon24}
              resizeMode="contain"
            />
          </View>

          {props.isOffer ? (
            <View style={styles.offerTag}>
              <Text style={styles.offerTagText}>50% OFF</Text>
            </View>
          ) : null}
        </View>
      </TouchableNativeFeedback>*/
}
