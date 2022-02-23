import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {filterModal, sortModal} from '../../../store/actions/shopActions';
import FilterModal from './Modals/FilterModal';
import SortModal from './Modals/SortModal';
import {typography} from '../../../common/typography';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

const SearchBar = ({navigation}) => {
  const [searchBarModal, setSearchBarModal] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);
  const dispatch = useDispatch();
  const setFilterModal = item => dispatch(filterModal(item));
  const sortModalVisible = val => dispatch(sortModal(val));
  const onSearchPressed = text => {
    const r = a => {
      return (Math.random() + 10).toString(36).substring(0, a + 1);
    };

    setSearchResults([
      {category: 'Category', result: `${text}${r(1)}`, id: 1},
      {category: 'Category', result: `${text}${r(2)}`, id: 2},
      {category: 'Category', result: `${text}${r(3)}`, id: 3},
      {category: 'Category', result: `${text}${r(4)}`, id: 4},
    ]);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => alert(`${item.result} Selected`)}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: HEIGHT * 0.07,
        alignItems: 'center',
      }}>
      <View
        style={{
          marginRight: 10,
          borderRadius: 16,
          backgroundColor: '#fff',
          height: HEIGHT * 0.04,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <Text
          style={{color: '#99A5B5', fontFamily: typography.NotoSansRegular}}>
          {item.category}
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 10,
          color: '#99A5B5',
          fontFamily: typography.DidactGothicRegular,
        }}>
        {item.result}
      </Text>
    </TouchableOpacity>
  );
  //const sendBudget = (val) => dispatch(getBudget(val));
  return (
    <View style={styles.searchBarContainer}>
      <FilterModal />
      <SortModal />
      <Modal
        onRequestClose={() => setSearchBarModal(false)}
        visible={searchBarModal}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View
              style={{
                width: WIDTH * 0.5,
                height: HEIGHT * 0.06,
                backgroundColor: '#F2F7FD',
                alignSelf: 'center',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 14, fontFamily: typography.NotoSansMedium}}>
                Logo
              </Text>
            </View>
            <View
              style={{
                width: WIDTH * 0.9,
                maxHeight: 350,
                elevation: 10,
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 16,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: WIDTH * 0.9,
                    height: 0.07 * HEIGHT,
                    backgroundColor: '#F2F7FD',
                    alignSelf: 'center',
                    borderRadius: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    //backgroundColor:'blue'
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //paddingHorizontal: 20,
                      //backgroundColor:'red'
                    }}>
                    <View style={{marginLeft: 10}}>
                      <MaterialIcons
                        name={'search'}
                        size={20}
                        color="#B3CEF2"
                      />
                    </View>
                    <TextInput
                      placeholder={'Entered Search'}
                      autoFocus={true}
                      placeholderTextColor={'#677890'}
                      onChangeText={text => onSearchPressed(text)}
                      style={{
                        height: 0.05 * HEIGHT,
                        width: WIDTH * 0.45,
                        padding: 5,
                        color: '#677890',
                        fontFamily: typography.DidactGothicRegular,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('cameraSearch')}>
                      <MaterialIcons
                        name={'camera'}
                        color={'#015DD3'}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TextToSpeech')}
                      style={{
                        backgroundColor: 'white',
                        height: 0.05 * HEIGHT,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomRightRadius: 16,
                        borderTopRightRadius: 16,
                        marginLeft: 10,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunityIcons
                        name={'microphone'}
                        size={20}
                        color={'#015DD3'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FlatList
                style={{marginTop: 25}}
                data={searchResults}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF9E00',
                  width: WIDTH * 0.5,
                  height: HEIGHT * 0.03,
                  flexBasis: '12%',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                  borderRadius: 43,
                }}
                onPress={() => {
                  navigation.navigate('SmartScreen', {visible: true});
                  setSearchBarModal(false);
                }}>
                <MaterialIcons
                  name={'auto-awesome'}
                  size={24}
                  color={'white'}
                />
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 20,
                    fontSize: 14,
                    fontFamily: typography.NotoSansMedium,
                  }}>
                  Try Smart Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            height: 40,
            backgroundColor: '#F2F7FD',
            width: WIDTH * 0.8,
            alignSelf: 'center',
            borderRadius: 16,

            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => setSearchBarModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <View style={{marginRight: 10}}>
              <MaterialIcons name={'search'} size={20} color="#B3CEF2" />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: '#B3CEF2',
                fontFamily: typography.DidactGothicRegular,
              }}>
              Search
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('cameraSearch')}>
              <MaterialIcons name={'camera-alt'} color={'#015DD3'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('TextToSpeech')}
              style={{
                backgroundColor: 'white',
                height: 0.05 * HEIGHT,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 16,
                borderTopRightRadius: 16,
                marginLeft: 10,
                paddingHorizontal: 5,
              }}>
              <MaterialCommunityIcons
                name={'microphone'}
                size={20}
                color={'#015DD3'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => setFilterModal(true)}>
          {/* <Image
              source={require('../../assets/images/filter-icon.png')}
              style={{...styles.icon20, marginHorizontal: 5}}
            /> */}
          <MaterialIcons name={'filter-list'} color={'black'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'center', marginHorizontal: 5}}
          onPress={() => sortModalVisible(true)}>
          {/* <Image
              source={require('../../assets/images/filter-icon.png')}
              style={{...styles.icon20, marginHorizontal: 5}}
            /> */}
          <MaterialIcons name={'sort'} color={'black'} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingVertical: 10,
    flexBasis: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexBasis: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: WIDTH,
    flexBasis: '100%',
    height: HEIGHT * 0.5,
    padding: 25,
    backgroundColor: 'white',

    borderRadius: 10,
  },
});
