import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import InterestsData from '../../constants/InterestsData';
import {UserLogin} from '../../store/actions/authActions';
import styles from './styles';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      selected: [],
      token: null,
      loader: false,
    };
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        this.setState({token: value});
      } else {
      }
    } catch (e) {
      // error reading value
    }
  }
  onSubmit = () => {
    // this.props.UserLogin(this.state.token);
    this.props.navigation.navigate('HomeStack');
  };
  async onSelectInterest(id) {
    let selectedIn = this.state.selected;
    if (selectedIn.includes(id)) {
      selectedIn.splice(selectedIn.indexOf(id), 1);
    } else {
      selectedIn.push(id);
    }
    this.setState({selected: selectedIn});
  }

  minValidation = () => {
    if (this.state.selected.length >= 3) {
      return true;
    } else return false;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const renderCity = ({index, item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.onSelectInterest(item.id);
          }}
          style={{alignItems: 'center', paddingVertical: 10}}>
          <ImageBackground
            source={item.image}
            blurRadius={this.state.selected.includes(item.id) ? 50 : 0}
            style={{
              width: width / 2.5,
              height: 155,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.selected.includes(item.id) && (
              <Feather name="check" size={45} color="white" />
            )}
          </ImageBackground>
          <Text style={{...styles.secondaryMText}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{paddingLeft: 30, paddingRight: 10}}>
            <Ionicons name="chevron-back" size={24} color="black" />
            {/* <Image
              source={require("../../assets/icons/back.png")}
              style={{ width: 24, height: 24 }}
            /> */}
          </TouchableOpacity>
          <Text style={styles.primaryLTextBold}>Select your interests</Text>
        </SafeAreaView>
        <View
          style={{
            margin: 30,
            flex: 1,
            marginBottom: 60,
          }}>
          <Text style={{...styles.secondaryMText, color: '#677890'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
            molestie, ante id tincidunt dapibus...
          </Text>
          <Text style={{...styles.secondaryMText, alignSelf: 'flex-end'}}>
            {this.state.selected.length} selected
          </Text>

          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            extraData={this.state.selected}
            data={InterestsData}
            renderItem={renderCity}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            numColumns="2"
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          disabled={!this.minValidation()}
          onPress={() => {
            // this.props.navigation.navigate("HomeStack");
            this.onSubmit();
          }}
          style={{
            ...styles.submitBtnWrapper,
            width: width - 60,
            position: 'absolute',
            bottom: 20,
            opacity: !this.minValidation() && 0.5,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              ...styles.primaryMTextBold,
              color: 'white',
              textAlign: 'center',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {token: state.auth.authToken};
};
const mapDispatchToProps = {
  UserLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
