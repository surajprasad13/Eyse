import MasonryList from '@react-native-seoul/masonry-list';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {filterModal, sortModal} from '../../store/actions/shopActions';
import FilterModal from '../shopHome/components/Modals/FilterModal';
import SortModal from '../shopHome/components/Modals/SortModal';
import RenderImageStore from './components/RenderImageStore';

const AboutStore = ({navigation}) => {
  const dispatch = useDispatch();
  const setFilterModal = item => dispatch(filterModal(item));
  const sortModalVisible = val => dispatch(sortModal(val));
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

        <Text style={styles.headerTitle}>
          {/* {props.product.prdct_attributes.prdct_name} -{' '}
          {props.product.prdct_attributes.brand} */}
          Store Name
        </Text>
        <SortModal />
        <FilterModal />
        <TouchableNativeFeedback
          onPress={() => {}}
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            //marginLeft: 10,
          }}>
          <Image
            source={require('../../assets/images/location.png')}
            style={{...styles.icon24, marginHorizontal: 20}}
            resizeMode="contain"
          />
          <Text
            style={{fontFamily: fontRegular, color: '#677890', fontSize: 14}}>
            Street name, Area, City
          </Text>
        </View>
        <View style={styles.verifiedButton}>
          <Text style={styles.verified}>Verified</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 50, marginVertical: 15}}>
        <Text style={styles.rating}>4.5</Text>
        <Image
          source={require('../../assets/images/star-yellow.png')}
          style={styles.icon20}
        />
        <Image
          source={require('../../assets/images/star-yellow.png')}
          style={styles.icon20}
        />
        <Image
          source={require('../../assets/images/star-yellow.png')}
          style={styles.icon20}
        />
        <Image
          source={require('../../assets/images/star-yellow.png')}
          style={styles.icon20}
        />
        <Image
          source={require('../../assets/images/star-yellow.png')}
          style={styles.icon20}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.followBtn}>
          <Text style={styles.followBtnText}>Follow</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('StoreContent')}
          style={{...styles.followBtn, backgroundColor: '#F2F7FD'}}>
          <Text style={{...styles.followBtnText, color: '#011E46'}}>
            Store content
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 25,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontFamily: fontRegular, fontSize: 16, color: '#011E46'}}>
          120 Products
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <MaterialIcons name={'search'} color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <MaterialIcons name={'filter-list'} color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sortModalVisible(true)}>
            <MaterialIcons name={'sort'} color={'black'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <MasonryList
        style={{marginBottom: 280}}
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
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <RenderImageStore item={item} />}
      />
      <TouchableOpacity style={styles.visitStoreButton}>
        <Text style={{fontFamily: fontMedium, fontSize: 14, color: '#fff'}}>
          Visit Store
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutStore;

const fontRegular = 'DidactGothic_400Regular';
const fontMedium = 'NotoSans_400Regular';
const fontBold = 'NotoSans_700Bold';

const {width, height} = Dimensions.get('screen');

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
  visitStoreButton: {
    height: 50,
    width: width * 0.8,
    backgroundColor: '#011E46',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
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
});
