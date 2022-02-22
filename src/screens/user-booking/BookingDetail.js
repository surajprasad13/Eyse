import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from './styles';

const width = Dimensions.get('window').width;
import colors from '../../constants/colors';

export default class BookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{...styles.headerWrapper}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
          <Text style={{...styles.primaryLTextBold, marginLeft: 10}}>
            Your bookings
          </Text>
        </SafeAreaView>

        <View
          style={{
            marginVertical: 30,
          }}>
          <View>
            <View style={{marginHorizontal: 30, marginVertical: 10}}></View>
            <View
              style={{
                backgroundColor: '#F2F7FD',
                ...styles.row,
                paddingHorizontal: 30,
                paddingVertical: 10,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: colors.primaryBackground,
                }}>
                Friday
              </Text>
              <Text style={{...styles.secondarySText}}>15th Aug</Text>
              <Text style={{...styles.secondarySText, color: '#677890'}}>
                07:00 AM - 08:00 AM
              </Text>
            </View>

            <View style={{margin: 30}}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                }}>
                {this.props.route.params.name}
              </Text>

              <View style={{...styles.row}}>
                <Text
                  style={{
                    ...styles.secondarySText,
                    color: '#99A5B5',
                  }}>
                  {this.props.route.params.gender}
                </Text>
                <Text
                  style={{
                    ...styles.secondarySText,
                    marginLeft: 20,
                    color: '#99A5B5',
                  }}>
                  D.O.B: 23-06-2000
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                }}>
                <Text style={{...styles.primaryMTextBold}}>Note:</Text>
                <TextInput
                  style={{
                    height: 200,
                    backgroundColor: '#F2F7FD',
                    borderRadius: 5,
                    padding: 10,
                    marginVertical: 10,
                    textAlignVertical: 'top',
                    ...styles.secondarySText,
                    color: '#677890',
                  }}
                  multiline={true}
                  placeholder="Write something..."
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie, ante id tincidunt dapibus Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie, ante id tincidunt dapibus Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie, ante id tincidunt dapibus..."
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            disabled={!this.props.route.params.join}
            style={{margin: 30}}>
            <View
              style={{
                ...styles.submitBtnWrapper,
                backgroundColor: colors.primaryBackground,
                opacity: !this.props.route.params.join ? 0.5 : 1,
              }}>
              <Text
                style={{
                  ...styles.primaryMTextBold,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Join
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
