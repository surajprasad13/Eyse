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
import Feather from 'react-native-vector-icons/Feather';
import ProfileData from '../../constants/ProfileData';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Steps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          margin: 30,
          alignItems: this.props.left ? 'flex-start' : 'flex-end',
        }}>
        <Image
          source={require('../../assets/images/dummy.png')}
          style={{
            width: 120,
            height: 130,
          }}
        />
        <View
          style={{
            width: 150,
          }}>
          <Text
            style={{
              ...styles.primaryMTextBold,
              textAlign: this.props.left ? 'left' : 'right',
              color: colors.primaryBackground,
            }}>
            Fill the form & join the platform
          </Text>
          <Text
            style={{
              ...styles.secondarySText,
              textAlign: this.props.left ? 'left' : 'right',
            }}>
            Lorem ipsum description for this field
          </Text>
        </View>
      </View>
    );
  }
}

export default class BecomeInfluencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTutorial: false,
    };
  }

  render() {
    const renderItem = ({index, item}) => {
      return (
        <View
          style={{
            width: 100,
            alignItems: 'center',
            paddingVertical: 10,
            marginLeft: item.id == 1 ? 30 : 10,
          }}>
          <Image
            source={require('../../assets/images/dummy.png')}
            style={{width: 90, height: 90}}
          />
          <Text style={{...styles.secondarySText, textAlign: 'center'}}>
            Lorem ipsum dolor sit amet
          </Text>
        </View>
      );
    };
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{
                height: 24,
                width: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Become an Influencer
          </Text>
        </SafeAreaView>

        <View style={{marginHorizontal: 30, marginTop: 30}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/become_influencer.png')}
              style={{width: 310, height: 190}}
            />

            <Text
              style={{
                ...styles.secondarySText,
                textAlign: 'center',
                marginHorizontal: 20,
                paddingVertical: 10,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              molestie, ante id tincidunt dapibus...
            </Text>
          </View>

          <View style={{paddingTop: 20}}>
            <Text style={{...styles.primaryMTextBold}}>
              Why partner with us
            </Text>
          </View>
        </View>

        <View style={{marginBottom: 40}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={ProfileData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({activeTutorial: !this.state.activeTutorial});
          }}
          activeOpacity={1}>
          <View
            style={{
              ...styles.row,
              backgroundColor: 'white',
              elevation: 2,
              justifyContent: 'space-between',
              padding: 10,
              paddingHorizontal: 30,
            }}>
            <Text style={{...styles.secondaryMText}}>How it works</Text>
            {this.state.activeTutorial ? (
              <Feather name="chevron-up" size={24} color="black" />
            ) : (
              <Feather name="chevron-down" size={24} color="black" />
            )}
          </View>
        </TouchableOpacity>

        {this.state.activeTutorial && (
          <View>
            <Steps left={true} />
            <Steps left={false} />
            <Steps left={true} />
            <Steps left={false} />
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('FillForm');
          }}
          style={{
            ...styles.submitBtnWrapper,
            paddingVertical: 10,
            margin: 30,
          }}>
          <Text
            style={{
              ...styles.primaryMTextBold,
              color: 'white',
              textAlign: 'center',
            }}>
            Apply
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
