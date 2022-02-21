import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import styles from './styles';
import ProfileData from '../../constants/ProfileData';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModelTabs from './components/ModelTabs';

import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ExpertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: null,
    };
  }

  render() {
    const renderItem = ({index, item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AboutUser');
          }}
          activeOpacity={1}>
          <View
            style={{
              borderRadius: 8,
              elevation: 2,
              backgroundColor: 'white',
              padding: 10,
              margin: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 230,
              width: width / 2 - 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: index});
              }}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <Menu
                visible={this.state.visible == index}
                anchor={
                  <Entypo
                    name="dots-three-vertical"
                    size={20}
                    color="#677890"
                  />
                }
                onRequestClose={() => {
                  this.setState({visible: null});
                }}>
                <MenuItem
                  textStyle={{...styles.secondaryMText, color: 'black'}}>
                  Share
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  textStyle={{...styles.secondaryMText, color: 'black'}}>
                  Follow
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  textStyle={{...styles.secondaryMText, color: 'black'}}>
                  Save for later
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  textStyle={{...styles.secondaryMText, color: 'black'}}>
                  Report
                </MenuItem>
              </Menu>
            </TouchableOpacity>
            <Image
              source={require('../../assets/images/dummy.png')}
              style={{width: 70, height: 70, marginTop: -40}}
            />

            <Text style={{...styles.primaryMText, color: '#011E46'}}>Name</Text>

            <Text style={{...styles.secondarySText}}>Specilization</Text>
            <Text style={{...styles.primarySText}}>₹1000/hr</Text>
            <Text style={{...styles.primarySText, color: '#FF9E00'}}>
              ₹500 for members
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Book');
              }}
              style={{
                ...styles.submitBtnWrapper,
                marginVertical: 5,
              }}>
              <Text
                style={{
                  ...styles.primarySText,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Book appointment
              </Text>
            </TouchableOpacity>
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
              Fashion Consultants
            </Text>
          </View>
          <Ionicons name="md-search-sharp" size={24} color="black" />
        </SafeAreaView>

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
        <Modal
          transparent={true}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}
          animationType={'fade'}
          visible={this.state.modalVisible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({modalVisible: false});
            }}
            style={styles.containerModel}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'space-between',
                width: width / 2,
                padding: 5,
              }}>
              <ModelTabs title="Share" />
              <ModelTabs title="Follow" />
              <ModelTabs title="Save for later" />
              <ModelTabs title="Report" last={true} />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
