import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Share from 'react-native-share';
import {useDispatch} from 'react-redux';
import {filterModal, sortModal} from '../../../store/Action';
import {typography} from '../../common/typography';
import FilterModal from '../../components/Modals/FilterModal';
import SortModal from '../../components/Modals/SortModal';
import {options} from '../../data/Options';
import RenderImage from './components/RenderImage';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('screen');

const StoreContent = ({navigation}) => {
  const dispatch = useDispatch();
  const setFilterModal = item => dispatch(filterModal(item));
  const setSortModal = item => dispatch(sortModal(item));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={styles.header}>
        <TouchableNativeFeedback
          onPress={() => {
            navigation.goBack();
          }}
          background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
          <View style={styles.iconBtn}>
            <Image
              source={require('../../assets/images/back-arrow-icon.png')}
              style={{...styles.icon24}}
              resizeMode="contain"
            />
          </View>
        </TouchableNativeFeedback>

        <Text style={styles.headerTitle}>Store Content</Text>

        <TouchableNativeFeedback
          onPress={() => {
            Share.open(options);
          }}
          background={TouchableNativeFeedback.Ripple('#E6E8EC', true)}>
          <View style={{...styles.iconBtn}}>
            <Image
              source={require('../../assets/images/share.png')}
              style={{...styles.icon24}}
              resizeMode="contain"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 22,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontFamily: fontRegular, fontSize: 16, color: '#011E46'}}>
          120 Products
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name={'search'} color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <MaterialIcons name={'filter-list'} color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortModal(true)}>
            <MaterialIcons name={'sort'} color={'black'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <MasonryList
          data={[
            {
              id: '123',
              imgURL:
                'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
              text: 'Pioneer LHS Chaise Lounger in Grey Colour',
            },
            {
              id: '124',
              imgURL:
                'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
              text: 'Precedant Furniture',
            },
            {
              id: '125',
              imgURL:
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
              text: 'Leverette Upholstered Platform Bed',
            },
            {
              id: '126',
              imgURL:
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
              text: 'Briget Accent Table',
            },
            {
              id: '127',
              imgURL:
                'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
              text: 'Rivet Emerly Media Console',
            },
          ]}
          keyExtractor={item => item.ID}
          numColumns={2}
          style={{marginBottom: 80}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <RenderImage item={item} navigation={navigation} />
          )}
        />
      </View>
      <FilterModal />
      <SortModal />
    </View>
  );
};
const fontRegular = 'DidactGothic-Regular';
const fontMedium = 'NotoSans-Regular';
const fontBold = 'NotoSans-Bold';

export default StoreContent;

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
