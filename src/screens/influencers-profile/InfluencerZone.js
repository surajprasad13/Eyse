import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  ScrollView,
  LogBox,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MasonryList from 'react-native-masonry-list';
import data from '../../constants/data';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class InfluencerZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedImg: '',
      width: null,
      height: null,
    };
  }
  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render() {
    return (
      <>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ExpertCategoryList');
            }}>
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                backgroundColor: '#F2F7FD',
                paddingVertical: 10,
                paddingHorizontal: 30,
                marginVertical: 20,
              }}>
              <View>
                <Text style={styles.secondarySText}>
                  Get Expert consultation for all your concerns
                </Text>
                <Text
                  style={{
                    ...styles.primaryMTextBold,
                    color: colors.primaryBackground,
                  }}>
                  Book an appointment
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
          <View style={{marginHorizontal: 15}}>
            <Text
              style={{
                ...styles.secondarySText,
                color: colors.primaryBackground,
                textAlign: 'right',
              }}>
              How to use this space
            </Text>

            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                backgroundColor: '#F2F7FD',
                borderRadius: 20,
                padding: 8,
                borderWidth: 0.5,
                borderColor: '#B3CEF2',
                marginVertical: 10,
              }}>
              <Image
                source={require('../../assets/icons/search.png')}
                style={{width: 24, height: 24}}
              />
              <TextInput
                style={{width: width / 1.5}}
                placeholder="What are you looking for?"
              />
              <Image
                source={require('../../assets/icons/mic.png')}
                style={{width: 24, height: 24}}
              />
            </View>
          </View>

          <MasonryList
            images={data}
            columns={2}
            spacing={3}
            imageContainerStyle={{borderRadius: 10}}
            onPressImage={item => {
              this.setState({selectedImg: item.uri});
              this.setState({width: item.masonryDimensions.width});
              this.setState({height: item.masonryDimensions.height});
              this.setState({visible: true});
            }}
          />
          <Modal
            transparent={true}
            onRequestClose={() => {
              this.setState({visible: false});
            }}
            animationType={'fade'}
            visible={this.state.visible}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: false});
              }}
              activeOpacity={1}
              style={styles.containerModel}>
              <View>
                <Image
                  source={{uri: this.state.selectedImg}}
                  style={{
                    width: this.state.width * 2,
                    height: this.state.height * 2,
                    borderRadius: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <View style={{marginBottom: 10}}></View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PostType');
          }}
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: 30,
            bottom: 30,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <AntDesign
            name="pluscircle"
            size={50}
            color={colors.primaryBackground}
          />
        </TouchableOpacity>
      </>
    );
  }
}
