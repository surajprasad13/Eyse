import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {typography} from '../../common/typography';
import {store} from '../../store';

import {
  getBudget,
  getCards,
  getGender,
  getGroup,
  getOccassion,
} from '../../store/actions/shopActions';
import SmartSearchIcon from './components/SmartSearchIcon';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const SmartScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const setGenders = gender => dispatch(getGender(gender));
  const setCards = cards => dispatch(getCards(cards));
  const setBudget = gender => dispatch(getBudget(gender));
  const setOccassions = cards => dispatch(getOccassion(cards));
  const setAges = age => dispatch(getGroup(age));
  const [loading, setLoading] = useState(false);
  const [occassionModal, setOccassionModal] = useState(route.params.visible);
  const [cardsModal, setCardsModal] = useState(false);
  const [budgetModal, setBudgetModal] = useState(false);
  const [ageModal, setAgeModal] = useState(false);
  const [occassion, setOccassion] = useState('');
  const [activities, setActivities] = useState('');
  const [searchBudget, setSearchBudget] = useState(10);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [visible, setVisible] = useState(false);

  const occassionList = useSelector(state => state.shop.occassionList);
  const personalityList = useSelector(state => state.shop.personalityList);
  const ageGroup = useSelector(state => state.shop.ageList);

  let type = route.params.type;

  useEffect(() => {
    setOccassionModal(route.params.visible);
  }, [route]);

  const colorScheme = Appearance.getColorScheme();
  const pickerColor = colorScheme == 'dark' ? 'white' : 'black';
  const setOccassionNext = () => {
    setOccassionModal(false);
    setOccassions(occassion);
    setCardsModal(true);
  };
  const setCardsNext = () => {
    setCardsModal(false);
    setCards(activities);
    setAgeModal(true);
  };

  const setAgeNext = () => {
    setAgeModal(false);
    setAges(age);
    setGenders(gender);
    setBudgetModal(true);
  };

  const setBudgetNext = () => {
    setBudgetModal(false);
    type == 'image' ? setVisible(true) : setVisible(false);
    setBudget(searchBudget);
    setLoading(true);
    setSearchBudget(0);
    setOccassion('');
    setActivities('');
    setAge('');
    setGender('');
  };

  const renderItemOccassion = ({item}) => (
    <TouchableOpacity
      onPress={() => setOccassion(item.occasion_name)}
      style={{
        ...styles.modalCard,
        borderWidth: occassion == item.occasion_name ? 2 : 0,
        borderColor: occassion == item.occasion_name ? '#FF9E00' : 'gray',
      }}>
      <Image
        source={{uri: item['occasion_image']}}
        style={{...styles.modalCardImage, resizeMode: 'cover'}}
      />
      <Text
        style={{
          color: '#677890',
          fontFamily: typography.NotoSansBold,
          fontSize: 14,
        }}>
        {item.occasion_name}
      </Text>
    </TouchableOpacity>
  );

  const renderItemActivity = ({item}) => (
    <TouchableOpacity
      onPress={() => setActivities(item.personality_name)}
      style={{
        ...styles.modalCard,
        borderWidth: activities == item.personality_name ? 2 : 0,
        borderColor: activities == item.personality_name ? '#FF9E00' : 'gray',
      }}>
      <Image
        source={{uri: item['personality_image']}}
        style={styles.modalCardImage}
      />
      <Text
        style={{
          color: '#677890',
          fontFamily: typography.NotoSansBold,
          fontSize: 14,
        }}>
        {item.personality_name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
      <Modal
        transparent={true}
        onRequestClose={() => setOccassionModal(false)}
        animationType={'fade'}
        visible={occassionModal}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View
              style={{
                flexBasis: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => setOccassionModal(false)}>
                <Text style={styles.modalTitle}>Smart Search</Text>
              </TouchableOpacity>
              <Text style={styles.modalSubTitle}>Choose an Occassion</Text>
            </View>
            <View style={{flexBasis: '70%', marginTop: 20}}>
              <FlatList
                numColumns={2}
                data={occassionList}
                keyExtractor={item => item.occasion_id}
                renderItem={renderItemOccassion}
              />
              <TouchableOpacity
                //disabled={occassion==''?true:false}
                style={styles.nextButton}
                onPress={
                  occassion == ''
                    ? () => alert('Please Select Occassion')
                    : () => setOccassionNext()
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: typography.NotoSansSemiBold,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*Activity Modal*/}
      <Modal
        transparent={true}
        onRequestClose={() => setCardsModal(false)}
        animationType={'fade'}
        visible={cardsModal}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View
              style={{
                flexBasis: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => setOccassionModal(false)}>
                <Text style={styles.modalTitle}>Smart Search</Text>
              </TouchableOpacity>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={styles.modalSubTitle}>
                Select the cards that best describes you
              </Text>
            </View>
            <View style={{flexBasis: '70%', marginTop: 20}}>
              <FlatList
                numColumns={2}
                data={personalityList}
                keyExtractor={item => item.personality_id}
                renderItem={renderItemActivity}
              />
              <TouchableOpacity
                style={styles.nextButton}
                onPress={
                  activities == ''
                    ? () => alert('Please Select Personality')
                    : () => setCardsNext()
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: typography.NotoSansSemiBold,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setVisible(false);
            navigation.navigate('Home');
          }}>
          <TouchableOpacity style={styles.acknowledgementModal}>
            <Ionicons name="checkmark-circle-sharp" color="#fff" size={150} />
            <Text
              style={{
                marginVertical: 20,
                fontFamily: typography.NotoSansSemiBold,
                color: '#fff',
                fontSize: 20,
              }}>
              Thank you!
            </Text>
            <Text
              style={{
                marginVertical: 14,
                fontFamily: typography.DidactGothicRegular,
                color: '#fff',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Our support staff will get back to you
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/*Age Modal*/}
      <Modal
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => setAgeModal(false)}
        visible={ageModal}>
        <View style={styles.container}>
          <View style={{...styles.modal, height: HEIGHT * 0.6}}>
            <View
              style={{
                flexBasis: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => setOccassionModal(false)}>
                <Text style={styles.modalTitle}>Smart Search</Text>
              </TouchableOpacity>
              <Text style={styles.modalSubTitle}>Choose Age and Gender</Text>
            </View>
            <View style={{flexBasis: '70%', marginTop: 20}}>
              <Text
                style={{
                  color: '#99A5B5',
                  fontFamily: typography.NotoSansRegular,
                }}>
                Age Group
              </Text>
              <TouchableOpacity
                style={{backgroundColor: '#F2F7FD', borderRadius: 10}}>
                <Picker
                  selectedValue={age}
                  dropdownIconColor={'black'}
                  style={{
                    color: age == '' ? '#99A5B5' : '#011E46',
                    placeholderTextColor: 'black',
                    fontFamily: typography.DidactGothicRegular,
                  }}
                  onValueChange={itemValue => setAge(itemValue)}>
                  {ageGroup.map(item => (
                    <Picker.Item
                      label={item.description}
                      value={item.id}
                      color={pickerColor}
                    />
                  ))}
                </Picker>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#99A5B5',
                  marginTop: 20,
                  fontFamily: typography.NotoSansRegular,
                }}>
                Gender
              </Text>
              <TouchableOpacity
                style={{backgroundColor: '#F2F7FD', borderRadius: 10}}>
                <Picker
                  selectedValue={gender}
                  dropdownIconColor={'black'}
                  style={{
                    color: gender == '' ? '#99A5B5' : '#011E46',
                    placeholderTextColor: '#99A5B5',
                    fontFamily: typography.DidactGothicRegular,
                  }}
                  onValueChange={itemValue => setGender(itemValue)}>
                  <Picker.Item
                    label="Select Gender"
                    value="Male"
                    color={'#99A5B5'}
                  />
                  <Picker.Item label="Male" value="Male" color={pickerColor} />
                  <Picker.Item
                    label="Female"
                    value="Female"
                    color={pickerColor}
                  />
                  <Picker.Item
                    label="Others"
                    value="Other"
                    color={pickerColor}
                  />
                </Picker>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={
                  age == '' || gender == ''
                    ? () => alert('Please select both Age and Gender')
                    : () => setAgeNext()
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: typography.NotoSansSemiBold,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/*Budget Modal*/}
      <Modal
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => setBudgetModal(false)}
        visible={budgetModal}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.modal,
              height: HEIGHT * 0.6,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexBasis: '15%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => setOccassionModal(false)}>
                <Text style={styles.modalTitle}>Smart Search</Text>
              </TouchableOpacity>
              <Text style={styles.modalSubTitle}>
                Enter Your Budget (Optional)
              </Text>
            </View>
            <View style={{flexBasis: '70%', marginTop: 20}}>
              <Slider
                style={{width: WIDTH - 150, height: 50}}
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
                <Text style={styles.budgetText}>
                  Rs. {Math.floor(searchBudget / 1000) * 1000}
                </Text>
                <Text style={styles.budgetText}>Rs. 100000</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <TextInput
                  style={styles.budgetInput}
                  onChangeText={value =>
                    setSearchBudget(
                      value == ''
                        ? 0
                        : Math.floor(parseInt(value) / 1000) * 1000,
                    )
                  }
                  keyboardType={'number-pad'}
                  placeholder={'Enter Price You can Pay'}
                  placeholderTextColor={'#B3BBC7'}></TextInput>
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setBudgetNext()}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: typography.NotoSansSemiBold,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              fontFamily: typography.NotoSansSemiBold,
              color: '#011E46',
            }}>
            Smart Search Results
          </Text>
          <MaterialIcons name="shopping-cart" color="#011E46" size={25} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
            paddingHorizontal: 10,

            justifyContent: 'space-between',
            width: WIDTH * 0.9,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LocationSearch')}
            style={styles.locationSearchButton}>
            <Text
              style={{
                fontFamily: typography.DidactGothicRegular,
                fontSize: 16,
                color: '#011E46',
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
      </View>
      <View style={styles.smartIcon}>
        <SmartSearchIcon navigation={navigation} />
      </View>
    </View>
  );
};

export default SmartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    flexBasis: '20%',
  },
  budgetText: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: typography.DidactGothicRegular,
    fontSize: 16,
    color: '#677890',
  },
  smartIcon: {
    position: 'absolute',
    bottom: 80,
    width: WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  modal: {
    width: WIDTH - 60,
    // height: HEIGHT * 0.7,
    padding: 25,
    backgroundColor: 'white',
    height: HEIGHT * 0.8,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#FF9E00',
    alignSelf: 'center',
    fontFamily: typography.NotoSansSemiBold,
  },
  modalSubTitle: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#677890',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: typography.DidactGothicRegular,
  },
  submitButton: {
    backgroundColor: '#FF9E00',
    width: WIDTH * 0.5,
    height: HEIGHT * 0.03,
    flexBasis: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  acknowledgementModal: {
    width: 320,
    height: 400,
    backgroundColor: '#FF9E00',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 100,
    borderRadius: 10,
    padding: 50,
    alignItems: 'center',
  },
  budgetInput: {
    textAlign: 'center',
    alignSelf: 'center',
    width: 186,
    height: 40,
    alignItems: 'center',
    color: '#B3BBC7',
    backgroundColor: '#F2F7FD',
    marginVertical: 30,
    borderRadius: 4,
    fontFamily: typography.DidactGothicRegular,
  },
  nextButton: {
    backgroundColor: '#FF9E00',
    width: WIDTH * 0.5,
    height: HEIGHT * 0.03,
    flexBasis: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  locationSearchButton: {
    backgroundColor: '#F2F7FD',
    justifyContent: 'center',
    width: WIDTH * 0.6,
    height: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalCard: {
    padding: 10,
    flexBasis: '46%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  modalCardImage: {
    height: HEIGHT * 0.2,
    width: WIDTH * 0.3,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
