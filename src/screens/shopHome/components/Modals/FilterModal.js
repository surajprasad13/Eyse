import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {filterModal} from '../../../../store/actions/shopActions';
import {typography} from '../../../../common/typography';
import Slider from '@react-native-community/slider';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('screen');

const FilterModal = () => {
  const [searchBudget, setSearchBudget] = useState(0);

  const [selected, setSelected] = useState('Categories');
  const [categoryList, setCategoryList] = useState([]);

  const [colorList, setColorList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const visible = useSelector(state => state.shop.filterVisible);

  const dispatch = useDispatch();
  const setFilterModal = item => dispatch(filterModal(item));
  const categories = [
    'Shoes',
    'T-Shirts',
    'Bags',
    'Home Decor',
    'Handmade',
    'Shoes',
    'T-Shirts',
    'Bags',
    'Home Decor',
    'Handmade',
  ];

  const colors = [
    'red',
    'blue',
    'yellow',
    'black',
    'gray',
    'lightblue',
    'orange',
    'green',
    'purple',
    'cyan',
  ];
  const offers = [
    'Buy 1 get 1 free',
    '50% off',
    '30% off',
    '20% off',
    '10% off',
  ];
  const filterOptions = ['Categories', 'Color', 'Price', 'Offer'];
  const sortOptions = [
    'Recommended',
    "What's new",
    'Popular',
    'Price Low to High',
    'Price High to Low',
    'Discounted Products',
    'Highest Ratings',
  ];

  const handleRemoveItem = e => {
    setCategoryList(categoryList.filter(item => item !== e));
  };
  const handleRemoveColor = e => {
    setColorList(colorList.filter(item => item !== e));
  };
  const handleRemoveOffer = e => {
    setOfferList(offerList.filter(item => item !== e));
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.categoryList}>{item}</Text>
          <TouchableOpacity
            onPress={() =>
              categoryList.indexOf(item) !== -1
                ? handleRemoveItem(item)
                : setCategoryList([...categoryList, item])
            }
            style={{
              height: 25,
              width: 25,
              borderWidth: 2,
              borderColor: '#F2F7FD',
              backgroundColor: 'white',
              marginBottom: 5,
            }}>
            {categoryList.indexOf(item) !== -1 ? (
              <MaterialIcons name={'check'} color={'blue'} size={20} />
            ) : null}
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#F2F7FD',
            height: 1,
          }}></View>
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setFilterModal(false)}>
      <View
        //activeOpacity={1}
        //onPress={() => setFilterModal(false)}
        style={{
          ...styles.modalContainer,
        }}>
        <View
          style={{
            ...styles.filterContainer,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fontMedium,
                color: '#011E46',
              }}>
              Filter
            </Text>
          </View>
          <View style={{height: 40}}>
            <ScrollView horizontal={true}>
              {filterOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelected(item)}
                  style={{marginHorizontal: 15}}>
                  <Text
                    style={
                      selected == item
                        ? styles.selectedFilter
                        : styles.filterOptions
                    }>
                    {item}
                  </Text>
                  {selected == item ? (
                    <View
                      style={{
                        backgroundColor: '#015DD3',
                        height: 3,
                        width: 40,
                      }}></View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            {selected == 'Categories' ? (
              <View style={{flexBasis: '65%', marginTop: 20}}>
                {/* <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: width * 0.84,
                    paddingHorizontal: 30,
                    height: height * 0.35,
                    marginBottom: 10,
                  }}>
                  {categories.map((item, index) => (
                    
                  ))}
                </ScrollView> */}
                <View
                  style={{
                    width: width * 0.86,
                    paddingHorizontal: 20,
                    height: height * 0.6,
                    marginBottom: 25,
                  }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              </View>
            ) : selected == 'Color' ? (
              <View style={{flexBasis: '70%', marginTop: 5}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: width * 0.86,
                    paddingHorizontal: 20,
                    height: height * 0.6,
                    marginBottom: 25,
                  }}>
                  {colors.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        marginVertical: 5,
                        width: width * 0.85,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 15,
                          alignItems: 'center',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 40,
                              backgroundColor: item,
                              marginHorizontal: 10,
                              alignSelf: 'center',
                            }}></View>
                          <Text
                            style={{
                              ...styles.categoryList,
                              textTransform: 'capitalize',
                              alignSelf: 'center',
                            }}>
                            {item}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            colorList.indexOf(item) !== -1
                              ? handleRemoveColor(item)
                              : setColorList([...colorList, item])
                          }
                          style={{
                            height: 25,
                            width: 25,
                            borderWidth: 2,
                            borderColor: '#F2F7FD',
                            backgroundColor: 'white',
                            marginBottom: 5,
                          }}>
                          {colorList.indexOf(item) !== -1 ? (
                            <MaterialIcons
                              name={'check'}
                              color={'blue'}
                              size={20}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#F2F7FD',
                          height: 1,
                          marginTop: 5,
                        }}></View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : selected == 'Price' ? (
              <View style={{flexBasis: '70%', marginTop: 20}}>
                <Slider
                  style={{width: width - 150, height: 50}}
                  value={searchBudget}
                  maximumValue={100000}
                  onValueChange={value =>
                    setSearchBudget(Math.floor(value / 100) * 100)
                  }
                  thumbTintColor={'#015DD3'}
                  maximumTrackTintColor={'#FF9E00'}
                  minimumTrackTintColor={'#FF9E00'}
                  trackImage={''}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: typography.DidactGothicRegular,
                      fontSize: 16,
                      color: '#677890',
                    }}>
                    Rs. {Math.floor(searchBudget / 1000) * 1000}
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: 10,
                      fontFamily: typography.DidactGothicRegular,
                      fontSize: 16,
                      color: '#677890',
                    }}>
                    Rs. 100000
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{flexBasis: '70%', marginTop: 20}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: width * 0.86,
                    paddingHorizontal: 20,
                    height: height * 0.6,
                    marginBottom: 25,
                  }}>
                  {offers.map((item, index) => (
                    <View
                      style={{
                        marginVertical: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            ...styles.categoryList,

                            alignSelf: 'flex-start',
                            left: 0,
                          }}>
                          {item}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            offerList.indexOf(item) !== -1
                              ? handleRemoveOffer(item)
                              : setOfferList([...offerList, item])
                          }
                          style={{
                            height: 25,
                            width: 25,
                            borderWidth: 2,
                            borderColor: '#F2F7FD',
                            backgroundColor: 'white',
                            marginBottom: 5,
                          }}>
                          {offerList.indexOf(item) !== -1 ? (
                            <MaterialIcons
                              name={'check'}
                              color={'blue'}
                              size={20}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#F2F7FD',
                          height: 1,
                        }}></View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 20,
              width: width * 0.75,
            }}>
            <TouchableOpacity
              onPress={() => setFilterModal(false)}
              style={styles.applyButton}>
              <Text style={{color: '#fff', fontFamily: fontRegular}}>
                Apply
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.applyButton, backgroundColor: '#fff'}}>
              <Text style={{fontFamily: fontRegular}}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'PTSans-Regular';
const fontBold = 'PTSans-Bold';

export default FilterModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingVertical: 12,
  },
  followBtn: {
    width: 140,
    height: 35,
    backgroundColor: 'blue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  applyButton: {
    height: 33,
    width: 103,
    backgroundColor: '#015DD3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
  },
  verified: {color: '#fff', fontFamily: fontRegular, fontSize: 12},
  rating: {alignItems: 'center', fontSize: 16, marginRight: 10},
  followBtnText: {fontFamily: fontMedium, fontSize: 14, color: 'white'},
  iconBtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    color: '#015DD3',
    fontFamily: fontRegular,
    fontSize: 14,
  },
  categoryList: {
    color: '#011E46',
    fontFamily: typography.NotoSansMedium,
    fontSize: 16,
  },
  filterOptions: {
    color: '#B3BBC7',
    fontFamily: fontRegular,
    fontSize: 14,
  },
  verifiedButton: {
    width: 60,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#015DD3',
    borderRadius: 16,
  },

  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontFamily: fontBold,
    color: '#011E46',
    marginLeft: 6,
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
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    width: width,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    //flex: 1,
    //marginVertical: 80,
    width: width * 0.85,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
