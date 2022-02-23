import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../../../common/typography";

const RenderProductCard = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignSelf: "center",
        //alignItems: 'center',
        height: 80,
        backgroundColor: "#F2F7FD",
        alignContent: "flex-start",
        alignItems: "flex-start",
        width: 250,
        borderRadius: 8,
      }}
    >
      <Image
        source={require("../../../assets/images/img1.png")}
        style={{ height: 80, width: 80, resizeMode: "cover", borderRadius: 8 }}
      />
      <View
        style={{
          padding: 20,
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            fontFamily: typography.NotoSansSemiBold,
            color: "#011E46",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Brand Name {"    >"}
        </Text>
        <Text
          style={{
            fontFamily: typography.NotoSansSemiBold,
            color: "#677890",
            fontSize: 16,
          }}
        >
          Product Name
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderProductCard;
