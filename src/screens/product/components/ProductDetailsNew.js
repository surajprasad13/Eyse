import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';

import {productSize} from '../../../data/productData';
import {updateCart} from '../../../store/actions/shopActions';

import PaginationCard from './PaginationCard';
import RatingsDisplay from './RatingsDisplay';
import ProductReviews from './ProductReviews';

const ProductDetailsNew = props => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const cart = data => dispatch(updateCart(data));
  const cartData = useSelector(state => state.cartData);

  const [similarItem, setSimilarItem] = React.useState([]);

  const scrollRef = React.useRef();
  const [status, setStatus] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('overview');
  const [offSet, setOffSet] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [height, setHeight] = React.useState(400);
  const [height1, setHeight1] = React.useState(0);
  const [height2, setHeight2] = React.useState(0);
  const [height3, setHeight3] = React.useState(0);
  const [height4, setHeight4] = React.useState(0);
  const [showReview, setShowReview] = React.useState(false);
  const [activeSlide, setActiveSlider] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [sizeModal, setSizeModal] = React.useState(false);
  const [shopModal, setShopModal] = React.useState(false);
  const [sizeIndex, setSizeIndex] = React.useState(-1);
  const influencerData = useSelector(state => state.shop.influencers);

  React.useEffect(() => {
    if (offSet > height - 20) {
      setVisible(true);
    } else if (offSet < height + 50) {
      setVisible(false);
    }
  }, [offSet, visible, height]);

  const renderImageItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => props.onclickImage(item.url)}>
        <Image
          source={{uri: item.url}}
          style={{...styles.imgMinimal, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    );
  };

  const renderSizeCirles = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          {
            setSizeIndex(index);
            //props.onClickSize(index);

            setTimeout(() => {
              setSizeModal(false);
            }, 1200);
          }
        }}>
        <View style={styles.modalCircle}>
          <Text style={styles.circleText}>{item.prdct_attributes.size}</Text>
        </View>

        {sizeIndex == index ? (
          <View style={{...styles.modalCircle, ...styles.placeAbsolute}}>
            <Image
              source={require('../../../assets/images/done-icon.png')}
              style={styles.icon24}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderColorCirles = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          props.onClickColor(index);
        }}
        style={styles.center}>
        <View>
          <View
            style={{
              ...styles.modalCircle,
              backgroundColor: item.color ? item.color : '#000',
            }}
          />

          {props.activeColor == index ? (
            <View
              style={{
                ...styles.modalCircle,
                ...styles.placeAbsolute,
              }}>
              <Image
                source={require('../../../assets/images/done-icon.png')}
                style={styles.icon24}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const Header = () => {
    return (
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            scrollRef.current.scrollTo({
              x: 0,
              y: height,
              animated: true,
            });
            props.setActiveNavItem('overview');
          }}>
          <Text
            style={{
              ...styles.navName,
              color: props.activeNavItem == 'overview' ? '#015DD3' : '#B3BBC7',
            }}>
            Overview
          </Text>
          {props.activeNavItem == 'overview' ? (
            <View style={styles.navActive} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            scrollRef.current.scrollTo({
              x: 0,
              y: visible ? height + height2 : height + height2 - 50,
              animated: true,
            });
            props.setActiveNavItem('description');
          }}>
          <Text
            style={{
              ...styles.navName,
              color:
                props.activeNavItem == 'description' ? '#015DD3' : '#B3BBC7',
            }}>
            Description
          </Text>
          {props.activeNavItem == 'description' ? (
            <View style={styles.navActive} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setShowReview(true);
            scrollRef.current.scrollTo({
              x: 0,
              y: height + height2 + height3 + 30,
              animated: true,
            });
            props.setActiveNavItem('reviews');
          }}>
          <Text
            style={{
              ...styles.navName,
              color: props.activeNavItem == 'reviews' ? '#015DD3' : '#B3BBC7',
            }}>
            Reviews
          </Text>
          {props.activeNavItem == 'reviews' ? (
            <View style={styles.navActive} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {visible ? <Header /> : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{zIndex: -1}}
        ref={scrollRef}
        onScroll={event => {
          setOffSet(event.nativeEvent.contentOffset.y);
        }}>
        <View
          onLayout={event => {
            var {height} = event.nativeEvent.layout;
            setHeight(height);
          }}>
          <View style={styles.header}>
            <TouchableNativeFeedback
              onPress={() => {
                props.goBack();
              }}
              background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
              <View style={styles.iconBtn}>
                <Image
                  source={require('../../../assets/images/back-arrow-icon.png')}
                  style={styles.icon24}
                  resizeMode="contain"
                />
              </View>
            </TouchableNativeFeedback>

            <Text style={styles.headerTitle}>
              {props.product.prdct_attributes.prdct_name} -{' '}
              {props.product.prdct_attributes.brand}
            </Text>

            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
              <View style={styles.iconBtn}>
                <Image
                  source={require('../../../assets/images/share.png')}
                  style={styles.icon24}
                  resizeMode="contain"
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View
            onLayout={event => setHeight1(event.nativeEvent.layout.height)}
            style={styles.card}>
            <View style={styles.imageContainer}>
              <Carousel
                data={props.product.prdct_attributes.media}
                renderItem={renderImageItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={index => setActiveSlider(index)}
              />

              <PaginationCard
                dotsLength={props.product.prdct_attributes.media.length}
                activeDot={activeSlide}
              />
            </View>

            <TouchableOpacity
              onPress={() => setLiked(!liked)}
              style={styles.floatingActionBtn}>
              <Image
                source={
                  liked
                    ? require('../../../assets/images/heart-fill.png')
                    : require('../../../assets/images/heart-outline.png')
                }
                style={{...styles.icon28, top: 2}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: -20}}
              data={props.colors}
              keyExtractor={item => item.id}
              renderItem={renderColorCirles}
              horizontal
            />
          </View>
        </View>
        <View onLayout={event => setHeight2(event.nativeEvent.layout.height)}>
          {!visible ? <Header /> : null}

          <View style={styles.iconBtnBox}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSizeModal(true);
              }}
              style={styles.iconBtnContainer}>
              <View style={styles.iconBg}></View>
              <Text style={styles.iconBtnLabel}>Variant</Text>
            </TouchableOpacity>

            <View style={styles.iconBtnContainer}>
              <View style={styles.iconBg}>
                <View style={styles.elementsInRow}>
                  <Text style={styles.textSmall}>{props.product.rating}</Text>
                  <Image
                    source={require('../../../assets/images/star-yellow.png')}
                    style={{...styles.icon16, marginBottom: 3}}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text style={styles.iconBtnLabel}>Rating</Text>
            </View>
          </View>

          <View
            style={{
              ...styles.elementsInRow,
              alignSelf: 'center',
              marginBottom: 15,
            }}>
            <Image
              source={require('../../../assets/images/retry.png')}
              style={styles.icon42}
              resizeMode="contain"
            />
            <Text style={styles.textMedium}>7 days return</Text>
          </View>

          <View style={{marginHorizontal: 15}}>
            <View style={styles.uiDivider} />

            <View style={{...styles.elementsInRowJSB, marginTop: 20}}>
              <View>
                <View style={styles.elementsInRow}>
                  <Text style={styles.productPrice}>
                    ₹ {props.product.prdct_attributes.dsct_price.toFixed(2)}
                  </Text>
                  <Text style={styles.productPriceMRP}>
                    {' '}
                    {props.product.prdct_attributes.original_price}{' '}
                  </Text>
                </View>
                <View style={styles.elementsInRow}>
                  <Text style={styles.priceMembers}>
                    ₹ {props.product.member_discount}
                  </Text>
                  <Text
                    style={{
                      ...styles.priceMembers,
                      fontFamily: fontRegular,
                      marginBottom: 3,
                    }}>
                    {' '}
                    for members
                  </Text>
                </View>
              </View>

              <View style={styles.becomeMemberBtn}>
                <Text style={{...styles.textMedium, color: '#011E46'}}>
                  Become a member
                </Text>
                <Image
                  source={require('../../../assets/images/forward-arrow.png')}
                  style={styles.icon20}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text style={styles.offerText}>50% OFF</Text>
          </View>

          <View style={styles.estimatedTimeContainer}>
            <Image
              source={require('../../../assets/images/add.png')}
              style={{...styles.icon42, marginRight: 8}}
              resizeMode="contain"
            />
            <Text style={{...styles.textMedium, color: '#677890'}}>
              Estimated Delivary time 6-7 days
            </Text>
          </View>
        </View>
        <View
          onLayout={event => setHeight3(event.nativeEvent.layout.height)}
          style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            molestie, ante id tincidunt dapibus, justo eros imperdiet Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. In molestie, ante
            id tincidunt dapibus, justo eros imperdiet
          </Text>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.readMoreBtn}>Read more...</Text>
          </TouchableOpacity>
          <TouchableNativeFeedback
            onPress={() => {
              setShopModal(true);
            }}>
            <View style={styles.viewShopBtn}>
              <Text style={styles.viewShopBtnText}>Visit Shop</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => {}}>
            <View
              style={{
                ...styles.viewShopBtn,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
                backgroundColor: '#F2F7FD',
                height: 72,
                width: width - 20,
                alignSelf: 'center',
                paddingLeft: 31,
              }}>
              <View>
                <Text style={{...styles.harvestText, color: '#373737'}}>
                  Do not have sufficient funds?{' '}
                </Text>
                <Text style={styles.harvestText}>Try Harvest</Text>
              </View>
              <View>
                <Image
                  source={require('../../../assets/images/forward-arrow.png')}
                  style={{width: 25, height: 25, alignSelf: 'center'}}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        {showReview ? (
          <View
            onLayout={event => setHeight4(event.nativeEvent.layout.height)}
            style={{
              ...styles.sectionBox,
              backgroundColor: '#fff',
              elevation: 5,
              width: width - 20,
              alignSelf: 'center',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <View style={styles.elementsInRowJSB}>
              <Text style={styles.sectionTitle}>Reviews</Text>

              <TouchableOpacity
                onPress={() => {
                  setShowReview(!showReview);
                }}
                style={styles.filterDropdown}>
                <Ionicons
                  name={'chevron-up-outline'}
                  size={32}
                  color={'#011E46'}
                />
              </TouchableOpacity>
            </View>

            <View style={{...styles.elementsInRow, marginTop: 6}}>
              <Text style={styles.text16}>Naveen</Text>
              <View style={{...styles.elementsInRow, marginLeft: 6}}>
                <Text style={styles.text16}>4.5</Text>
                <RatingsDisplay numStars={4} />
              </View>
            </View>

            <Text style={styles.sectionDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              molestie, ante id tincidunt dapibus, justo eros imperdiet Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. In molestie,
              ante id tincidunt dapibus, justo eros imperdiet
            </Text>

            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.readMoreBtn}>Read more...</Text>
            </TouchableOpacity>

            <View style={{...styles.uiDivider, marginTop: 24}} />
          </View>
        ) : (
          <View
            onLayout={event => setHeight4(event.nativeEvent.layout.height)}
            style={{
              ...styles.sectionBox,

              backgroundColor: '#fff',
              alignSelf: 'center',
              //justifyContent: 'center',
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: width - 20,
            }}>
            <View style={styles.elementsInRowJSB}>
              <Text style={styles.sectionTitle}>Reviews</Text>

              <TouchableOpacity
                onPress={() => {
                  setShowReview(!showReview);
                }}
                style={styles.filterDropdown}>
                <Ionicons
                  name={'chevron-down-outline'}
                  size={32}
                  color={'#011E46'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Modal
          animationType="node"
          transparent={true}
          visible={sizeModal}
          onDismiss={() => setSizeModal(false)}
          onRequestClose={() => {
            setSizeModal(false);
          }}>
          <TouchableOpacity
            onPress={() => setSizeModal(false)}
            style={styles.modalContainer}>
            <View />

            <View>
              <View style={styles.uiBox} />
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>
                  Select size & varient you want to buy
                </Text>

                <View style={{marginTop: 18, paddingBottom: 30}}>
                  <FlatList
                    data={productSize.Data}
                    renderItem={renderSizeCirles}
                    keyExtractor={item => {
                      item._id;
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          transparent={true}
          visible={shopModal}
          onDismiss={() => setShopModal(false)}>
          <TouchableOpacity
            onPress={() => setShopModal(false)}
            style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: '#fff',
                alignSelf: 'center',
                flex: 1,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  fontFamily: fontRegular,
                  fontSize: 20,
                  color: '#011E46',
                }}>
                Visit the store
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: fontMedium,
                  color: '#677890',
                  fontSize: 14,
                  margin: 15,
                }}>
                And choose from wide varieties that are available and get your
                eye testing done.{' '}
              </Text>
              <View
                style={{
                  height: 160,
                  backgroundColor: '#F2F7FD',
                  borderRadius: 7,
                  padding: 15,
                  width: 250,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.storeText}>Store name</Text>
                  <Text style={styles.storeText}>4.5 ⭐</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name={'location-sharp'}
                    color={'#677890'}
                    size={20}
                  />
                  <Text
                    style={{
                      fontFamily: fontRegular,
                      color: '#677890',
                      fontSize: 14,
                    }}>
                    Street name, Area, City
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.verifiedButton}>
                    <Text style={styles.verified}>Verified</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: fontRegular,
                        color: '#011E46',
                        fontSize: 14,
                      }}>
                      4 km.
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontRegular,
                        color: '#677890',
                        fontSize: 14,
                      }}>
                      {' '}
                      10 mins
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShopModal(false)}
                style={{
                  ...styles.storeButton,
                  backgroundColor: '#fff',
                  elevation: 4,
                }}>
                <Text
                  style={{
                    fontFamily: fontRegular,
                    fontSize: 16,
                    color: '#011E46',
                  }}>
                  Book an appointment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.storeButton}>
                <Text
                  style={{
                    fontFamily: fontRegular,
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  Visit Now
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('AboutStore');
          }}
          style={{
            ...styles.sectionBox,
            backgroundColor: '#fff',
            alignSelf: 'center',
            //justifyContent: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            width: width - 20,
            borderRadius: 5,
          }}>
          <View style={styles.elementsInRowJSB}>
            <Text style={styles.sectionTitle}>About Store</Text>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AboutStore');
              }}
              style={styles.filterDropdown}>
              <Ionicons name="chevron-forward" size={32} color={'#011E46'} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={{...styles.cardHeader, marginTop: 30, marginBottom: 15}}>
          <Text style={{...styles.cardTitle, color: '#015DD3'}}>
            Similar Products
          </Text>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Home', {screen: true});
            }}>
            <Text style={styles.textBtnText}>View all</Text>
          </TouchableOpacity>
        </View>
        {/* <SimilarProducts navigation={props.navigation} id={productId} /> */}
        <View style={{...styles.cardHeader, marginTop: 0}}>
          <Text style={{...styles.cardTitle, color: '#015DD3'}}>
            Product Reviews
          </Text>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('InfluencerContainer', {
                image: require('../../../assets/images/img1.png'),
                type: 'image',
              })
            }>
            <Text style={styles.textBtnText}>View all</Text>
          </TouchableOpacity>
        </View>

        {influencerData.map(item => (
          <ProductReviews
            key={item._id}
            name={item.name}
            photo={{uri: item?.profile_image?.url}}
            navigation={props.navigation}
            type={'image'}
            description={item.description}
          />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          height: 50,

          elevation: 5,
          backgroundColor: '#fff',
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 0.8,
            borderTopLeftRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text>Qty</Text>
          <View
            style={{
              width: 1,
              backgroundColor: 'grey',
              marginVertical: 2,
              height: 30,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                marginLeft: -15,
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="caret-up" size={35} color={'#011E46'} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  quantity > 0
                    ? setQuantity(quantity - 1)
                    : setQuantity(quantity)
                }>
                {/* <Image
                  source={require('../../assets/images/arrow-down.png')}
                  style={{height: 18, width: 18}}
                /> */}
                <Ionicons name="caret-down" size={35} color={'#011E46'} />
              </TouchableOpacity>
            </View>
            <Text style={{alignSelf: 'center'}}>{quantity}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CartScreen');
            cart(props.product);
          }}
          style={{
            backgroundColor: '#015DD3',
            flex: 1.5,
            borderTopRightRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: '#F2F7FD', fontSize: 14, fontFamily: fontMedium}}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const fontRegular = 'DidactGothic_400Regular';
const fontMedium = 'NotoSans_400Regular';
const fontBold = 'NotoSans_700Bold';

const {width} = Dimensions.get('screen');

export default ProductDetailsNew;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontFamily: fontBold,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 7,
    color: '#011E46',
  },
  storeText: {
    textAlign: 'center',
    fontFamily: fontMedium,
    color: '#011E46',
    fontSize: 16,
  },
  storeButton: {
    backgroundColor: '#011E46',
    width: 260,
    height: 60,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
    marginVertical: 10,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  icon42: {
    width: 42,
    height: 42,
  },

  icon10: {
    width: 10,
    height: 10,
  },

  icon16: {
    width: 16,
    height: 16,
  },

  icon20: {
    width: 20,
    height: 20,
  },

  icon24: {
    width: 24,
    height: 24,
  },

  icon28: {
    width: 28,
    height: 28,
  },

  icon32: {
    width: 32,
    height: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 12,
  },

  iconBtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtnText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: fontBold,
    color: '#011E46',
    marginLeft: 6,
  },

  card: {
    width: width,
    //backgroundColor: '#fff',
    borderRadius: 25,
    //elevation: 3,
    paddingBottom: 20,
  },

  imgFull: {
    width: width - 30,
    height: 210,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 18,
    resizeMode: 'cover',
  },

  imgMinimal: {
    width: width - 30,
    height: 210,
    alignSelf: 'center',
    borderRadius: 10,
    //marginHorizontal: 7.5,
    resizeMode: 'cover',
  },

  imageContainer: {
    marginTop: 10,
    marginHorizontal: 4.5,
  },

  floatingActionBtn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    elevation: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 8,
    bottom: 80,
  },

  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  navItem: {
    flex: 1,
    alignSelf: 'baseline',
    marginTop: 12,
    alignItems: 'center',
  },

  navName: {
    fontSize: 16,
    fontFamily: fontMedium,
    color: '#015DD3',
    paddingVertical: 4,
    paddingHorizontal: 13,
  },

  navActive: {
    width: '100%',
    borderBottomColor: '#015DD3',
    borderBottomWidth: 4,
  },

  productName: {
    fontSize: 20,
    fontFamily: fontBold,
    color: '#015DD3',
    marginHorizontal: 15,
    marginTop: 15,
  },

  badgeMinimal: {
    backgroundColor: '#015DD3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  metaData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 8,
    paddingBottom: 10,
    borderBottomColor: '#E6E8EC',
    borderBottomWidth: 1,
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

  soldBy: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#011E46',
    width: 160,
  },

  location: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#677890',
  },

  iconBtnContainer: {
    alignItems: 'center',
  },

  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F7FD',
  },

  iconBtnLabel: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#373737',
    marginTop: 6,
  },

  iconBtnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 24,
  },

  textSmall: {
    fontSize: 12,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 2,
  },

  textMedium: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#99A5B5',
    marginLeft: 2,
  },

  uiDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E6E8EC',
    alignSelf: 'center',
  },

  priceMembers: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#015DD3',
  },

  becomeMemberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginVertical: 8,
  },
  verifiedButton: {
    width: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#015DD3',
    borderRadius: 16,
  },
  verified: {color: '#fff', fontFamily: fontRegular, fontSize: 12},

  productPrice: {
    fontSize: 20,
    fontFamily: fontBold,
    color: '#011E46',
  },

  productPriceMRP: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#B3BBC7',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: 6,
  },

  offerText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#FF9E00',
    marginTop: 8,
  },

  labelText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
  },

  valueText: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#677890',
    marginBottom: 6,
  },

  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F7FD',
    marginTop: 22,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },

  sectionBox: {
    marginTop: 20,
    marginHorizontal: 25,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: fontMedium,
    color: '#011E46',
  },

  sectionDescription: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
    marginTop: 6,
  },

  btnLite: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F2F7FD',
    alignSelf: 'center',
    marginTop: 22,
  },

  readMoreBtn: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#347DDC',
    marginVertical: 8,
    alignSelf: 'flex-end',
  },

  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',

    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 15,
  },

  filterDropdownLabel: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
    marginHorizontal: 3,
  },

  text16: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#011E46',
  },

  viewShopBtn: {
    backgroundColor: '#F2F7FD',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 30,
    height: 50,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewShopBtnText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#011E46',
  },
  harvestText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#015DD3',
  },

  sendQuoteBtn: {
    backgroundColor: '#F2F7FD',
    borderRadius: 10,
    padding: 10,
    marginTop: 18,
    alignItems: 'center',
  },

  sendQuoteBtnText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#677890',
  },

  actionBtn: {
    flex: 1,
    backgroundColor: '#015DD3',
    padding: 10,
    borderRadius: 20,
  },

  actionBtnText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: '#fff',
    textAlign: 'center',
  },

  actionBtnTextThin: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#011E46',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 40,

    paddingVertical: 60,
  },

  uiBox: {
    width: 90,
    height: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },

  modalCard: {
    borderRadius: 13,
    backgroundColor: '#fff',
    elevation: 8,
  },

  modalTitle: {
    fontSize: 16,
    fontFamily: fontRegular,
    color: '#015DD3',
    borderBottomColor: '#E6E8EC',
    borderBottomWidth: 0.5,
    paddingBottom: 9,
    marginHorizontal: 15,
    paddingTop: 15,
  },

  modalCircle: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#F2F7FD',
    marginHorizontal: 7.5,
  },

  circleText: {
    fontSize: 14,
    fontFamily: fontRegular,
    color: '#000',
  },

  placeAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(1,93,211,0.5)',
  },

  center: {
    width: 73,
    alignItems: 'center',
  },

  quantitybox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
  },

  quantityText: {
    fontSize: 15,
    fontFamily: fontMedium,
    color: '#677890',
    marginRight: 5,
  },

  submitBtn: {
    width: 200,
    height: 34,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },

  submitBtnText: {
    fontSize: 14,
    fontFamily: fontMedium,
    color: '#000',
  },
});
