/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {typography} from '../../../../common/typography';
import {sortModal} from '../.././../../store/actions/shopActions';
const {width, height} = Dimensions.get('screen');

const SortModal = () => {
  const dispatch = useDispatch();
  const sortModalVisible = item => dispatch(sortModal(item));
  const visible = useSelector(state => state.shop.sortVisible);
  const [sortOption, setSortOption] = useState('Recommended');
  const [sortOptionsOpened, setSortOptionsOpened] = useState(false);
  const sortOptions = [
    'Recommended',
    "What's new",
    'Popular',
    'Price Low to High',
    'Price High to Low',
    'Discounted Products',
    'Highest Ratings',
  ];
  const [optionList, setOptionList] = useState(sortOptions);

  useEffect(() => {
    setOptionList(sortOptions.filter(item => item !== sortOption));
  }, [sortOption]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => sortModalVisible(false)}>
      <TouchableOpacity
        onPress={() => sortModalVisible(false)}
        style={styles.modalContainer}>
        <View style={styles.filterContainer}>
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
              Sort
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'center',
              width: width * 0.65,
              marginBottom: 20,
              backgroundColor: '#F2F7FD',
              borderRadius: 7,
              elevation: 5,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 7,
                height: 30,
                //justifyContent: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 5,
              }}
              onPress={() => setSortOptionsOpened(false)}>
              <Text
                style={{
                  color: '#015DD3',
                  fontFamily: fontRegular,
                  fontSize: 14,
                }}>
                {sortOption}
              </Text>
              <Image
                source={require('../../../../assets/images/dummy.png')}
                style={styles.icon24}
              />
            </TouchableOpacity>
            {optionList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSortOption(item);
                  sortModalVisible(false);
                }}
                style={{
                  height: 30,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: '#677890',
                    fontFamily: fontRegular,
                    fontSize: 14,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'PTSans-Regular';
const fontBold = 'PTSans-Bold';

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
    width: width * 0.75,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SortModal;
