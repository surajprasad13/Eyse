import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {typography} from '../../common/typography';
import SmartSearchIcon from './components/SmartSearchIcon';
import Geolocation from '@react-native-community/geolocation';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const LocationSerach = ({navigation}) => {
  const [locationModal, setLocationModal] = useState(true);
  const [listModal, setListModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeLocationModal, setChangeLocationModal] = useState(false);
  const [val, setVal] = useState('Frames');
  const [location, setLocation] = useState(null);

  const fetchLocation = async () => {
    ToastAndroid.showWithGravityAndOffset(
      JSON.stringify(location),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(location => {
      setLocation(location);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setVal(item);
        setListModal(false);
      }}>
      <Text style={styles.dropDownText}>{item}</Text>
      <View
        style={{
          height: 1,
          backgroundColor: '#e5e5e5',
          marginVertical: 10,
        }}></View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingTop: 30,
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => setLocationModal(false)}
          visible={locationModal}>
          <View style={styles.container}>
            <View style={styles.modal}>
              <Text style={styles.question}>What are you looking for?</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Search for your Item'}
                placeholderTextColor={'#011E46'}
                onChangeText={text => setVal(text)}
              />
              <Text style={styles.question}>Where are your looking?</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Your Pincode'}
                placeholderTextColor={'#011E46'}
              />
              <Text style={styles.OR}>OR</Text>
              <TouchableOpacity
                onPress={() => fetchLocation()}
                style={styles.locationButton}>
                <MaterialIcons name="my-location" size={24} color={'#011E46'} />
                <Text style={styles.currentLocationText}>
                  Use my Current Location
                </Text>
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator
                  size={32}
                  color={'cyan'}
                  style={{marginTop: 30, alignSelf: 'center'}}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setLocationModal(false)}
                  style={styles.submitButton}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => setChangeLocationModal(false)}
          visible={changeLocationModal}>
          <View
            style={{
              ...styles.container,
              width: 350,
              height: 400,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                ...styles.modalList,
                width: 300,
                height: 400,
                borderRadius: 8,
                elevation: 10,
                backgroundColor: 'white',
              }}>
              <Text style={styles.question}>Change Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter Your Pincode'}
                placeholderTextColor={'#011E46'}
              />
              <Text style={styles.OR}>OR</Text>
              <TouchableOpacity
                onPress={() => fetchLocation()}
                style={{
                  ...styles.locationButton,
                  width: WIDTH * 0.7,
                  borderRadius: 16,
                }}>
                <MaterialIcons name="my-location" size={24} color={'#011E46'} />
                <Text style={styles.currentLocationText}>
                  Use my Current Location
                </Text>
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator
                  size={32}
                  color={'cyan'}
                  style={{marginTop: 30, alignSelf: 'center'}}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setChangeLocationModal(false)}
                  style={styles.submitButton}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => setListModal(false)}
          visible={listModal}>
          <View
            style={{
              ...styles.container,
              width: 150,
              height: 300,
              alignItems: 'center',
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              margin: 20,
              marginTop: 30,
            }}>
            <View
              style={{
                ...styles.modalList,
                width: 150,
                height: 300,
                borderRadius: 8,
                elevation: 10,
                backgroundColor: 'white',
              }}>
              <FlatList
                data={[
                  'Frames',
                  'Hats',
                  'Clothing',
                  'Footwear',
                  'Frame',
                  'Hat',
                  'Baby Wears',
                  'Sport Wear',
                ]}
                keyExtractor={item => item}
                renderItem={renderItem}
              />
            </View>
          </View>
        </Modal>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
            }}>
            <TouchableOpacity
              onPress={() => setListModal(true)}
              style={styles.dropDownButton}>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  fontFamily: typography.DidactGothicRegular,
                  color: '#015DD3',
                }}>
                {val}
              </Text>
              <Octicons name="triangle-down" color={'#015DD3'} size={16} />
            </TouchableOpacity>
            <Text
              onPress={() => setChangeLocationModal(true)}
              style={styles.locationText}>
              Change Location
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              paddingHorizontal: 0,
              alignItems: 'center',
              justifyContent: 'center',
              width: WIDTH * 0.9,
            }}>
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  //paddingHorizontal: 20,
                  //backgroundColor:'red'
                }}>
                <View style={{marginLeft: 10}}>
                  <MaterialIcons name={'search'} size={20} color="#B3CEF2" />
                </View>
                <TextInput
                  placeholder={'Search'}
                  autoFocus={false}
                  placeholderTextColor={'#677890'}
                  style={styles.searchTextInput}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('cameraSearch')}>
                  <MaterialIcons
                    name={'camera-alt'}
                    color={'#015DD3'}
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TextToSpeech')}
                  style={styles.ttsIcon}>
                  <MaterialCommunityIcons
                    name={'microphone'}
                    size={20}
                    color={'#015DD3'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.filterContainer}>
              <TouchableOpacity>
                <MaterialIcons name={'filter-list'} color={'black'} size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name={'sort'} color={'black'} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.smartIcon}>
          <SmartSearchIcon navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationSerach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    color: '#677890',
    alignSelf: 'center',
    fontFamily: typography.DidactGothicRegular,
    marginRight: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 14,
    fontFamily: typography.NotoSansMedium,
  },
  modal: {
    width: WIDTH,
    height: HEIGHT,
    padding: 25,
    flex: 1,
    backgroundColor: 'white',
  },
  currentLocationText: {
    color: '#011E46',
    fontSize: 16,
    fontFamily: typography.NotoSansMedium,
  },
  modalList: {
    width: WIDTH,
    height: HEIGHT,
    padding: 25,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  dropDownButton: {
    backgroundColor: '#F2F7FD',
    borderRadius: 33,
    width: 150,
    height: 44,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    color: '#015DD3',
    fontFamily: typography.NotoSansBold,
    fontSize: 16,
    margin: 10,
  },
  textInput: {
    margin: 10,
    borderRadius: 16.5,
    elevation: 6,
    fontFamily: typography.DidactGothicRegular,
    backgroundColor: 'white',
    paddingHorizontal: 13,
    color: '#011E46',
  },
  smartIcon: {
    position: 'absolute',
    bottom: 80,
    width: WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    flexBasis: '20%',
  },
  dropDownText: {
    alignSelf: 'flex-start',
    color: '#015DD3',
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: typography.DidactGothicRegular,
  },
  OR: {
    marginVertical: 20,
    alignSelf: 'center',
    color: '#677890',
    fontSize: 20,
    fontWeight: 'bold',
  },

  locationButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    width: WIDTH * 0.8,
    backgroundColor: '#F2F7FD',
    elevation: 10,
    padding: 13,
    borderRadius: 16,
  },
  submitButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: WIDTH * 0.7,
    marginTop: 30,
    backgroundColor: '#015DD3',
    padding: 13,
    borderRadius: 5,
  },
  ttsIcon: {
    backgroundColor: 'white',
    height: 0.05 * HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    marginLeft: 10,
    paddingHorizontal: 5,
    borderWidth: 0.1,
    borderColor: '#677890',
  },
  searchTextInput: {
    height: 0.045 * HEIGHT,
    width: WIDTH * 0.45,
    padding: 10,
    fontSize: 14,
    color: '#677890',
    fontFamily: typography.DidactGothicRegular,
  },
  searchContainer: {
    width: WIDTH * 0.7,
    height: 0.05 * HEIGHT,
    backgroundColor: '#F2F7FD',
    alignSelf: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    //backgroundColor:'blue'
  },
});
