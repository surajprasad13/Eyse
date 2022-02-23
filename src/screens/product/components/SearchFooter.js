import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const searchFooter = () => {
  return (
    <View>
      <Text>Not Finding what you are looking for </Text>
      <TouchableOpacity
        style={{
          height: 62,
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#015DD3",
          borderRadius: 27,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: "#F2F7FD" }}>
          Let us know your preferences & we’ll get back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default searchFooter;
