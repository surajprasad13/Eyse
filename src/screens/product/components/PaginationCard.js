import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class PaginationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dots = [];

    for (let i = 0; i < this.props.dotsLength; i++) {
      dots.push({ id: i.toString() });
    }

    return (
      <View style={styles.elementsInRow}>
        {dots.map((item, index) => {
          return (
            <View
              key={index}
              style={
                this.props.activeDot == index ? styles.activeDot : styles.dot
              }
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elementsInRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 12,
  },

  activeDot: {
    width: 10,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#000",
    marginHorizontal: 3,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
});
