import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import OnBoardingData from '../../constants/OnBoardingData';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class OnBoarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: OnBoardingData,
      activeSlide: 0,
    };
  }

  _renderItem({item}) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
          marginHorizontal: 30,
        }}>
        <Image
          source={item.image}
          style={{
            width: 240,
            height: 240,
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            ...styles.secondorySText,
            textAlign: 'center',
            paddingVertical: 10,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie,
          ante id tincidunt dapibus...
        </Text>
      </View>
    );
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 20,
          height: 10,
          borderRadius: 5,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#C7C7CC',
        }}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: StatusBar.currentHeight,
            justifyContent: 'flex-end',
            marginHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
              // this.incrementCount();
            }}>
            <Text style={{...styles.secondoryMText}}>Skip</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Carousel
            style={{flex: 1, overflow: 'visible'}}
            data={this.state.entries}
            ref={c => {
              this._carousel = c;
            }}
            renderItem={this._renderItem}
            windowSize={1}
            itemWidth={width}
            containerWidth={width}
            sliderWidth={width}
            itemHeight={height}
            inActiveOpacity={0.5}
            onSnapToItem={index => this.setState({activeSlide: index})}
            autoplay
          />

          {this.pagination}
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              this._carousel.snapToPrev();
            }}
            style={{
              backgroundColor: '#F2F7FD',
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo
              name="chevron-small-left"
              size={25}
              color={colors.primaryBackground}
            />
          </TouchableOpacity>

          {this.state.activeSlide == 2 ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
                // this.incrementCount();
              }}>
              <View style={styles.btnWrapper}>
                <Text style={styles.primarySText}>Get started</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this._carousel.snapToNext();
              }}
              style={{
                backgroundColor: '#F2F7FD',
                borderRadius: 15,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo
                name="chevron-small-right"
                size={25}
                color={colors.primaryBackground}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  secondoryMText: {
    fontSize: 16,
    fontFamily: 'DidactGothic-Regular',
  },
  secondorySText: {
    fontSize: 14,
    fontFamily: 'DidactGothic-Regular',
    color: '#677890',
  },
  primarySText: {
    fontSize: 14,
    fontFamily: 'NotoSans-Regular',
    color: '#FFFFFF',
  },
  btnWrapper: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 13,
    padding: 10,
    paddingHorizontal: 15,
  },
});
