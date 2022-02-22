import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default class RatingsDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stars = [];

    for (let i = 0; i < this.props.numStars; i++) {
      stars.push({id: i.toString()});
    }

    return (
      <View style={styles.elementsInRow}>
        {stars.map((item, index) => {
          return (
            <Image
              source={require('../../assets/images/star-yellow.png')}
              style={{...styles.icon16, marginLeft: 2}}
              resizeMode="contain"
              key={index}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementsInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon16: {
    width: 16,
    height: 16,
  },
});
