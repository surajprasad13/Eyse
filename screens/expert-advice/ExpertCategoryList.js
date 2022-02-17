import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileData from '../../constants/ProfileData';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ExpertCategoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ExpertList');
          }}
          activeOpacity={1}>
          <View
            style={{
              borderRadius: 8,
              elevation: 2,
              backgroundColor: 'white',
              paddingVertical: 5,
              margin: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 200,
              width: width / 2.3,
            }}>
            <Text
              style={{
                ...styles.primaryMTextBold,
                color: colors.primaryBackground,
              }}>
              Fashion consultant
            </Text>
            <Image
              source={require('../../assets/images/dummy.png')}
              style={{width: 100, height: 100}}
            />
            <View style={{...styles.row}}>
              <Image
                source={require('../../assets/icons/timer.png')}
                style={{width: 18, height: 18}}
              />
              <Text style={{...styles.primaryXSText, marginLeft: 5}}>
                1 hour
              </Text>
            </View>
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-around',
                width: 150,
              }}>
              <Text style={{...styles.secondarySText}}>Starting from</Text>
              <Text style={{...styles.primarySText}}>₹500</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <View style={{...styles.row}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
            <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
              Get expert advice
            </Text>
          </View>
          <Ionicons name="md-search-sharp" size={24} color="black" />
        </SafeAreaView>

        <View
          style={{
            ...styles.row,
            justifyContent: 'space-between',
            margin: 15,
          }}>
          <Image
            source={require('../../assets/images/dummy.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={{...styles.secondarySText, width: width / 1.5}}>
            Text explaining how it works? Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. In molestie, ante id tincidunt
            dapibus...
          </Text>
        </View>

        <View style={{margin: 15, flex: 2}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            data={ProfileData}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}
