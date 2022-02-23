import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../../../common/typography";
//import ImageSize from 'react-native-image-size';
const RenderImageStore = ({ item }) => {
  // const randomBool = React.useMemo(() => Math.random() < 0.5, []);
  const [liked, setLiked] = useState(false);
  const [imageHeight, setImageHeight] = React.useState(350);

  useEffect(() => {
    const getImageSize = async () => {
      Image.getSize(item.imgURL, (width, height) => {
        setImageHeight(height);
      });
    };
    getImageSize();
  }, [item.imgURL]);

  return (
    <TouchableOpacity
      key={item.id}
      // onPress={() => {
      //   props.navigation.navigate('ProductDetailsContainer');
      // }}
      //imageStyle={{resizeMode: 'cover', height: imageHeight * 0.5}}
      style={{
        margin: 10,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        height:
          imageHeight < 300 ? imageHeight * 0.8 + 50 : imageHeight * 0.3 + 50,
      }}
    >
      <Image
        source={{ uri: item.imgURL }}
        style={{
          alignSelf: "stretch",
          borderRadius: 10,
          height: imageHeight < 300 ? imageHeight * 0.8 : imageHeight * 0.3,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => setLiked(!liked)}
        style={styles.floatingActionBtn}
      >
        <Image
          source={
            liked
              ? require("../../../assets/images/heart-fill.png")
              : require("../../../assets/images/heart-outline.png")
          }
          style={{ ...styles.icon28, top: 2 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff",
          height: 40,
          justifyContent: "space-around",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            color: "#011E46",
            fontSize: 14,
            fontFamily: typography.NatoBlack,
          }}
        >
          Brand Name
        </Text>
        <Text
          style={{
            color: "#99A5B5",
            fontSize: 14,
            fontFamily: typography.DidactGothicRegular,
          }}
        >
          Product Name
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderImageStore;

const styles = StyleSheet.create({
  floatingActionBtn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    elevation: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "absolute",
    right: 8,
    bottom: 20,
  },
  icon28: {
    width: 28,
    height: 28,
  },
});
