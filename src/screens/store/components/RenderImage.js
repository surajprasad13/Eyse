import React from "react";
import { Image, TouchableOpacity } from "react-native";

const RenderImage = ({ item, navigation }) => {
  const randomBool = React.useMemo(() => Math.random() < 0.5, []);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("InfluencerContainer", {
          image: { uri: item.imgURL },
          type: "image",
        })
      }
      key={item.id}
      style={{
        margin: 10,
        flex: 1,
        borderRadius: 20,
        overflow: "hidden",
        height: randomBool ? 120 : 180,
      }}
    >
      <Image
        source={{ uri: item.imgURL }}
        style={{
          height: "100%",
          alignSelf: "stretch",
          borderRadius: 20,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default RenderImage;
