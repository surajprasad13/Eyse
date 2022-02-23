import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {typography} from '../../common/typography';
import SmartSearchIcon from './components/SmartSearchIcon';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WIDTH = Dimensions.get('screen').width;
const ImageSearch = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Image Search Results</Text>
        <MaterialIcons name="shopping-cart" color="#011E46" size={25} />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LocationSearch')}
          style={styles.storeSearch}>
          <Text
            style={{
              fontFamily: typography.DidactGothicRegular,
              color: '#011E46',
              fontSize: 16,
            }}>
            Search Store Near You
          </Text>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <TouchableOpacity>
            <MaterialIcons name={'filter-list'} color={'black'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name={'sort'} color={'black'} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.smartContainer}>
        <SmartSearchIcon navigation={navigation} />
      </View>
      <View style={styles.bottomButtonContainer}>
        <Text style={styles.bottomText}>
          Not Finding what you are looking for{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SmartScreen', {type: 'image'})}
          style={styles.bottomButton}>
          <Text style={styles.buttonText}>
            Let us know your preferences & we’ll get back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 5,
  },
  headerText: {
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: typography.NotoSansSemiBold,
    color: '#011E46',
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 10,

    justifyContent: 'space-between',
    width: WIDTH * 0.9,
  },
  storeSearch: {
    backgroundColor: '#F2F7FD',
    justifyContent: 'center',
    width: WIDTH * 0.6,
    height: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    flexBasis: '20%',
  },
  smartContainer: {
    position: 'absolute',
    bottom: 180,
    width: WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  bottomButtonContainer: {
    bottom: 80,
    position: 'absolute',
    alignSelf: 'center',
  },
  bottomText: {
    color: '#677890',
    marginBottom: 10,
    marginHorizontal: 33,
    fontFamily: typography.DidactGothicRegular,
  },
  bottomButton: {
    height: 62,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#015DD3',
    borderRadius: 27,
    paddingHorizontal: 26,
    marginHorizontal: 21,
  },
  buttonText: {
    textAlign: 'center',
    color: '#F2F7FD',
    fontFamily: typography.NotoSansBold,
  },
});
